import { describe, expect, it } from "vitest";
import { academyData } from "../src/modules/academy/services/academyData";
import { courseProgressService } from "../src/modules/academy/services/courseProgressService";
import { pokValidationService } from "../src/modules/academy/services/pokValidationService";
import { quizService } from "../src/modules/academy/services/quizService";
import { rewardGateService } from "../src/modules/academy/services/rewardGateService";
import { studentAcademyService } from "../src/modules/academy/services/studentAcademyService";

describe("Academy learning consumption and PoK reward mechanics", () => {
  it("renders student-side enrolled and purchased course read models", () => {
    const courses = studentAcademyService.getStudentCourses();

    expect(courses).toHaveLength(4);
    expect(courses.some((item) => item?.course.accessType === "free")).toBe(true);
    expect(courses.some((item) => item?.course.accessType === "paid")).toBe(true);
  });

  it("exposes lesson and module progress for enrolled course detail", () => {
    const detail = studentAcademyService.getStudentCourse("course-constitutional-onboarding");

    expect(detail?.moduleProgress[0]?.progress).toBe(67);
    expect(detail?.lessonProgress.some((lesson) => lesson.status === "completed")).toBe(true);
    expect(detail?.progress?.pendingLessons).toBe(1);
  });

  it("keeps quiz locked before required lessons are completed", () => {
    const state = quizService.getQuizState("course-constitutional-onboarding", ["lesson-constitution-1", "lesson-constitution-2"]);

    expect(state).toBe("locked");
  });

  it("unlocks quiz after all required lessons are completed", () => {
    const state = quizService.getQuizState("course-constitutional-onboarding", [
      "lesson-constitution-1",
      "lesson-constitution-2",
      "lesson-constitution-3"
    ]);

    expect(state).toBe("available");
  });

  it("approves PoK when quiz score reaches threshold", () => {
    const result = pokValidationService.validateQuizScore("course-treasury-risk", 88);

    expect(result.approved).toBe(true);
    expect(result.status).toBe("approved");
  });

  it("requires retry when quiz score misses threshold", () => {
    const result = pokValidationService.validateQuizScore("course-treasury-risk", 64);

    expect(result.approved).toBe(false);
    expect(result.status).toBe("retry-required");
  });

  it("keeps free courses on Locked $NEURONS and paid courses on Unlocked $NEURONS", () => {
    expect(rewardGateService.getRewardTypeLabel("course-constitutional-onboarding")).toBe("Locked $NEURONS");
    expect(rewardGateService.getRewardTypeLabel("course-treasury-risk")).toBe("Unlocked $NEURONS");
  });

  it("shows reward gate states and validation-heavy weights", () => {
    const gates = rewardGateService.getRewardGates("course-treasury-risk");

    expect(gates.map((gate) => gate.status)).toEqual(expect.arrayContaining(["unlocked", "pending", "locked"]));
    expect(rewardGateService.getValidationWeight("course-treasury-risk")).toBe(75);
  });

  it("requires PoK validation for certification eligibility", () => {
    expect(courseProgressService.isCertificationEligible("course-constitutional-onboarding", "pending", 100, 95)).toBe(false);
    expect(courseProgressService.isCertificationEligible("course-constitutional-onboarding", "approved", 100, 95)).toBe(true);
  });

  it("keeps future contract and reward data mock-only", () => {
    expect(academyData.futureContracts.every((contract) => contract.writesEnabled === false)).toBe(true);
    expect(academyData.rewardGates.some((gate) => gate.source === "quiz" && gate.rewardPercentage >= 40)).toBe(true);
  });
});
