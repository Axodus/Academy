import type { AcademyStudentProgressState } from "../../../repositories/academyProgressRepository";
import { getCourseLessons } from "./academyData";
import { courseProgressService } from "./courseProgressService";
import { rewardPolicyService } from "./rewardPolicyService";

export type AcademyIntegrityIssue = {
  code: string;
  severity: "error" | "warning";
  message: string;
};

export const stateIntegrityService = {
  validateCourseState(courseId: string, state: AcademyStudentProgressState): AcademyIntegrityIssue[] {
    const issues: AcademyIntegrityIssue[] = [];
    const completedLessonKeys = state.completedLessons
      .filter((completion) => completion.courseId === courseId)
      .map((completion) => completion.lessonId);
    const uniqueCompletedLessons = new Set(completedLessonKeys);

    if (uniqueCompletedLessons.size !== completedLessonKeys.length) {
      issues.push({ code: "duplicate_lesson_completion", severity: "error", message: "A lesson was completed more than once." });
    }

    const knownLessonIds = new Set(getCourseLessons(courseId).map((lesson) => lesson.id));
    for (const lessonId of uniqueCompletedLessons) {
      if (!knownLessonIds.has(lessonId)) {
        issues.push({ code: "unknown_lesson_completion", severity: "error", message: `Unknown lesson completion: ${lessonId}` });
      }
    }

    const requiredCompleted = courseProgressService.areRequiredLessonsCompleted(courseId, [...uniqueCompletedLessons]);
    const approvedAttempts = state.quizAttempts.filter((attempt) => attempt.courseId === courseId && attempt.pokStatus === "approved");
    if (approvedAttempts.length > 0 && !requiredCompleted) {
      issues.push({ code: "pok_without_required_lessons", severity: "error", message: "PoK approval exists before required lessons are complete." });
    }

    if (approvedAttempts.length > 1) {
      issues.push({ code: "duplicate_pok_approval", severity: "error", message: "Multiple approved PoK attempts exist for the same course." });
    }

    if (!rewardPolicyService.validateRewardClassSeparation(courseId)) {
      issues.push({ code: "reward_class_mismatch", severity: "error", message: "Reward gates do not match free/paid course reward class policy." });
    }

    return issues;
  }
};
