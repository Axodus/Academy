import { academyData } from "./academyData";
import { courseProgressService } from "./courseProgressService";
import { quizService } from "./quizService";
import { rewardGateService } from "./rewardGateService";

export const studentAcademyService = {
  getStudentCourses() {
    const enrollments = [...academyData.enrolledCourses, ...academyData.purchasedCourses];

    return enrollments
      .map((enrollment) => {
        const course = academyData.courses.find((item) => item.id === enrollment.courseId);
        if (!course) return undefined;

        const progress = courseProgressService.getProgress(course.id);
        const quiz = quizService.getQuiz(course.id);
        const rewardGates = rewardGateService.getRewardGates(course.id);
        const validationWeight = rewardGateService.getValidationWeight(course.id);

        return {
          enrollment,
          course,
          progress,
          quiz,
          rewardGates,
          validationWeight,
          previewPointLabel: rewardGateService.getRewardTypeLabel(course.id)
        };
      })
      .filter(Boolean);
  },

  getStudentCourse(courseId: string) {
    const course = academyData.courses.find((item) => item.id === courseId);
    if (!course) return undefined;

    return {
      course,
      enrollment: [...academyData.enrolledCourses, ...academyData.purchasedCourses].find((item) => item.courseId === courseId),
      progress: courseProgressService.getProgress(courseId),
      lessons: academyData.lessons.filter((lesson) => lesson.courseId === courseId).sort((a, b) => a.order - b.order),
      lessonProgress: courseProgressService.getLessonProgress(courseId),
      moduleProgress: courseProgressService.getModuleProgress(courseId),
      quiz: quizService.getQuiz(courseId),
      quizState: quizService.getQuizState(courseId),
      pokStatus: academyData.pokValidationStatus.find((item) => item.courseId === courseId),
      rewardGates: rewardGateService.getRewardGates(courseId),
      certificationRequirement: courseProgressService.getCertificationRequirement(courseId),
      previewPointLabel: rewardGateService.getRewardTypeLabel(courseId),
      validationWeight: rewardGateService.getValidationWeight(courseId)
    };
  }
};
