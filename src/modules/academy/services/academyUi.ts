import { academyData, getCourseTitle } from "./academyData";
import { studentAcademyService } from "./studentAcademyService";

export type LearningState = "continue" | "not-started" | "completed-preview" | "review-required" | "locked";

export function getLearningState(courseId: string): LearningState {
  const record = studentAcademyService.getStudentCourse(courseId);
  if (!record) return "not-started";
  if (record.enrollment?.accessState === "locked-by-governance-review") return "review-required";
  if (record.course.status === "draft-preview") return "locked";
  if ((record.progress?.contentProgress ?? 0) >= 100 && record.progress?.pokStatus === "approved") return "completed-preview";
  if ((record.progress?.contentProgress ?? 0) === 0) return "not-started";
  return "continue";
}

export function getCurrentLearningRecord() {
  return studentAcademyService.getStudentCourses()
    .filter((record) => record && getLearningState(record.course.id) === "continue")
    .sort((left, right) => (right?.progress?.contentProgress ?? 0) - (left?.progress?.contentProgress ?? 0))[0];
}

export function getCourseAction(courseId: string) {
  const state = getLearningState(courseId);
  if (state === "continue") return { label: "Continue", state };
  if (state === "completed-preview") return { label: "Review", state };
  if (state === "review-required") return { label: "Review status", state };
  if (state === "locked") return { label: "Explore", state };
  return { label: "Start", state };
}

export function getUpcomingUnlocks(limit = 4) {
  return academyData.rewardGates
    .filter((gate) => gate.status !== "unlocked")
    .slice(0, limit)
    .map((gate) => ({
      id: gate.id,
      title: `${getCourseTitle(gate.courseId)} · ${gate.source}`,
      description: gate.unlockCondition,
      status: gate.status,
      points: gate.previewPoints
    }));
}

export function getRecentActivity(limit = 5) {
  const completed = academyData.lessonProgress
    .filter((lesson) => ["completed", "validated"].includes(lesson.status))
    .map((lesson) => ({ id: lesson.lessonId, title: `Lesson ${lesson.status}`, detail: getCourseTitle(lesson.courseId), status: lesson.status }));
  const attempts = academyData.quizAttempts.map((attempt) => ({ id: attempt.id, title: `Assessment ${attempt.result}`, detail: getCourseTitle(attempt.courseId), status: attempt.pokStatus }));
  return [...attempts, ...completed].slice(0, limit);
}

export function getPathStages(pathId = "path-governance-operator") {
  const path = academyData.learningPaths.find((item) => item.id === pathId);
  return (path?.courseIds ?? []).map((courseId, index) => {
    const course = academyData.courses.find((item) => item.id === courseId)!;
    const record = studentAcademyService.getStudentCourse(courseId);
    return {
      index: index + 1,
      course,
      state: getLearningState(courseId),
      progress: record?.progress?.contentProgress ?? course.progress,
      prerequisite: course.prerequisites.length ? course.prerequisites.map(getCourseTitle).join(", ") : "No prerequisite",
      outcome: course.previewBenefits[0] ?? course.shortDescription,
      recognition: course.recognitionPreviewEnabled ? `${course.previewPointTier} recognition` : "No recognition preview"
    };
  });
}
