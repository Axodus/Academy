import { FastifyInstance } from "fastify";
import { z } from "zod";
import { academyData, getCourseLessons } from "../modules/academy/services/academyData";
import { academyLearnerPreviewService } from "../modules/academy/services/academyLearnerPreviewService";
import { getAcademyPreviewMutationGate, getAcademyPreviewRuntime } from "../modules/academy/services/academyPreviewRuntime";
import { academyContractReadiness } from "../modules/academy/services/contractReadiness";
import { courseProgressService } from "../modules/academy/services/courseProgressService";
import { pokValidationService } from "../modules/academy/services/pokValidationService";
import { quizService } from "../modules/academy/services/quizService";
import { rewardGateService } from "../modules/academy/services/rewardGateService";
import { stateIntegrityService } from "../modules/academy/services/stateIntegrityService";
import { studentAcademyService } from "../modules/academy/services/studentAcademyService";
import { academyProgressRepository } from "../services/academyPersistence";

const LessonParams = z.object({
  courseId: z.string(),
  lessonId: z.string()
});

const CourseParams = z.object({
  courseId: z.string()
});

const QuizAttemptParams = z.object({
  courseId: z.string(),
  quizId: z.string()
});

const QuizAttemptBody = z.object({
  score: z.number().int().min(0).max(100)
});

function gatedPreviewMutationResponse() {
  const gate = getAcademyPreviewMutationGate();

  return {
    statusCode: 403,
    body: {
      boundary: academyData.boundary,
      runtime: gate.runtime,
      error: "preview_mutation_gated",
      reason: "Local preview mutation is disabled unless explicit non-production local preview gating is enabled.",
      gate: gate.conditions
    }
  };
}

