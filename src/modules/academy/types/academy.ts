export type AcademyStanding = "compliant" | "approved" | "under-review" | "restricted" | "deprecated";
export type AccessType = "free" | "paid";
export type RewardType = "Locked $NEURONS" | "Unlocked $NEURONS";
export type RewardClass = "locked" | "unlocked";
export type LessonProgressStatus = "locked" | "available" | "completed" | "validated";
export type QuizState = "locked" | "available" | "in-progress" | "passed" | "failed";
export type PokStatus = "pending" | "approved" | "rejected" | "retry-required";
export type RewardGateStatus = "locked" | "pending" | "unlocked" | "rejected";

export type Tutor = {
  id: string;
  name: string;
  type: string;
  verificationStatus: string;
  governanceStanding: string;
  reputation: number;
  coursesPublished: number;
  certificatesIssued: number;
  educationalTier: string;
  constitutionalBound: boolean;
  rewardEligible: boolean;
  description: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  level: string;
  type: string;
  accessType: AccessType;
  tutorId: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  banner: string;
  tags: string[];
  language: string;
  duration: string;
  durationMinutes: number;
  lessonsCount: number;
  status: string;
  governanceStatus: string;
  constitutionalStanding: AcademyStanding;
  certificateEnabled: boolean;
  proofOfKnowledgeRequired: boolean;
  rewardType: RewardType;
  rewardAmount: number;
  rewardLocked: boolean;
  rewardSource: string;
  rewardUtility: string[];
  transferabilityStatus: string;
  prerequisites: string[];
  supportedChains: string[];
  nftAccessRequired: boolean;
  price: number;
  acceptedCurrencies: string[];
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  type: string;
  order: number;
  duration: string;
  completionRequired: boolean;
  quizRequired: boolean;
  media: string;
  resources: string[];
  status: string;
};

export type Certificate = {
  id: string;
  courseId: string;
  studentId: string;
  issueDate: string;
  expiration: string;
  verificationStatus: string;
  governanceValidated: boolean;
  nftCompatible: boolean;
  proofHash: string;
  certificationLevel: string;
};

export type RewardRecord = {
  id: string;
  studentId: string;
  courseId: string;
  rewardType: RewardType;
  rewardSource: string;
  amount: number;
  locked: boolean;
  unlockConditions: string[];
  claimable: boolean;
  governanceControlled: boolean;
  transferabilityStatus: string;
  utility: string[];
  issuedAt: string;
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
  standing: string;
  progress: number;
};

export type StudentEnrollment = {
  courseId: string;
  enrollmentType: "free-started" | "paid-purchased";
  enrolledAt?: string;
  purchasedAt?: string;
  accessState: string;
  nextAction: string;
};

export type UserCourseProgress = {
  courseId: string;
  contentProgress: number;
  lessonCompletion: number;
  quizScore: number | null;
  pokStatus: PokStatus;
  validationProgress: number;
  certificationEligibility: string;
  rewardUnlockProgress: number;
  completedLessons: number;
  pendingLessons: number;
  quizState: QuizState;
  finalEvaluationStatus: string;
  nextRecommendedAction: string;
  lockedNeuronsEarned: number;
  unlockedNeuronsEarned: number;
  pendingRewardGates: string[];
};

export type LessonProgress = {
  lessonId: string;
  courseId: string;
  status: LessonProgressStatus;
  consumed: boolean;
  validated: boolean;
  progress: number;
  rewardEarned: number;
};

export type ModuleProgress = {
  id: string;
  courseId: string;
  title: string;
  lessonIds: string[];
  status: string;
  progress: number;
};

export type LessonResource = {
  lessonId: string;
  title: string;
  type: string;
  availability: string;
};

export type Quiz = {
  id: string;
  courseId: string;
  title: string;
  passingThreshold: number;
  state: QuizState;
  retryPolicy: string;
  mainRewardWeight: number;
};

export type QuizQuestion = {
  id: string;
  quizId: string;
  prompt: string;
  correctAnswer: string;
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  courseId: string;
  score: number;
  threshold: number;
  result: "passed" | "failed";
  pokStatus: PokStatus;
  attemptedAt: string;
};

export type PokValidationRecord = {
  courseId: string;
  status: PokStatus;
  reviewer: string;
  notes: string;
};

export type RewardGate = {
  id: string;
  courseId: string;
  source: "lesson" | "module" | "quiz" | "certification";
  rewardPercentage: number;
  rewardAmount: number;
  rewardClass: RewardClass;
  unlockCondition: string;
  status: RewardGateStatus;
};

export type RewardUnlockEvent = {
  id: string;
  courseId: string;
  gateId: string;
  amount: number;
  rewardType: RewardType;
  reason: string;
  occurredAt: string;
};

export type CertificationRequirement = {
  courseId: string;
  requiredContentProgress: number;
  requiredPokStatus: PokStatus;
  requiredQuizScore: number;
  status: string;
};
