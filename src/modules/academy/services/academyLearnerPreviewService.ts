import { academyData, getCourseLessons } from "./academyData";
import { quizService } from "./quizService";
import type {
  AcademyStudentProgressState,
  QuizAttemptRecord
} from "../../../repositories/academyProgressRepository";
import type {
  CertificatePreviewEligibility,
  LearnerAssessmentPreview,
  LearnerCoursePreviewFlow,
  LearnerRecognitionPreview,
  LearnerRewardPreview,
  PreviewAssessmentState,
  PreviewProgressState,
  RewardGate
} from "../types/academy";

function getStudentCourseState(studentState: AcademyStudentProgressState, courseId: string) {
  return {
    completedLessons: studentState.completedLessons.filter((item) => item.courseId === courseId),
    quizAttempts: studentState.quizAttempts.filter((item) => item.courseId === courseId)
  };
}

function getLastAttempt(attempts: QuizAttemptRecord[]) {
  return [...attempts].sort((left, right) => left.attemptedAt.localeCompare(right.attemptedAt)).at(-1);
}

function getProgressState(courseId: string, studentState: AcademyStudentProgressState): PreviewProgressState {
  const course = academyData.courses.find((item) => item.id === courseId);
  if (!course) return "locked-preview";

  if (course.status === "draft-preview" || academyData.purchasedCourses.find((item) => item.courseId === courseId)?.accessState === "locked-by-governance-review") {
    return "locked-preview";
  }

  const lessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
  const completedCount = getStudentCourseState(studentState, courseId).completedLessons.length;

  if (completedCount === 0) return "not-started";
  if (lessons.length > 0 && completedCount >= lessons.length) return "completed-preview";
  return "in-progress";
}

function getQuizPreviewState(courseId: string, studentState: AcademyStudentProgressState): PreviewAssessmentState {
  const progressState = getProgressState(courseId, studentState);
  const quiz = quizService.getQuiz(courseId);
  const { completedLessons, quizAttempts } = getStudentCourseState(studentState, courseId);
  const lastAttempt = getLastAttempt(quizAttempts);

  if (!quiz) return "locked";
  if (progressState === "locked-preview") return "pending-preview";
  if (!quizService.getQuizState(courseId, completedLessons.map((item) => item.lessonId)).includes("available") && completedLessons.length > 0) return "not-met";
  if (completedLessons.length === 0 && !quizService.getQuizState(courseId, []).includes("available")) return "locked";
  if (lastAttempt?.result === "passed") return "passed";
  if (lastAttempt?.result === "failed") return "retry";
  return "available";
}

function getAssessment(courseId: string, studentState: AcademyStudentProgressState): LearnerAssessmentPreview {
  const { quizAttempts } = getStudentCourseState(studentState, courseId);
  const lastAttempt = getLastAttempt(quizAttempts);
  const quiz = quizService.getQuiz(courseId);
  const state = getQuizPreviewState(courseId, studentState);

  return {
    state,
    score: lastAttempt?.score ?? null,
    threshold: quiz?.passingThreshold ?? 0,
    retryAvailable: state === "retry",
    deterministic: true,
    nonAuthoritative: true
  };
}

function getGateStatuses(courseId: string, studentState: AcademyStudentProgressState) {
  const gates = academyData.rewardGates.filter((gate) => gate.courseId === courseId);
  const progressState = getProgressState(courseId, studentState);
  const assessment = getAssessment(courseId, studentState);
  const { completedLessons } = getStudentCourseState(studentState, courseId);
  const requiredLessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
  const completedCount = completedLessons.length;

  return gates.map((gate) => {
    if (progressState === "locked-preview") {
      return { ...gate, derivedStatus: gate.source === "lesson" ? "pending-preview" : "locked" };
    }

    let derivedStatus: RewardGate["status"] | "pending-preview" = "locked";

    if (gate.source === "lesson") {
      derivedStatus = completedCount > 0 ? "unlocked" : "pending-preview";
    } else if (gate.source === "module") {
      derivedStatus = requiredLessons.length > 0 && completedCount >= requiredLessons.length ? "unlocked" : completedCount > 0 ? "pending" : "locked";
    } else if (gate.source === "quiz") {
      derivedStatus = assessment.state === "passed" ? "unlocked" : completedCount > 0 ? "pending" : "locked";
    } else if (gate.source === "certification") {
      derivedStatus = getCertificatePreviewEligibility(courseId, studentState).eligible ? "unlocked" : "locked";
    }

    return { ...gate, derivedStatus };
  });
}

