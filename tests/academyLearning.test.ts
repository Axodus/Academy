import { readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildApp } from "../src/serverApp";
import { signLoginJwt } from "../src/libs/jwt";
import { academyData, listCatalogCourses, listLearningPaths } from "../src/modules/academy/services/academyData";
import { academyLearnerPreviewService } from "../src/modules/academy/services/academyLearnerPreviewService";
import { certificatePreviewSchema, rewardRecordSchema } from "../src/modules/academy/services/academyPreviewSchema";
import { getAcademyPreviewMutationGate, getAcademyPreviewRuntime } from "../src/modules/academy/services/academyPreviewRuntime";
import { courseProgressService } from "../src/modules/academy/services/courseProgressService";
import { pokValidationService } from "../src/modules/academy/services/pokValidationService";
import { quizService } from "../src/modules/academy/services/quizService";
import { rewardGateService } from "../src/modules/academy/services/rewardGateService";
import { rewardPolicyService } from "../src/modules/academy/services/rewardPolicyService";
import { stateIntegrityService } from "../src/modules/academy/services/stateIntegrityService";
import { studentAcademyService } from "../src/modules/academy/services/studentAcademyService";
import {
  academyProgressRepositoryAdapters,
  createInMemoryAcademyProgressRepository,
  createPostgresAcademyProgressRepository
} from "../src/repositories/academyProgressAdapters";
import { academyProgressRepository } from "../src/services/academyPersistence";

const token = signLoginJwt({ sub: "0x1111111111111111111111111111111111111111", net: "evm", kind: "evm", chainId: 1 });

beforeEach(async () => {
  await rm(".academy-data", { recursive: true, force: true });
});

