import { z } from "zod";

const previewPointTierSchema = z.enum(["Foundation Preview", "Applied Preview"]);
const rewardClassSchema = z.enum(["foundation", "applied"]);
const pokStatusSchema = z.enum(["pending", "approved", "rejected", "retry-required"]);
const quizStateSchema = z.enum(["locked", "available", "in-progress", "passed", "failed"]);
const lessonProgressStatusSchema = z.enum(["locked", "available", "completed", "validated"]);
const rewardGateStatusSchema = z.enum(["locked", "pending", "unlocked", "rejected"]);

const strictRecord = <T extends z.ZodRawShape>(shape: T) => z.object(shape).strict();

export const boundaryMetadataSchema = strictRecord({
  mode: z.literal("local-preview"),
  authority: z.literal("non-authoritative"),
  fixtureSource: z.literal("academy-mock-local"),
  catalogVersion: z.string(),
  deterministicOrder: strictRecord({
    courses: z.literal("title-asc"),
    learningPaths: z.literal("title-asc")
  }),
  productionSensitiveGates: strictRecord({
    contractWritesEnabled: z.literal(false),
    providerExecutionEnabled: z.literal(false),
    rewardExecutionEnabled: z.literal(false),
    credentialIssuanceEnabled: z.literal(false),
    productionPersistenceEnabled: z.literal(false)
  })
});

export const tutorSchema = strictRecord({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  reviewStatus: z.string(),
  governanceStanding: z.string(),
  reputation: z.number().int().nonnegative(),
  coursesPublished: z.number().int().nonnegative(),
  recognitionPreviewsAuthored: z.number().int().nonnegative(),
  educationalTier: z.string(),
  constitutionalBound: z.boolean(),
  description: z.string()
});

