export type AcademyStanding = "compliant" | "approved" | "under-review" | "restricted" | "deprecated";
export type AccessType = "free" | "paid";
export type PreviewPointTier = "Foundation Preview" | "Applied Preview";
export type RewardClass = "foundation" | "applied";
export type LessonProgressStatus = "locked" | "available" | "completed" | "validated";
export type QuizState = "locked" | "available" | "in-progress" | "passed" | "failed";
export type PokStatus = "pending" | "approved" | "rejected" | "retry-required";
export type RewardGateStatus = "locked" | "pending" | "unlocked" | "rejected";
export type PreviewProgressState = "not-started" | "in-progress" | "completed-preview" | "locked-preview";
export type PreviewAssessmentState = "locked" | "available" | "passed" | "not-met" | "retry" | "pending-preview";
export type PreviewMutationState = "disabled" | "enabled-local-only";
export type BoundaryMetadata = {
  mode: "local-preview";
  authority: "non-authoritative";
  fixtureSource: "academy-mock-local";
  catalogVersion: string;
  deterministicOrder: {
    courses: "title-asc";
    learningPaths: "title-asc";
  };
  productionSensitiveGates: {
    contractWritesEnabled: false;
    providerExecutionEnabled: false;
    rewardExecutionEnabled: false;
    credentialIssuanceEnabled: false;
    productionPersistenceEnabled: false;
  };
};
export type RuntimePreviewMetadata = {
  authority: "mock-local";
  outputAuthority: "preview-only";
  nonAuthoritative: true;
  production: false;
  execution: "gated";
  previewMutation: PreviewMutationState;
};

export type Tutor = {
  id: string;
  name: string;
  type: string;
  reviewStatus: string;
  governanceStanding: string;
  reputation: number;
  coursesPublished: number;
  recognitionPreviewsAuthored: number;
  educationalTier: string;
  constitutionalBound: boolean;
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
  recognitionPreviewEnabled: boolean;
  proofOfKnowledgeRequired: boolean;
  previewPointTier: PreviewPointTier;
  previewPoints: number;
  previewSource: string;
  previewBenefits: string[];
  previewPolicy: string;
  prerequisites: string[];
  accessDescriptor: string;
  enrollmentVisibility: string;
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

export type CertificatePreview = {
  id: string;
  courseId: string;
  studentId: string;
  reviewedOn: string;
  expiresOn: string;
  previewStatus: string;
  governanceReviewed: boolean;
  recognitionLevel: string;
  previewNote: string;
};

export type RewardRecord = {
  id: string;
  studentId: string;
  courseId: string;
  previewPointTier: PreviewPointTier;
  previewSource: string;
  previewPoints: number;
  previewMilestones: string[];
  governanceControlled: boolean;
  previewPolicy: string;
  previewBenefits: string[];
  reviewedOn: string;
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
  foundationPointsEarned: number;
  appliedPointsEarned: number;
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
  previewPoints: number;
  rewardClass: RewardClass;
  unlockCondition: string;
  status: RewardGateStatus;
};

export type RewardUnlockEvent = {
  id: string;
  courseId: string;
  gateId: string;
  previewPoints: number;
  previewPointTier: PreviewPointTier;
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

export type LearnerRewardPreview = {
  previewPointTier: PreviewPointTier;
  totalPreviewPoints: number;
  unlockedPreviewPoints: number;
  pendingPreviewPoints: number;
  unlockedMilestones: string[];
  lockedMilestones: string[];
  nonMonetary: true;
  nonAuthoritative: true;
};

export type LearnerRecognitionPreview = {
  status: "locked-preview" | "pending-preview" | "eligible-preview";
  badgePreview: string;
  nonAuthoritative: true;
};

export type CertificatePreviewEligibility = {
  eligible: boolean;
  status: "not-met" | "pending-preview" | "eligible-preview";
  previewOnly: true;
  nonAuthoritative: true;
  recognitionOnly: true;
  externallyProvable: false;
  chainLinked: false;
  authorityBearing: false;
  portable: false;
};

export type LearnerAssessmentPreview = {
  state: PreviewAssessmentState;
  score: number | null;
  threshold: number;
  retryAvailable: boolean;
  deterministic: true;
  nonAuthoritative: true;
};

export type LearnerCoursePreviewFlow = {
  courseId: string;
  progressState: PreviewProgressState;
  completedLessons: number;
  pendingLessons: number;
  contentProgress: number;
  quizState: PreviewAssessmentState;
  assessment: LearnerAssessmentPreview;
  rewardPreview: LearnerRewardPreview;
  recognitionPreview: LearnerRecognitionPreview;
  certificatePreviewEligibility: CertificatePreviewEligibility;
};
