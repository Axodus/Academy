import type {
  AcademyProgressRepository,
  AcademyProgressRepositoryAdapterDescriptor,
  AcademyStudentProgressState,
  LessonCompletionRecord,
  QuizAttemptRecord
} from "./academyProgressRepository";

export type JsonAcademyProgressRepositoryOptions = {
  storePath: string;
};

export type PostgresAcademyProgressRepositoryOptions = {
  connectionString: string;
  schema?: string;
};

export const academyProgressRepositoryAdapters: AcademyProgressRepositoryAdapterDescriptor[] = [
  {
    kind: "json",
    status: "active",
    description: "Local JSON persistence for integration-readiness and mock API execution."
  },
  {
    kind: "postgres",
    status: "placeholder",
    description: "Production database adapter boundary. Not implemented until DB schema is approved."
  },
  {
    kind: "memory",
    status: "test-only",
    description: "Deterministic in-memory adapter for unit and API tests."
  }
];

function emptyState(): AcademyStudentProgressState {
  return { completedLessons: [], quizAttempts: [] };
}

function cloneState(state: AcademyStudentProgressState): AcademyStudentProgressState {
  return {
    completedLessons: state.completedLessons.map((item) => ({ ...item })),
    quizAttempts: state.quizAttempts.map((item) => ({ ...item }))
  };
}

export function createInMemoryAcademyProgressRepository(seed: Record<string, AcademyStudentProgressState> = {}): AcademyProgressRepository {
  const students = new Map<string, AcademyStudentProgressState>(
    Object.entries(seed).map(([studentId, state]) => [studentId, cloneState(state)])
  );

  function ensureStudent(studentId: string) {
    const existing = students.get(studentId);
    if (existing) return existing;

    const created = emptyState();
    students.set(studentId, created);
    return created;
  }

  return {
    async getStudentState(studentId: string) {
      return cloneState(ensureStudent(studentId));
    },

    async completeLesson(studentId: string, courseId: string, lessonId: string): Promise<LessonCompletionRecord> {
      const student = ensureStudent(studentId);
      const existing = student.completedLessons.find((item) => item.courseId === courseId && item.lessonId === lessonId);
      if (existing) return { ...existing };

      const completion = { courseId, lessonId, completedAt: new Date().toISOString() };
      student.completedLessons.push(completion);
      return { ...completion };
    },

    async recordQuizAttempt(studentId: string, attempt: QuizAttemptRecord) {
      const student = ensureStudent(studentId);
      student.quizAttempts.push({ ...attempt });
      return { ...attempt };
    }
  };
}

export function createPostgresAcademyProgressRepository(_options: PostgresAcademyProgressRepositoryOptions): AcademyProgressRepository {
  const unavailable = async () => {
    throw new Error("Postgres Academy progress repository is a production placeholder. Approve schema and migrations before enabling it.");
  };

  return {
    getStudentState: unavailable,
    completeLesson: unavailable,
    recordQuizAttempt: unavailable
  };
}