afterEach(async () => {
  await rm(".academy-data", { recursive: true, force: true });
  delete process.env.ACADEMY_LOCAL_PREVIEW_MUTATION;
  delete process.env.NODE_ENV;
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

  it("keeps free courses on Foundation Preview and paid courses on Applied Preview", () => {
    expect(rewardGateService.getRewardTypeLabel("course-constitutional-onboarding")).toBe("Foundation Preview");
    expect(rewardGateService.getRewardTypeLabel("course-treasury-risk")).toBe("Applied Preview");
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

  it("derives deterministic learner preview progress, assessment, reward preview, and certificate-preview states", () => {
    const emptyState = { completedLessons: [], quizAttempts: [] };
    const emptyFlow = academyLearnerPreviewService.getCourseFlow("course-constitutional-onboarding", emptyState);

    expect(emptyFlow.progressState).toBe("not-started");
    expect(emptyFlow.quizState).toBe("locked");
    expect(emptyFlow.assessment.state).toBe("locked");
    expect(emptyFlow.rewardPreview.nonMonetary).toBe(true);
    expect(emptyFlow.rewardPreview.nonAuthoritative).toBe(true);
    expect(emptyFlow.certificatePreviewEligibility.eligible).toBe(false);
    expect(emptyFlow.certificatePreviewEligibility.previewOnly).toBe(true);

    const passedState = {
      completedLessons: [
        { courseId: "course-constitutional-onboarding", lessonId: "lesson-constitution-1", completedAt: "2026-06-23T00:00:00.000Z" },
        { courseId: "course-constitutional-onboarding", lessonId: "lesson-constitution-2", completedAt: "2026-06-23T00:00:01.000Z" },
        { courseId: "course-constitutional-onboarding", lessonId: "lesson-constitution-3", completedAt: "2026-06-23T00:00:02.000Z" }
      ],
      quizAttempts: [
        {
          courseId: "course-constitutional-onboarding",
          quizId: "quiz-constitution",
          score: 91,
          threshold: 80,
          result: "passed" as const,
          pokStatus: "approved" as const,
          attemptedAt: "2026-06-23T00:00:03.000Z"
        }
      ]
    };
    const passedFlow = academyLearnerPreviewService.getCourseFlow("course-constitutional-onboarding", passedState);

    expect(passedFlow.progressState).toBe("completed-preview");
    expect(passedFlow.quizState).toBe("passed");
    expect(passedFlow.assessment.state).toBe("passed");
    expect(passedFlow.rewardPreview.unlockedPreviewPoints).toBeGreaterThan(0);
    expect(passedFlow.recognitionPreview.status).toBe("eligible-preview");
    expect(passedFlow.certificatePreviewEligibility.eligible).toBe(true);
    expect(passedFlow.certificatePreviewEligibility.portable).toBe(false);
  });

  it("moves failed assessments into retry state without creating authority", () => {
    const retryFlow = academyLearnerPreviewService.getCourseFlow("course-treasury-risk", {
      completedLessons: [
        { courseId: "course-treasury-risk", lessonId: "lesson-treasury-1", completedAt: "2026-06-23T00:00:00.000Z" },
        { courseId: "course-treasury-risk", lessonId: "lesson-treasury-2", completedAt: "2026-06-23T00:00:01.000Z" },
        { courseId: "course-treasury-risk", lessonId: "lesson-treasury-3", completedAt: "2026-06-23T00:00:02.000Z" }
      ],
      quizAttempts: [
        {
          courseId: "course-treasury-risk",
          quizId: "quiz-treasury",
          score: 64,
          threshold: 82,
          result: "failed",
          pokStatus: "retry-required",
          attemptedAt: "2026-06-23T00:00:03.000Z"
        }
      ]
    });

    expect(retryFlow.quizState).toBe("retry");
    expect(retryFlow.assessment.retryAvailable).toBe(true);
    expect(retryFlow.certificatePreviewEligibility.eligible).toBe(false);
    expect(retryFlow.rewardPreview.nonAuthoritative).toBe(true);
  });

  it("keeps future contract and preview data mock-only", () => {
    expect(academyData.futureContracts.every((contract) => contract.writesEnabled === false)).toBe(true);
    expect(academyData.rewardGates.some((gate) => gate.source === "quiz" && gate.rewardPercentage >= 40)).toBe(true);
    expect(academyData.boundary).toMatchObject({
      mode: "local-preview",
      authority: "non-authoritative"
    });
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

  it("fails lesson completion POST closed by default", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "POST",
      url: "/academy/courses/course-constitutional-onboarding/lessons/lesson-constitution-1/complete",
      headers: { authorization: `Bearer ${token}` }
    });

    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      error: "preview_mutation_gated",
      runtime: {
        authority: "mock-local",
        outputAuthority: "preview-only",
        nonAuthoritative: true,
        production: false,
        execution: "gated",
        previewMutation: "disabled"
      }
    });
    await app.close();
  });

  it("fails quiz attempt POST closed by default even when boundary metadata exists", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "POST",
      url: "/academy/courses/course-constitutional-onboarding/quizzes/quiz-constitution/attempts",
      headers: { authorization: `Bearer ${token}` },
      payload: {
        score: 91,
        boundary: academyData.boundary
      }
    });

    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      boundary: academyData.boundary,
      error: "preview_mutation_gated",
      runtime: {
        previewMutation: "disabled"
      }
    });
    await app.close();
  });

  it("allows local preview POST behavior only with an explicit non-production gate", async () => {
    process.env.ACADEMY_LOCAL_PREVIEW_MUTATION = "true";
    process.env.NODE_ENV = "development";

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
    expect(body.runtime).toMatchObject({
      authority: "mock-local",
      outputAuthority: "preview-only",
      nonAuthoritative: true,
      production: false,
      execution: "gated",
      previewMutation: "enabled-local-only"
    });
    expect(body.validation.status).toBe("approved");
    expect(body.certificatePreviewEligibility.eligible).toBe(true);
    expect(body.certificatePreviewEligibility.portable).toBe(false);
    await app.close();
  });

  it("keeps API quiz attempts locked until persisted required lessons are completed when preview gating is enabled", async () => {
    process.env.ACADEMY_LOCAL_PREVIEW_MUTATION = "true";
    process.env.NODE_ENV = "development";

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

  it("does not allow preview mutation in production even when the explicit flag is set", async () => {
    process.env.ACADEMY_LOCAL_PREVIEW_MUTATION = "true";
    process.env.NODE_ENV = "production";

    const app = await buildApp();
    const response = await app.inject({
      method: "POST",
      url: "/academy/courses/course-constitutional-onboarding/lessons/lesson-constitution-1/complete",
      headers: { authorization: `Bearer ${token}` }
    });

    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      error: "preview_mutation_gated",
      gate: {
        runtimeNonProduction: false,
        previewFlagEnabled: true
      }
    });
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

  it("uses repository abstraction for idempotent lesson completion", async () => {
    const studentId = "student-repository-test";
    const first = await academyProgressRepository.completeLesson(studentId, "course-constitutional-onboarding", "lesson-constitution-1");
    const second = await academyProgressRepository.completeLesson(studentId, "course-constitutional-onboarding", "lesson-constitution-1");
    const state = await academyProgressRepository.getStudentState(studentId);

    expect(first).toEqual(second);
    expect(state.completedLessons).toHaveLength(1);
  });

  it("defines DB-ready repository adapters without enabling production Postgres persistence", async () => {
    expect(academyProgressRepositoryAdapters.map((adapter) => adapter.kind)).toEqual(expect.arrayContaining(["json", "memory", "postgres"]));

    const repository = createInMemoryAcademyProgressRepository();
    await repository.completeLesson("student-memory-test", "course-constitutional-onboarding", "lesson-constitution-1");
    const state = await repository.getStudentState("student-memory-test");

    expect(state.completedLessons).toHaveLength(1);
    await expect(createPostgresAcademyProgressRepository({ connectionString: "postgres://placeholder" }).getStudentState("student")).rejects.toThrow(
      /placeholder/
    );
  });

  it("detects invalid state transitions before production persistence adapters", () => {
    const issues = stateIntegrityService.validateCourseState("course-constitutional-onboarding", {
      completedLessons: [],
      quizAttempts: [
        {
          courseId: "course-constitutional-onboarding",
          quizId: "quiz-constitution",
          score: 91,
          threshold: 80,
          result: "passed",
          pokStatus: "approved",
          attemptedAt: new Date().toISOString()
        }
      ]
    });

    expect(issues.map((issue) => issue.code)).toContain("pok_without_required_lessons");
  });

  it("keeps reward policy isolated from PoK validation and enforces reward class separation", () => {
    expect(rewardPolicyService.getValidationWeight("course-constitutional-onboarding")).toBe(75);
    expect(rewardPolicyService.validateRewardClassSeparation("course-constitutional-onboarding")).toBe(true);
    expect(rewardPolicyService.validateRewardClassSeparation("course-treasury-risk")).toBe(true);
  });

  it("validates strict preview schemas and rejects prohibited authority fields", () => {
    expect(() =>
      rewardRecordSchema.parse({
        id: "preview-1",
        studentId: "student",
        courseId: "course",
        previewPointTier: "Foundation Preview",
        previewSource: "fixture",
        previewPoints: 10,
        previewMilestones: ["lesson"],
        governanceControlled: true,
        previewPolicy: "local preview only",
        previewBenefits: ["visibility"],
        reviewedOn: "2026-06-23",
        claimable: true
      })
    ).toThrow();

    expect(() =>
      certificatePreviewSchema.parse({
        id: "recognition-1",
        courseId: "course",
        studentId: "student",
        reviewedOn: "2026-06-23",
        expiresOn: "2027-06-23",
        previewStatus: "mock-preview",
        governanceReviewed: true,
        recognitionLevel: "Foundational",
        previewNote: "preview only",
        proofHash: "forbidden"
      })
    ).toThrow();
  });

  it("orders catalog courses and learning paths deterministically", () => {
    expect(listCatalogCourses().map((course) => course.title)).toEqual([
      "Axodus Constitutional Onboarding",
      "Marketplace Activation and Tutor Monetization",
      "Proof of Knowledge Recognition Design",
      "Treasury Risk and Sustainable Emissions"
    ]);

    expect(listLearningPaths().map((path) => path.title)).toEqual([
      "Governance Operator Path",
      "Marketplace Creator Path"
    ]);
  });

  it("keeps learner-facing academy sources free of prohibited authority identifiers", async () => {
    const roots = [
      path.resolve("src/data/mock/academy.mock.js"),
      path.resolve("src/modules/academy"),
      path.resolve("src/routes/academy.ts")
    ];
    const prohibited = [
      "claimable",
      "claimed",
      "minted",
      "issued",
      "issuanceDate",
      "proofHash",
      "verificationUrl",
      "verificationStatus",
      "walletDistribution",
      "tokenBalance",
      "transferable",
      "sbt",
      "nft",
      "onChain",
      "txHash",
      "contractAddress"
    ];

    const files = await collectFiles(roots);
    const lowerContents = await Promise.all(files.map(async (file) => ({ file, text: (await readFile(file, "utf8")).toLowerCase() })));

    for (const term of prohibited) {
      const offender = lowerContents.find(({ text }) => text.includes(term.toLowerCase()));
      expect(offender?.file, `unexpected prohibited learner-facing identifier: ${term}`).toBeUndefined();
    }
  });

  it("keeps learner-facing Academy UI copy free of restricted authority semantics", async () => {
    const roots = [
      path.resolve("src/modules/academy/pages"),
      path.resolve("src/modules/academy/components"),
      path.resolve("src/routes/academy.ts")
    ];
    const restricted = [
      "$neurons",
      "multichain",
      "claim",
      "transfer",
      "payout",
      "settlement",
      "issuance",
      "verification",
      "ownership",
      "signer",
      "mock balance"
    ];

    const files = await collectFiles(roots);
    const lowerContents = await Promise.all(files.map(async (file) => ({ file, text: (await readFile(file, "utf8")).toLowerCase() })));

    for (const term of restricted) {
      const offender = lowerContents.find(({ text }) => text.includes(term));
      expect(offender?.file, `unexpected restricted learner-facing UI semantic: ${term}`).toBeUndefined();
    }
  });

  it("exposes explicit runtime preview metadata without allowing boundary metadata to authorize mutation", () => {
    expect(getAcademyPreviewRuntime()).toMatchObject({
      authority: "mock-local",
      outputAuthority: "preview-only",
      nonAuthoritative: true,
      production: false,
      execution: "gated",
      previewMutation: "disabled"
    });
    expect(getAcademyPreviewMutationGate().allowed).toBe(false);
  });

  it("keeps learner-facing serialized academy responses free of prohibited authority fields", async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/academy/courses/course-constitutional-onboarding/progress",
      headers: { authorization: `Bearer ${token}` }
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.stringify(response.json()).toLowerCase();

    for (const term of [
      "claimable",
      "proofhash",
      "verificationurl",
      "verificationstatus",
      "walletdistribution",
      "tokenbalance",
      "transferable",
      "txhash",
      "contractaddress",
      "walletclaim",
      "rewardclaim",
      "certificateissue",
      "credentialverification",
      "tokenreward"
    ]) {
      expect(body.includes(term), `unexpected prohibited serialized field: ${term}`).toBe(false);
    }

    await app.close();
  });
});

async function collectFiles(entries: string[]): Promise<string[]> {
  const results: string[] = [];

  for (const entry of entries) {
    const stats = await readdir(entry, { withFileTypes: true }).catch(() => null);
    if (!stats) {
      results.push(entry);
      continue;
    }

    for (const item of stats) {
      const next = path.join(entry, item.name);
      if (item.isDirectory()) {
        results.push(...(await collectFiles([next])));
      } else if (/\.(ts|tsx|js)$/.test(item.name)) {
        results.push(next);
      }
    }
  }

  return results;
}
