import { academyMock } from "../../../data/mock/academy.mock";
import { parseAcademyPreviewFixture } from "./academyPreviewSchema";
import type {
  BoundaryMetadata,
  CertificatePreview,
  CertificationRequirement,
  Course,
  LearningPath,
  Lesson,
  LessonProgress,
  LessonResource,
  ModuleProgress,
  PokValidationRecord,
  Quiz,
  QuizAttempt,
  QuizQuestion,
  RewardGate,
  RewardRecord,
  RewardUnlockEvent,
  StudentEnrollment,
  Tutor,
  UserCourseProgress
} from "../types/academy";

function sortByTitle<T extends { title: string }>(items: readonly T[]) {
  return [...items].sort((left, right) => left.title.localeCompare(right.title));
}

export const academyData = parseAcademyPreviewFixture(academyMock) as {
  boundary: BoundaryMetadata;
  student: {
    id: string;
    name: string;
    level: string;
    levelIndex: number;
    trustScore: number;
    constitutionalStanding: string;
    pokReadiness: number;
    completedCourses: number;
    activeCourses: number;
    recognitionPreviews: number;
    foundationPoints: number;
    appliedPoints: number;
    acsEligibility: string;
    marketplaceEligibility: string;
  };
  futureContracts: Array<{ id: string; name: string; role: string; status: string; writesEnabled: boolean }>;
  tutors: Tutor[];
  courses: Course[];
  lessons: Lesson[];
  certificates: CertificatePreview[];
  rewards: RewardRecord[];
  enrolledCourses: StudentEnrollment[];
  purchasedCourses: StudentEnrollment[];
  freeStartedCourses: string[];
  userCourseProgress: UserCourseProgress[];
  lessonProgress: LessonProgress[];
  moduleProgress: ModuleProgress[];
  lessonResources: LessonResource[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
  quizAttempts: QuizAttempt[];
  pokValidationStatus: PokValidationRecord[];
  rewardGates: RewardGate[];
  rewardUnlockEvents: RewardUnlockEvent[];
  certificationRequirements: CertificationRequirement[];
  edgeCaseScenarios: Record<string, unknown>;
  progressEngine: {
    nextUnlocks: Array<{ id: string; label: string; reward: string; requirement: string }>;
    analytics: Array<{ label: string; value: number }>;
  };
  governanceReviews: Array<{ id: string; area: string; status: string; reviewer: string; risk: string; notes: string }>;
  acsWorkflows: Array<{ id: string; name: string; status: string; escalation: string }>;
  learningPaths: LearningPath[];
};

export function getTutor(tutorId: string) {
  return academyData.tutors.find((tutor) => tutor.id === tutorId);
}

export function getCourseBySlug(slug: string | undefined) {
  return sortByTitle(academyData.courses).find((course) => course.slug === slug);
}

export function getCourseLessons(courseId: string) {
  return academyData.lessons.filter((lesson) => lesson.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getCourseRewards(courseId: string) {
  return academyData.rewards.filter((reward) => reward.courseId === courseId);
}

export function getLearningPath(pathId: string | undefined) {
  return sortByTitle(academyData.learningPaths).find((path) => path.id === pathId);
}

export function getCourseTitle(courseId: string) {
  return academyData.courses.find((course) => course.id === courseId)?.title ?? "Unknown course";
}

export function listCatalogCourses() {
  return sortByTitle(academyData.courses);
}

export function listLearningPaths() {
  return sortByTitle(academyData.learningPaths);
}
