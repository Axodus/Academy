export type LessonCompletionRecord = {
  courseId: string;
  lessonId: string;
  completedAt: string;
};

export type QuizAttemptRecord = {
  courseId: string;
  quizId: string;
  score: number;
  threshold: number;
  result: "passed" | "failed";
  pokStatus: "approved" | "retry-required";
  attemptedAt: string;
};

export type AcademyStudentProgressState = {
  completedLessons: LessonCompletionRecord[];
  quizAttempts: QuizAttemptRecord[];
};

export type AcademyProgressRepositoryAdapterKind = "json" | "postgres" | "memory";

export type AcademyProgressRepositoryAdapterStatus = "active" | "placeholder" | "test-only";

export type AcademyProgressRepositoryAdapterDescriptor = {
  kind: AcademyProgressRepositoryAdapterKind;
  status: AcademyProgressRepositoryAdapterStatus;
  description: string;
};

export interface AcademyProgressRepository {
  getStudentState(studentId: string): Promise<AcademyStudentProgressState>;
  completeLesson(studentId: string, courseId: string, lessonId: string): Promise<LessonCompletionRecord>;
  recordQuizAttempt(studentId: string, attempt: QuizAttemptRecord): Promise<QuizAttemptRecord>;
}
