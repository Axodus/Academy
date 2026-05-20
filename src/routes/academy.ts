import { FastifyInstance } from "fastify";
import { z } from "zod";
import { academyData, getCourseLessons } from "../modules/academy/services/academyData";
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

export default async function academyRoutes(f: FastifyInstance) {
  f.addHook("onRequest", (f as any).authenticate);

  f.get("/academy/me", async (req, rep) => {
    const studentId = (req as any).user.sub as string;
    const persisted = await academyProgressRepository.getStudentState(studentId);
    return rep.send({
      identity: (req as any).user,
      student: academyData.student,
      persisted,
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

  f.get("/academy/courses/enrolled", async (_req, rep) => {
    return rep.send({ courses: studentAcademyService.getStudentCourses() });
  });

  f.get("/academy/courses/:courseId/progress", async (req, rep) => {
    const { courseId } = CourseParams.parse(req.params);
    const course = studentAcademyService.getStudentCourse(courseId);
    if (!course) return rep.code(404).send({ error: "course_not_found" });

    return rep.send({
      course,
      progress: courseProgressService.getProgress(courseId),
      rewardGates: rewardGateService.getRewardGates(courseId)
    });
  });

  f.post("/academy/courses/:courseId/lessons/:lessonId/complete", async (req, rep) => {
    const { courseId, lessonId } = LessonParams.parse(req.params);
    const studentId = (req as any).user.sub as string;
    const lesson = getCourseLessons(courseId).find((item) => item.id === lessonId);
    if (!lesson) return rep.code(404).send({ error: "lesson_not_found" });

    const completion = await academyProgressRepository.completeLesson(studentId, courseId, lessonId);
    const persisted = await academyProgressRepository.getStudentState(studentId);
    const completedLessonIds = persisted.completedLessons.filter((item) => item.courseId === courseId).map((item) => item.lessonId);

    return rep.send({
      completion,
      contentProgress: courseProgressService.getContentProgress(courseId, completedLessonIds),
      quizState: quizService.getQuizState(courseId, completedLessonIds),
      note: "Lesson completion is content consumption only. Main rewards require PoK validation."
    });
  });

  f.post("/academy/courses/:courseId/quizzes/:quizId/attempts", async (req, rep) => {
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

    return rep.send({
      attempt,
      validation,
      rewardGates: rewardGateService.getRewardGates(courseId).map((gate) => ({
        ...gate,
        status: rewardGateService.getGateStatusAfterPok(gate.status, gate.source, validation.approved)
      })),
      certificationEligible: courseProgressService.isCertificationEligible(courseId, validation.status, 100, score)
    });
  });

  f.get("/academy/courses/:courseId/reward-gates", async (req, rep) => {
    const { courseId } = CourseParams.parse(req.params);
    return rep.send({
      courseId,
      rewardType: rewardGateService.getRewardTypeLabel(courseId),
      validationWeight: rewardGateService.getValidationWeight(courseId),
      gates: rewardGateService.getRewardGates(courseId)
    });
  });

  f.get("/academy/contracts/readiness", async (_req, rep) => {
    return rep.send(academyContractReadiness.getStatus());
  });
}
