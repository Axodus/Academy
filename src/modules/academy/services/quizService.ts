import { academyData } from "./academyData";
import { courseProgressService } from "./courseProgressService";

export const quizService = {
  getQuiz(courseId: string) {
    return academyData.quizzes.find((quiz) => quiz.courseId === courseId);
  },

  getQuestions(courseId: string) {
    const quiz = this.getQuiz(courseId);
    if (!quiz) return [];
    return academyData.quizQuestions.filter((question) => question.quizId === quiz.id);
  },

  getAttempts(courseId: string) {
    return academyData.quizAttempts.filter((attempt) => attempt.courseId === courseId);
  },

  getQuizState(courseId: string, completedLessonIds?: string[]) {
    const quiz = this.getQuiz(courseId);
    if (!quiz) return "locked";
    if (quiz.state === "passed" || quiz.state === "failed" || quiz.state === "in-progress") return quiz.state;
    return courseProgressService.areRequiredLessonsCompleted(courseId, completedLessonIds) ? "available" : "locked";
  },

  evaluateAttempt(courseId: string, score: number) {
    const quiz = this.getQuiz(courseId);
    const threshold = quiz?.passingThreshold ?? 0;
    const passed = score >= threshold;

    return {
      score,
      threshold,
      result: passed ? "passed" : "failed",
      pokStatus: passed ? "approved" : "retry-required"
    } as const;
  },

  getPreviewScore(courseId: string, mode: "pass" | "fail") {
    const quiz = this.getQuiz(courseId);
    if (!quiz) return 0;
    return mode === "pass" ? Math.min(100, quiz.passingThreshold + 8) : Math.max(0, quiz.passingThreshold - 18);
  }
};