function getRewardPreview(courseId: string, studentState: AcademyStudentProgressState): LearnerRewardPreview {
  const course = academyData.courses.find((item) => item.id === courseId);
  const gates = getGateStatuses(courseId, studentState);

  return {
    previewPointTier: course?.previewPointTier ?? "Foundation Preview",
    totalPreviewPoints: gates.reduce((sum, gate) => sum + gate.previewPoints, 0),
    unlockedPreviewPoints: gates.filter((gate) => gate.derivedStatus === "unlocked").reduce((sum, gate) => sum + gate.previewPoints, 0),
    pendingPreviewPoints: gates.filter((gate) => gate.derivedStatus !== "unlocked").reduce((sum, gate) => sum + gate.previewPoints, 0),
    unlockedMilestones: gates.filter((gate) => gate.derivedStatus === "unlocked").map((gate) => gate.unlockCondition),
    lockedMilestones: gates.filter((gate) => gate.derivedStatus !== "unlocked").map((gate) => gate.unlockCondition),
    nonMonetary: true,
    nonAuthoritative: true
  };
}

function getRecognitionPreview(courseId: string, studentState: AcademyStudentProgressState): LearnerRecognitionPreview {
  const certificatePreviewEligibility = getCertificatePreviewEligibility(courseId, studentState);

  return {
    status: certificatePreviewEligibility.eligible
      ? "eligible-preview"
      : getProgressState(courseId, studentState) === "locked-preview"
        ? "locked-preview"
        : "pending-preview",
    badgePreview: certificatePreviewEligibility.eligible ? "Recognition preview ready" : "Recognition preview pending",
    nonAuthoritative: true
  };
}

function getCertificatePreviewEligibility(courseId: string, studentState: AcademyStudentProgressState): CertificatePreviewEligibility {
  const quiz = quizService.getQuiz(courseId);
  const requiredLessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
  const { completedLessons, quizAttempts } = getStudentCourseState(studentState, courseId);
  const lastAttempt = getLastAttempt(quizAttempts);
  const enoughLessons = requiredLessons.length > 0 && completedLessons.length >= requiredLessons.length;
  const enoughScore = (lastAttempt?.score ?? 0) >= (quiz?.passingThreshold ?? 0);
  const eligible = getProgressState(courseId, studentState) !== "locked-preview" && enoughLessons && enoughScore && lastAttempt?.result === "passed";

  return {
    eligible,
    status: eligible ? "eligible-preview" : getProgressState(courseId, studentState) === "locked-preview" ? "pending-preview" : "not-met",
    previewOnly: true,
    nonAuthoritative: true,
    recognitionOnly: true,
    externallyProvable: false,
    chainLinked: false,
    authorityBearing: false,
    portable: false
  };
}

export const academyLearnerPreviewService = {
  getCourseFlow(courseId: string, studentState: AcademyStudentProgressState): LearnerCoursePreviewFlow {
    const requiredLessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
    const { completedLessons } = getStudentCourseState(studentState, courseId);
    const assessment = getAssessment(courseId, studentState);

    return {
      courseId,
      progressState: getProgressState(courseId, studentState),
      completedLessons: completedLessons.length,
      pendingLessons: Math.max(requiredLessons.length - completedLessons.length, 0),
      contentProgress: requiredLessons.length === 0 ? 0 : Math.round((completedLessons.length / requiredLessons.length) * 100),
      quizState: getQuizPreviewState(courseId, studentState),
      assessment,
      rewardPreview: getRewardPreview(courseId, studentState),
      recognitionPreview: getRecognitionPreview(courseId, studentState),
      certificatePreviewEligibility: getCertificatePreviewEligibility(courseId, studentState)
    };
  }
};
