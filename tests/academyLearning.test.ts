import { rm } from "node:fs/promises";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildApp } from "../src/serverApp";
import { signLoginJwt } from "../src/libs/jwt";
import { academyData } from "../src/modules/academy/services/academyData";
import { courseProgressService } from "../src/modules/academy/services/courseProgressService";
import { pokValidationService } from "../src/modules/academy/services/pokValidationService";
import { quizService } from "../src/modules/academy/services/quizService";
import { rewardGateService } from "../src/modules/academy/services/rewardGateService";
import { studentAcademyService } from "../src/modules/academy/services/studentAcademyService";

const token = signLoginJwt({ sub: "0x1111111111111111111111111111111111111111", net: "evm", kind: "evm", chainId: 1 });

beforeEach(async () => {
  await rm(".academy-data", { recursive: true, force: true });
});

afterEach(async () => {
  await rm(".academy-data", { recursive: true, force: true });
});

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

  it("documents edge cases for failed quiz, retry policy, restricted access, and empty enrollment", () => {
    expect(academyData.edgeCaseScenarios.failedQuiz).toMatchObject({ pokStatus: "retry-required", score: 64 });
    expect(academyData.edgeCaseScenarios.retryBlocked).toMatchObject({ retryPolicy: "retry-blocked" });
    expect(academyData.edgeCaseScenarios.governanceRestrictedCourse).toMatchObject({ courseId: "course-pok-certification" });
    expect(academyData.edgeCaseScenarios.emptyEnrolledCourseList).toMatchObject({ enrolledCourses: [], purchasedCourses: [] });
  });

  it("protects Academy API routes with wallet JWT auth", async () => {
    const app = await buildApp();
    const response = await app.inject({ method: "GET", url: "/academy/me" });

    expect(response.statusCode).toBe(401);
    await app.close();
  });

  it("persists lesson completion and unlocks quiz attempts after required lessons", async () => {
    const app = await buildApp();
    const headers = { authorization: `Bearer ${token}` };
    const courseId = "course-constitutional-onboarding";

    for (const lessonId of ["lesson-constitution-1", "lesson-constitution-2", "lesson-constitution-3"]) {
      const response = await app.inject({
        method: "POST",
        url: `/academy/courses/${courseId}/lessons/${lessonId}/complete`,
        headers
      });
      expect(response.statusCode).toBe(200);
    }

    const attempt = await app.inject({
      method: "POST",
      url: `/academy/courses/${courseId}/quizzes/quiz-constitution/attempts`,
      headers,
      payload: { score: 91 }
    });
    const body = attempt.json();

    expect(attempt.statusCode).toBe(200);
    expect(body.validation.status).toBe("approved");
    expect(body.certificationEligible).toBe(true);
    await app.close();
  });

  it("keeps API quiz attempts locked until persisted required lessons are completed", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "POST",
      url: "/academy/courses/course-constitutional-onboarding/quizzes/quiz-constitution/attempts",
      headers: { authorization: `Bearer ${token}` },
      payload: { score: 91 }
    });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toMatchObject({ error: "quiz_locked" });
    await app.close();
  });

  it("exposes contract readiness without enabling writes or reward execution", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/academy/contracts/readiness",
      headers: { authorization: `Bearer ${token}` }
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.writesEnabled).toBe(false);
    expect(body.rewardExecutionEnabled).toBe(false);
    expect(body.contracts.PoKMinter.abiFunctions).toContain("recordValidation");
    expect(body.contracts.LockedNeuronsVault.abiFunctions).toContain("available");
    await app.close();
  });

  it("serves public readiness and OpenAPI documents without wallet auth", async () => {
    const app = await buildApp();
    const readiness = await app.inject({ method: "GET", url: "/readiness" });
    const openapi = await app.inject({ method: "GET", url: "/openapi.json" });

    expect(readiness.statusCode).toBe(200);
    expect(readiness.json()).toMatchObject({ contractWritesEnabled: false, rewardExecutionEnabled: false });
    expect(openapi.statusCode).toBe(200);
    expect(openapi.json().paths["/academy/contracts/readiness"]).toBeTruthy();
    await app.close();
  });
});
