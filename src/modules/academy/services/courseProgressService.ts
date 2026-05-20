import { academyData, getCourseLessons } from "./academyData";

export const courseProgressService = {
  getProgress(courseId: string) {
    return academyData.userCourseProgress.find((progress) => progress.courseId === courseId);
  },

  getLessonProgress(courseId: string) {
    return academyData.lessonProgress.filter((progress) => progress.courseId === courseId);
  },

  getModuleProgress(courseId: string) {
    return academyData.moduleProgress.filter((module) => module.courseId === courseId);
  },

  areRequiredLessonsCompleted(courseId: string, completedLessonIds?: string[]) {
    const requiredLessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
    const completed = new Set(
      completedLessonIds ??
        academyData.lessonProgress
          .filter((progress) => progress.courseId === courseId && ["completed", "validated"].includes(progress.status))
          .map((progress) => progress.lessonId)
    );

    return requiredLessons.length > 0 && requiredLessons.every((lesson) => completed.has(lesson.id));
  },

  getContentProgress(courseId: string, completedLessonIds?: string[]) {
    const requiredLessons = getCourseLessons(courseId).filter((lesson) => lesson.completionRequired);
    if (!requiredLessons.length) return 0;

    const completed = new Set(
      completedLessonIds ??
        academyData.lessonProgress
          .filter((progress) => progress.courseId === courseId && ["completed", "validated"].includes(progress.status))
          .map((progress) => progress.lessonId)
    );

    return Math.round((requiredLessons.filter((lesson) => completed.has(lesson.id)).length / requiredLessons.length) * 100);
  },

  getCertificationRequirement(courseId: string) {
    return academyData.certificationRequirements.find((requirement) => requirement.courseId === courseId);
  },

  isCertificationEligible(courseId: string, pokStatus?: string, contentProgress?: number, quizScore?: number | null) {
    const requirement = this.getCertificationRequirement(courseId);
    if (!requirement) return false;

    return (
      (contentProgress ?? this.getContentProgress(courseId)) >= requirement.requiredContentProgress &&
      (pokStatus ?? this.getProgress(courseId)?.pokStatus) === requirement.requiredPokStatus &&
      (quizScore ?? this.getProgress(courseId)?.quizScore ?? 0) >= requirement.requiredQuizScore
    );
  }
};
