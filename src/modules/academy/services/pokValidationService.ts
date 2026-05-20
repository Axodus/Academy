import { academyData } from "./academyData";
import { quizService } from "./quizService";

export const pokValidationService = {
  getStatus(courseId: string) {
    return academyData.pokValidationStatus.find((record) => record.courseId === courseId);
  },

  validateQuizScore(courseId: string, score: number) {
    const result = quizService.evaluateAttempt(courseId, score);

    return {
      courseId,
      status: result.pokStatus,
      score: result.score,
      threshold: result.threshold,
      approved: result.pokStatus === "approved",
      notes:
        result.pokStatus === "approved"
          ? "PoK approved. Validation-weighted reward gates can release in mock accounting."
          : "PoK not approved. Main reward gates remain locked until retry passes threshold."
    };
  }
};
