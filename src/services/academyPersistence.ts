import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { z } from "zod";
import { env } from "../config/env";
import type { AcademyProgressRepository, QuizAttemptRecord } from "../repositories/academyProgressRepository";

const LessonCompletion = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  completedAt: z.string()
});

const QuizAttempt = z.object({
  courseId: z.string(),
  quizId: z.string(),
  score: z.number().int().min(0).max(100),
  threshold: z.number().int().min(0).max(100),
  result: z.enum(["passed", "failed"]),
  pokStatus: z.enum(["approved", "retry-required"]),
  attemptedAt: z.string()
});

const StudentState = z.object({
  completedLessons: z.array(LessonCompletion).default([]),
  quizAttempts: z.array(QuizAttempt).default([])
});

const AcademyStore = z.object({
  students: z.record(z.string(), StudentState).default({})
});

export type AcademyStore = z.infer<typeof AcademyStore>;
export type PersistedQuizAttempt = z.infer<typeof QuizAttempt>;

const storePath = resolve(process.cwd(), env.academyDataFile);

async function readStore(): Promise<AcademyStore> {
  try {
    const raw = await readFile(storePath, "utf8");
    return AcademyStore.parse(JSON.parse(raw));
  } catch (error: any) {
    if (error?.code === "ENOENT") return { students: {} };
    throw error;
  }
}

async function writeStore(store: AcademyStore) {
  await mkdir(dirname(storePath), { recursive: true });
  await writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function ensureStudent(store: AcademyStore, studentId: string) {
  store.students[studentId] ??= { completedLessons: [], quizAttempts: [] };
  return store.students[studentId];
}

export const jsonAcademyProgressRepository: AcademyProgressRepository = {
  async getStudentState(studentId: string) {
    const store = await readStore();
    return ensureStudent(store, studentId);
  },

  async completeLesson(studentId: string, courseId: string, lessonId: string) {
    const store = await readStore();
    const student = ensureStudent(store, studentId);
    const existing = student.completedLessons.find((item) => item.courseId === courseId && item.lessonId === lessonId);
    if (existing) return existing;

    const completion = { courseId, lessonId, completedAt: new Date().toISOString() };
    student.completedLessons.push(completion);
    await writeStore(store);
    return completion;
  },

  async recordQuizAttempt(studentId: string, attempt: QuizAttemptRecord) {
    const store = await readStore();
    const student = ensureStudent(store, studentId);
    student.quizAttempts.push(attempt);
    await writeStore(store);
    return attempt;
  }
};

export const academyProgressRepository: AcademyProgressRepository = jsonAcademyProgressRepository;
export const academyPersistence = academyProgressRepository;