export default async function academyRoutes(f: FastifyInstance) {
  f.addHook("onRequest", (f as any).authenticate);

  f.get("/academy/me", async (req, rep) => {
    const studentId = (req as any).user.sub as string;
    const persisted = await academyProgressRepository.getStudentState(studentId);
    const runtime = getAcademyPreviewRuntime();
    const learnerFlows = [...academyData.enrolledCourses, ...academyData.purchasedCourses].map((enrollment) =>
      academyLearnerPreviewService.getCourseFlow(enrollment.courseId, persisted)
    );

    return rep.send({
      boundary: academyData.boundary,
      runtime,
      identity: (req as any).user,
      student: academyData.student,
      persisted,
      learnerFlows,
      integrity: {
        constitutionalOnboarding: stateIntegrityService.validateCourseState("course-constitutional-onboarding", persisted),
        treasuryRisk: stateIntegrityService.validateCourseState("course-treasury-risk", persisted)
      },
      readiness: {
        mode: "integration-readiness",
        contractWritesEnabled: false,
        rewardExecutionEnabled: false
      }
    });
  });

  f.get("/academy/courses/enrolled", async (req, rep) => {
    const studentId = (req as any).user.sub as string;
    const persisted = await academyProgressRepository.getStudentState(studentId);
    const runtime = getAcademyPreviewRuntime();

    return rep.send({
      boundary: academyData.boundary,
      runtime,
      courses: studentAcademyService.getStudentCourses().map((course) => ({
        ...course,
        learnerFlow: academyLearnerPreviewService.getCourseFlow(course?.course.id ?? "", persisted)
      }))
    });
  });

  f.get("/academy/courses/:courseId/progress", async (req, rep) => {
    const { courseId } = CourseParams.parse(req.params);
    const studentId = (req as any).user.sub as string;
    const persisted = await academyProgressRepository.getStudentState(studentId);
    const course = studentAcademyService.getStudentCourse(courseId);
    if (!course) return rep.code(404).send({ error: "course_not_found" });

    return rep.send({
      boundary: academyData.boundary,
      runtime: getAcademyPreviewRuntime(),
      course,
      progress: academyLearnerPreviewService.getCourseFlow(courseId, persisted),
      rewardGates: rewardGateService.getRewardGates(courseId)
    });
  });

  f.post("/academy/courses/:courseId/lessons/:lessonId/complete", async (req, rep) => {
    const gated = gatedPreviewMutationResponse();
    if (gated.statusCode !== 200 && gated.body.runtime.previewMutation !== "enabled-local-only") {
      return rep.code(gated.statusCode).send(gated.body);
    }

    const { courseId, lessonId } = LessonParams.parse(req.params);
    const studentId = (req as any).user.sub as string;
    const lesson = getCourseLessons(courseId).find((item) => item.id === lessonId);
    if (!lesson) return rep.code(404).send({ error: "lesson_not_found" });

    const completion = await academyProgressRepository.completeLesson(studentId, courseId, lessonId);
    const persisted = await academyProgressRepository.getStudentState(studentId);
    const completedLessonIds = persisted.completedLessons.filter((item) => item.courseId === courseId).map((item) => item.lessonId);

    return rep.send({
      boundary: academyData.boundary,
      runtime: getAcademyPreviewRuntime(),
      completion,
      contentProgress: courseProgressService.getContentProgress(courseId, completedLessonIds),
      quizState: quizService.getQuizState(courseId, completedLessonIds),
      learnerFlow: academyLearnerPreviewService.getCourseFlow(courseId, persisted),
      note: "Lesson completion is a local preview only. No external authority is created."
    });
  });

  f.post("/academy/courses/:courseId/quizzes/:quizId/attempts", async (req, rep) => {
    const gated = gatedPreviewMutationResponse();
    if (gated.statusCode !== 200 && gated.body.runtime.previewMutation !== "enabled-local-only") {
      return rep.code(gated.statusCode).send(gated.body);
    }

    const { courseId, quizId } = QuizAttemptParams.parse(req.params);
    const { score } = QuizAttemptBody.parse(req.body);
    const studentId = (req as any).user.sub as string;
    const quiz = quizService.getQuiz(courseId);
    if (!quiz || quiz.id !== quizId) return rep.code(404).send({ error: "quiz_not_found" });

    const persisted = await academyProgressRepository.getStudentState(studentId);
    const completedLessonIds = persisted.completedLessons.filter((item) => item.courseId === courseId).map((item) => item.lessonId);
    if (!courseProgressService.areRequiredLessonsCompleted(courseId, completedLessonIds)) {
      return rep.code(409).send({
        error: "quiz_locked",
        requirement: "Complete all required lessons before PoK evaluation."
      });
    }

    const evaluation = quizService.evaluateAttempt(courseId, score);
    const validation = pokValidationService.validateQuizScore(courseId, score);
    const attempt = await academyProgressRepository.recordQuizAttempt(studentId, {
      courseId,
      quizId,
      score,
      threshold: evaluation.threshold,
      result: evaluation.result,
      pokStatus: evaluation.pokStatus,
      attemptedAt: new Date().toISOString()
    });
    const nextState = await academyProgressRepository.getStudentState(studentId);

    return rep.send({
      boundary: academyData.boundary,
      runtime: getAcademyPreviewRuntime(),
      attempt,
      validation,
      assessment: academyLearnerPreviewService.getCourseFlow(courseId, nextState).assessment,
      rewardGates: rewardGateService.getRewardGates(courseId).map((gate) => ({
        ...gate,
        status: rewardGateService.getGateStatusAfterPok(gate.status, gate.source, validation.approved)
      })),
      rewardPreview: academyLearnerPreviewService.getCourseFlow(courseId, nextState).rewardPreview,
      recognitionPreview: academyLearnerPreviewService.getCourseFlow(courseId, nextState).recognitionPreview,
      certificatePreviewEligibility: academyLearnerPreviewService.getCourseFlow(courseId, nextState).certificatePreviewEligibility
    });
  });

  f.get("/academy/courses/:courseId/reward-gates", async (req, rep) => {
    const { courseId } = CourseParams.parse(req.params);
    return rep.send({
      boundary: academyData.boundary,
      runtime: getAcademyPreviewRuntime(),
      courseId,
      previewPointTier: rewardGateService.getRewardTypeLabel(courseId),
      validationWeight: rewardGateService.getValidationWeight(courseId),
      gates: rewardGateService.getRewardGates(courseId)
    });
  });

  f.get("/academy/contracts/readiness", async (_req, rep) => {
    return rep.send({
      boundary: academyData.boundary,
      runtime: getAcademyPreviewRuntime(),
      ...academyContractReadiness.getStatus()
    });
  });
}