export const courseSchema = strictRecord({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  subcategory: z.string(),
  level: z.string(),
  type: z.string(),
  accessType: z.enum(["free", "paid"]),
  tutorId: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  thumbnail: z.string(),
  banner: z.string(),
  tags: z.array(z.string()),
  language: z.string(),
  duration: z.string(),
  durationMinutes: z.number().int().nonnegative(),
  lessonsCount: z.number().int().nonnegative(),
  status: z.string(),
  governanceStatus: z.string(),
  constitutionalStanding: z.enum(["compliant", "approved", "under-review", "restricted", "deprecated"]),
  recognitionPreviewEnabled: z.boolean(),
  proofOfKnowledgeRequired: z.boolean(),
  previewPointTier: previewPointTierSchema,
  previewPoints: z.number().int().nonnegative(),
  previewSource: z.string(),
  previewBenefits: z.array(z.string()),
  previewPolicy: z.string(),
  prerequisites: z.array(z.string()),
  accessDescriptor: z.string(),
  enrollmentVisibility: z.string(),
  progress: z.number().int().min(0).max(100),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const certificatePreviewSchema = strictRecord({
  id: z.string(),
  courseId: z.string(),
  studentId: z.string(),
  reviewedOn: z.string(),
  expiresOn: z.string(),
  previewStatus: z.string(),
  governanceReviewed: z.boolean(),
  recognitionLevel: z.string(),
  previewNote: z.string()
});

export const rewardRecordSchema = strictRecord({
  id: z.string(),
  studentId: z.string(),
  courseId: z.string(),
  previewPointTier: previewPointTierSchema,
  previewSource: z.string(),
  previewPoints: z.number().int().nonnegative(),
  previewMilestones: z.array(z.string()),
  governanceControlled: z.boolean(),
  previewPolicy: z.string(),
  previewBenefits: z.array(z.string()),
  reviewedOn: z.string()
});

export const rewardGateSchema = strictRecord({
  id: z.string(),
  courseId: z.string(),
  source: z.enum(["lesson", "module", "quiz", "certification"]),
  rewardPercentage: z.number().int().min(0).max(100),
  previewPoints: z.number().int().nonnegative(),
  rewardClass: rewardClassSchema,
  unlockCondition: z.string(),
  status: rewardGateStatusSchema
});

export const academyPreviewSchema = strictRecord({
  boundary: boundaryMetadataSchema,
  student: strictRecord({
    id: z.string(),
    name: z.string(),
    level: z.string(),
    levelIndex: z.number().int().nonnegative(),
    trustScore: z.number().int().min(0).max(100),
    constitutionalStanding: z.string(),
    pokReadiness: z.number().int().min(0).max(100),
    completedCourses: z.number().int().nonnegative(),
    activeCourses: z.number().int().nonnegative(),
    recognitionPreviews: z.number().int().nonnegative(),
    foundationPoints: z.number().int().nonnegative(),
    appliedPoints: z.number().int().nonnegative(),
    acsEligibility: z.string(),
    marketplaceEligibility: z.string()
  }),
  tutors: z.array(tutorSchema),
  courses: z.array(courseSchema),
  lessons: z.array(strictRecord({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    type: z.string(),
    order: z.number().int().positive(),
    duration: z.string(),
    completionRequired: z.boolean(),
    quizRequired: z.boolean(),
    media: z.string(),
    resources: z.array(z.string()),
    status: z.string()
  })),
  certificates: z.array(certificatePreviewSchema),
  rewards: z.array(rewardRecordSchema),
  enrolledCourses: z.array(strictRecord({
    courseId: z.string(),
    enrollmentType: z.enum(["free-started", "paid-purchased"]),
    enrolledAt: z.string().optional(),
    purchasedAt: z.string().optional(),
    accessState: z.string(),
    nextAction: z.string()
  })),
  purchasedCourses: z.array(strictRecord({
    courseId: z.string(),
    enrollmentType: z.enum(["free-started", "paid-purchased"]),
    enrolledAt: z.string().optional(),
    purchasedAt: z.string().optional(),
    accessState: z.string(),
    nextAction: z.string()
  })),
  freeStartedCourses: z.array(z.string()),
  userCourseProgress: z.array(strictRecord({
    courseId: z.string(),
    contentProgress: z.number().int().min(0).max(100),
    lessonCompletion: z.number().int().min(0).max(100),
    quizScore: z.number().int().min(0).max(100).nullable(),
    pokStatus: pokStatusSchema,
    validationProgress: z.number().int().min(0).max(100),
    certificationEligibility: z.string(),
    rewardUnlockProgress: z.number().int().min(0).max(100),
    completedLessons: z.number().int().nonnegative(),
    pendingLessons: z.number().int().nonnegative(),
    quizState: quizStateSchema,
    finalEvaluationStatus: z.string(),
    nextRecommendedAction: z.string(),
    foundationPointsEarned: z.number().int().nonnegative(),
    appliedPointsEarned: z.number().int().nonnegative(),
    pendingRewardGates: z.array(z.string())
  })),
  lessonProgress: z.array(strictRecord({
    lessonId: z.string(),
    courseId: z.string(),
    status: lessonProgressStatusSchema,
    consumed: z.boolean(),
    validated: z.boolean(),
    progress: z.number().int().min(0).max(100),
    rewardEarned: z.number().int().nonnegative()
  })),
  moduleProgress: z.array(strictRecord({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    lessonIds: z.array(z.string()),
    status: z.string(),
    progress: z.number().int().min(0).max(100)
  })),
  lessonResources: z.array(strictRecord({
    lessonId: z.string(),
    title: z.string(),
    type: z.string(),
    availability: z.string()
  })),
  quizzes: z.array(strictRecord({
    id: z.string(),
    courseId: z.string(),
    title: z.string(),
    passingThreshold: z.number().int().min(0).max(100),
    state: quizStateSchema,
    retryPolicy: z.string(),
    mainRewardWeight: z.number().int().min(0).max(100)
  })),
  quizQuestions: z.array(strictRecord({
    id: z.string(),
    quizId: z.string(),
    prompt: z.string(),
    correctAnswer: z.string()
  })),
  quizAttempts: z.array(strictRecord({
    id: z.string(),
    quizId: z.string(),
    courseId: z.string(),
    score: z.number().int().min(0).max(100),
    threshold: z.number().int().min(0).max(100),
    result: z.enum(["passed", "failed"]),
    pokStatus: pokStatusSchema,
    attemptedAt: z.string()
  })),
  pokValidationStatus: z.array(strictRecord({
    courseId: z.string(),
    status: pokStatusSchema,
    reviewer: z.string(),
    notes: z.string()
  })),
  rewardGates: z.array(rewardGateSchema),
  rewardUnlockEvents: z.array(strictRecord({
    id: z.string(),
    courseId: z.string(),
    gateId: z.string(),
    previewPoints: z.number().int().nonnegative(),
    previewPointTier: previewPointTierSchema,
    reason: z.string(),
    occurredAt: z.string()
  })),
  certificationRequirements: z.array(strictRecord({
    courseId: z.string(),
    requiredContentProgress: z.number().int().min(0).max(100),
    requiredPokStatus: pokStatusSchema,
    requiredQuizScore: z.number().int().min(0).max(100),
    status: z.string()
  })),
  edgeCaseScenarios: z.record(z.string(), z.unknown()),
  progressEngine: strictRecord({
    nextUnlocks: z.array(strictRecord({
      id: z.string(),
      label: z.string(),
      reward: z.string(),
      requirement: z.string()
    })),
    analytics: z.array(strictRecord({
      label: z.string(),
      value: z.number().int().min(0).max(100)
    }))
  }),
  governanceReviews: z.array(strictRecord({
    id: z.string(),
    area: z.string(),
    status: z.string(),
    reviewer: z.string(),
    risk: z.string(),
    notes: z.string()
  })),
  acsWorkflows: z.array(strictRecord({
    id: z.string(),
    name: z.string(),
    status: z.string(),
    escalation: z.string()
  })),
  learningPaths: z.array(strictRecord({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    courseIds: z.array(z.string()),
    standing: z.string(),
    progress: z.number().int().min(0).max(100)
  }))
});

function deepFreeze<T>(value: T): T {
  if (Array.isArray(value)) {
    value.forEach((item) => deepFreeze(item));
  } else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => deepFreeze(item));
  }

  return Object.freeze(value);
}

export function parseAcademyPreviewFixture(input: unknown) {
  return deepFreeze(academyPreviewSchema.parse(input));
}
