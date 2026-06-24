import { academyData, getCourseLessons } from "./academyData";
import { academyLearnerPreviewService } from "./academyLearnerPreviewService";
import { getAcademyPreviewRuntime } from "./academyPreviewRuntime";
import type {
  LearnerCertificatePreviewCard,
  LearnerCoursePreviewCard,
  LearnerDashboardPreview,
  RewardRecord
} from "../types/academy";
import type { AcademyStudentProgressState } from "../../../repositories/academyProgressRepository";

function createFixtureStudentState(): AcademyStudentProgressState {
  return {
    completedLessons: academyData.lessonProgress
      .filter((lesson) => ["completed", "validated"].includes(lesson.status))
      .map((lesson, index) => ({
        courseId: lesson.courseId,
        lessonId: lesson.lessonId,
        completedAt: `2026-06-24T00:00:${String(index).padStart(2, "0")}.000Z`
      })),
    quizAttempts: academyData.quizAttempts.map((attempt) => ({
      courseId: attempt.courseId,
      quizId: attempt.quizId,
      score: attempt.score,
      threshold: attempt.threshold,
      result: attempt.result,
      pokStatus: attempt.pokStatus === "approved" ? "approved" : "retry-required",
      attemptedAt: attempt.attemptedAt
    }))
  };
}

function getSafeDisplayTitle(courseId: string) {
  const course = academyData.courses.find((item) => item.id === courseId);
  if (!course) return "Unknown course";

  return course.title.replace(/\$NEURONS/g, "Preview Points");
}

function getCertificateState(courseId: string, eligible: boolean, hasPresentationPreview: boolean): LearnerCertificatePreviewCard["state"] {
  if (eligible && hasPresentationPreview) return "presentation-preview";
  if (eligible) return "eligible-preview";
  if (hasPresentationPreview) return "presentation-only";
  return "not-eligible-preview";
}

function getCertificateLabel(state: LearnerCertificatePreviewCard["state"]) {
  if (state === "presentation-preview") return "Certificate preview";
  if (state === "eligible-preview") return "Preview eligibility";
  if (state === "presentation-only") return "Presentation preview";
  return "Preview eligibility pending";
}

function getSafeRewardRecords(records: RewardRecord[]) {
  return records.map((reward) => ({
    ...reward,
    previewPolicy: "Local preview only. Non-authoritative preview points.",
    previewSource: reward.previewSource.replace(/Paid course preview/g, "Applied preview").replace(/Free course preview/g, "Foundation preview")
  }));
}

export const academyLearnerExperienceService = {
  getDashboardPreview(): LearnerDashboardPreview {
    const fixtureState = createFixtureStudentState();
    const runtime = getAcademyPreviewRuntime();
    const courseCards: LearnerCoursePreviewCard[] = [...academyData.enrolledCourses, ...academyData.purchasedCourses].map((enrollment) => {
      const flow = academyLearnerPreviewService.getCourseFlow(enrollment.courseId, fixtureState);
      const hasPresentationPreview = academyData.certificates.some((certificate) => certificate.courseId === enrollment.courseId);
      const certificateState = getCertificateState(enrollment.courseId, flow.certificatePreviewEligibility.eligible, hasPresentationPreview);

      return {
        courseId: enrollment.courseId,
        routePath: "/academy/my-courses",
        displayTitle: getSafeDisplayTitle(enrollment.courseId),
        previewPointTier: flow.rewardPreview.previewPointTier,
        progressState: flow.progressState,
        contentProgress: flow.contentProgress,
        completedLessons: flow.completedLessons,
        pendingLessons: flow.pendingLessons,
        assessmentState: flow.assessment.state,
        assessmentScore: flow.assessment.score,
        assessmentThreshold: flow.assessment.threshold,
        unlockedPreviewPoints: flow.rewardPreview.unlockedPreviewPoints,
        pendingPreviewPoints: flow.rewardPreview.pendingPreviewPoints,
        recognitionStatus: flow.recognitionPreview.status,
        recognitionLabel: flow.recognitionPreview.badgePreview,
        certificateState,
        certificateLabel: getCertificateLabel(certificateState),
        nonAuthoritative: true
      };
    });

    const certificates: LearnerCertificatePreviewCard[] = [...academyData.enrolledCourses, ...academyData.purchasedCourses].map((enrollment) => {
      const flow = academyLearnerPreviewService.getCourseFlow(enrollment.courseId, fixtureState);
      const preview = academyData.certificates.find((certificate) => certificate.courseId === enrollment.courseId);
      const state = getCertificateState(enrollment.courseId, flow.certificatePreviewEligibility.eligible, Boolean(preview));

      return {
        courseId: enrollment.courseId,
        displayTitle: getSafeDisplayTitle(enrollment.courseId),
        state,
        recognitionLevel: preview?.recognitionLevel ?? "Recognition preview",
        previewLabel: getCertificateLabel(state),
        previewNote:
          state === "presentation-preview"
            ? "Mock/local certificate preview presentation only."
            : state === "eligible-preview"
              ? "Preview eligibility met. Presentation authority remains closed."
              : state === "presentation-only"
                ? "Recognition preview exists as a presentation-only local artifact."
                : "Continue local learning progress to unlock certificate preview eligibility.",
        reviewedOn: preview?.reviewedOn ?? "mock-local",
        expiresOn: preview?.expiresOn ?? "mock-local",
        governanceReviewed: preview?.governanceReviewed ?? false,
        nonAuthoritative: true
      };
    });

    return {
      runtime,
      summary: {
        completedPreviewCourses: courseCards.filter((course) => course.progressState === "completed-preview").length,
        activePreviewCourses: courseCards.filter((course) => course.progressState !== "locked-preview").length,
        eligibleRecognitionPreviews: courseCards.filter((course) => course.recognitionStatus === "eligible-preview").length,
        eligibleCertificatePreviews: certificates.filter((certificate) => ["eligible-preview", "presentation-preview"].includes(certificate.state)).length,
        totalUnlockedPreviewPoints: courseCards.reduce((sum, course) => sum + course.unlockedPreviewPoints, 0),
        totalPendingPreviewPoints: courseCards.reduce((sum, course) => sum + course.pendingPreviewPoints, 0)
      },
      courses: courseCards,
      certificates,
      rewardPanels: {
        foundation: getSafeRewardRecords(academyData.rewards.filter((reward) => reward.previewPointTier === "Foundation Preview")),
        applied: getSafeRewardRecords(academyData.rewards.filter((reward) => reward.previewPointTier === "Applied Preview"))
      }
    };
  },

  getCourseLessonCount(courseId: string) {
    return getCourseLessons(courseId).filter((lesson) => lesson.completionRequired).length;
  }
};
