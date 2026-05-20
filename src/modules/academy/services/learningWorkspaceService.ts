import { academyData, getCourseLessons } from "./academyData";
import { courseProgressService } from "./courseProgressService";
import { quizService } from "./quizService";
import { rewardGateService } from "./rewardGateService";

export const learningWorkspaceService = {
  getWorkspace(courseId: string, lessonId?: string, completedLessonIds?: string[]) {
    const course = academyData.courses.find((item) => item.id === courseId);
    if (!course) return undefined;

    const lessons = getCourseLessons(courseId);
    const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];
    const lessonProgress = academyData.lessonProgress.find((progress) => progress.lessonId === lesson?.id);
    const progress = courseProgressService.getProgress(courseId);
    const resources = academyData.lessonResources.filter((resource) => resource.lessonId === lesson?.id);
    const rewardGates = rewardGateService.getRewardGates(courseId);
    const quiz = quizService.getQuiz(courseId);
    const quizState = quizService.getQuizState(courseId, completedLessonIds);
    const nextLesson = lesson ? lessons.find((item) => item.order === lesson.order + 1) : undefined;
    const previousLesson = lesson ? lessons.find((item) => item.order === lesson.order - 1) : undefined;

    return {
      course,
      lessons,
      lesson,
      lessonProgress,
      progress,
      resources,
      rewardGates,
      quiz,
      quizState,
      nextLesson,
      previousLesson,
      moduleProgress: courseProgressService.getModuleProgress(courseId),
      rewardTypeLabel: rewardGateService.getRewardTypeLabel(courseId)
    };
  }
};
