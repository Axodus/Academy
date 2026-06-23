export const academyMock = {
  boundary: {
    mode: "local-preview",
    authority: "non-authoritative",
    fixtureSource: "academy-mock-local",
    catalogVersion: "2026-06-23.sprint-02",
    deterministicOrder: {
      courses: "title-asc",
      learningPaths: "title-asc"
    },
    productionSensitiveGates: {
      contractWritesEnabled: false,
      providerExecutionEnabled: false,
      rewardExecutionEnabled: false,
      credentialIssuanceEnabled: false,
      productionPersistenceEnabled: false
    }
  },
  student: {
    id: "student_demo_001",
    name: "Academy Contributor",
    level: "Governance Apprentice",
    levelIndex: 4,
    trustScore: 78,
    constitutionalStanding: "approved",
    pokReadiness: 72,
    completedCourses: 3,
    activeCourses: 2,
    recognitionPreviews: 2,
    foundationPoints: 1840,
    appliedPoints: 420,
    acsEligibility: "eligible-for-review",
    marketplaceEligibility: "eligible-for-vouchers"
  },
  futureContracts: [
    {
      id: "pok-minter",
      name: "PoKMinter",
      role: "Future compatibility surface for PoK-reviewed preview classifications.",
      status: "mock-read-model",
      writesEnabled: false
    },
    {
      id: "locked-neurons-vault",
      name: "LockedNeuronsVault",
      role: "Future compatibility surface for internal preview accounting categories.",
      status: "mock-read-model",
      writesEnabled: false
    },
    {
      id: "reward-policy",
      name: "RewardPolicy",
      role: "Future policy surface for preview point tiers, unlock rules, and anti-abuse limits.",
      status: "mock-read-model",
      writesEnabled: false
    },
    {
      id: "treasury-emission-budget",
      name: "TreasuryEmissionBudget",
      role: "Future treasury compatibility reference kept outside learner-facing authority.",
      status: "mock-read-model",
      writesEnabled: false
    }
  ],
  tutors: [
    {
      id: "tutor-axodus-governance",
      name: "Axodus Governance Faculty",
      type: "Internal Axodus Educator",
      reviewStatus: "verified",
      governanceStanding: "verified",
      reputation: 96,
      coursesPublished: 4,
      recognitionPreviewsAuthored: 128,
      educationalTier: "Constitutional",
      constitutionalBound: true,
      description: "Internal faculty responsible for constitutional literacy, DAO operations, and treasury-aware learning paths."
    },
    {
      id: "tutor-defi-dao",
      name: "Defi Operators DAO",
      type: "DAO",
      reviewStatus: "under-review",
      governanceStanding: "probation",
      reputation: 84,
      coursesPublished: 2,
      recognitionPreviewsAuthored: 42,
      educationalTier: "Professional",
      constitutionalBound: true,
      description: "DAO tutor group preparing operators for treasury, risk, and protocol participation."
    },
    {
      id: "tutor-marketplace",
      name: "Marketplace Guild",
      type: "Partner",
      reviewStatus: "verified",
      governanceStanding: "verified",
      reputation: 89,
      coursesPublished: 3,
      recognitionPreviewsAuthored: 77,
      educationalTier: "Ecosystem",
      constitutionalBound: true,
      description: "Partner educator focused on creator monetization, voucher usage, and educational commerce."
    }
  ],
  courses: [
    {
      id: "course-constitutional-onboarding",
      title: "Axodus Constitutional Onboarding",
      slug: "constitutional-onboarding",
      category: "Governance",
      subcategory: "Constitution",
      level: "Introductory",
      type: "Free Course",
      accessType: "free",
      tutorId: "tutor-axodus-governance",
      description: "The required formation path for understanding Axodus constitutional standards, ecosystem roles, and responsible participation.",
      shortDescription: "Constitutional literacy for new Axodus participants.",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
      banner: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
      tags: ["constitution", "governance", "onboarding"],
      language: "English",
      duration: "3h 20m",
      durationMinutes: 200,
      lessonsCount: 6,
      status: "published",
      governanceStatus: "approved",
      constitutionalStanding: "compliant",
      recognitionPreviewEnabled: true,
      proofOfKnowledgeRequired: true,
      previewPointTier: "Foundation Preview",
      previewPoints: 320,
      previewSource: "Free course preview",
      previewBenefits: ["vouchers", "marketplace access", "internal services", "voting practice"],
      previewPolicy: "Local preview only. No balance, claim, transfer, payout, or settlement.",
      prerequisites: [],
      accessDescriptor: "Open local preview",
      enrollmentVisibility: "No payment or external action required",
      progress: 82,
      createdAt: "2026-04-01",
      updatedAt: "2026-05-12"
    },
    {
      id: "course-treasury-risk",
      title: "Treasury Risk and Sustainable Emissions",
      slug: "treasury-risk-sustainable-emissions",
      category: "Treasury",
      subcategory: "Risk",
      level: "Advanced",
      type: "Paid Course",
      accessType: "paid",
      tutorId: "tutor-defi-dao",
      description: "Professional track covering emission budgets, reward abuse prevention, treasury reporting, and governance-controlled distribution.",
      shortDescription: "Treasury-aware reward design for protocol operators.",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
      banner: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
      tags: ["treasury", "risk", "rewards"],
      language: "English",
      duration: "6h 45m",
      durationMinutes: 405,
      lessonsCount: 10,
      status: "published",
      governanceStatus: "under-review",
      constitutionalStanding: "under-review",
      recognitionPreviewEnabled: true,
      proofOfKnowledgeRequired: true,
      previewPointTier: "Applied Preview",
      previewPoints: 950,
      previewSource: "Paid course preview",
      previewBenefits: ["advanced pathway visibility", "professional readiness preview", "governance study track"],
      previewPolicy: "Preview points remain non-monetary and cannot create entitlement in any mode.",
      prerequisites: ["course-constitutional-onboarding"],
      accessDescriptor: "Local paid-path simulation",
      enrollmentVisibility: "Catalog-only purchase preview",
      progress: 46,
      createdAt: "2026-04-10",
      updatedAt: "2026-05-14"
    },
    {
      id: "course-marketplace-activation",
      title: "Marketplace Activation and Tutor Monetization",
      slug: "marketplace-activation-tutor-monetization",
      category: "Marketplace",
      subcategory: "Creator Economy",
      level: "Intermediate",
      type: "Free Course",
      accessType: "free",
      tutorId: "tutor-marketplace",
      description: "Learn how education, vouchers, creator royalties, and internal services compose into Academy marketplace activation.",
      shortDescription: "Marketplace literacy for students, tutors, and ecosystem creators.",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
      banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
      tags: ["marketplace", "tutors", "vouchers"],
      language: "Portuguese",
      duration: "4h 10m",
      durationMinutes: 250,
      lessonsCount: 8,
      status: "published",
      governanceStatus: "approved",
      constitutionalStanding: "approved",
      recognitionPreviewEnabled: true,
      proofOfKnowledgeRequired: true,
      previewPointTier: "Foundation Preview",
      previewPoints: 410,
      previewSource: "Free course preview",
      previewBenefits: ["marketplace orientation", "license preview", "internal benefits"],
      previewPolicy: "Local preview only. No balance, claim, transfer, payout, or settlement.",
      prerequisites: ["course-constitutional-onboarding"],
      accessDescriptor: "Open local preview",
      enrollmentVisibility: "No payment or external action required",
      progress: 100,
      createdAt: "2026-04-18",
      updatedAt: "2026-05-10"
    },
    {
      id: "course-pok-certification",
      title: "Proof of Knowledge Recognition Design",
      slug: "proof-of-knowledge-certification-design",
      category: "Proof of Knowledge",
      subcategory: "Recognition Preview",
      level: "Advanced",
      type: "Paid Course",
      accessType: "paid",
      tutorId: "tutor-axodus-governance",
      description: "Design PoK checkpoints and anti-fraud recognition-preview flows without issuing real credentials.",
      shortDescription: "PoK validation architecture for Academy recognition stewards.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      tags: ["PoK", "recognition-preview", "anti-abuse"],
      language: "English",
      duration: "7h 30m",
      durationMinutes: 450,
      lessonsCount: 12,
      status: "draft-preview",
      governanceStatus: "under-review",
      constitutionalStanding: "under-review",
      recognitionPreviewEnabled: true,
      proofOfKnowledgeRequired: true,
      previewPointTier: "Applied Preview",
      previewPoints: 1200,
      previewSource: "Paid course preview",
      previewBenefits: ["advanced review pathway", "assessment stewardship practice", "ACS study visibility"],
      previewPolicy: "Preview points remain non-monetary and cannot create entitlement in any mode.",
      prerequisites: ["course-constitutional-onboarding", "course-treasury-risk"],
      accessDescriptor: "Local paid-path simulation",
      enrollmentVisibility: "Catalog-only purchase preview",
      progress: 18,
      createdAt: "2026-05-01",
      updatedAt: "2026-05-16"
    }
  ],
  lessons: [
    { id: "lesson-constitution-1", courseId: "course-constitutional-onboarding", title: "Academy as Constitutional Infrastructure", type: "Reading", order: 1, duration: "28m", completionRequired: true, quizRequired: false, media: "article", resources: ["Academy Constitution"], status: "available" },
    { id: "lesson-constitution-2", courseId: "course-constitutional-onboarding", title: "Governance Literacy and Voting Utility", type: "Governance Review", order: 2, duration: "35m", completionRequired: true, quizRequired: true, media: "workshop", resources: ["Governance primer"], status: "available" },
    { id: "lesson-constitution-3", courseId: "course-constitutional-onboarding", title: "Locked $NEURONS Utility Boundaries", type: "Reading", order: 3, duration: "24m", completionRequired: true, quizRequired: true, media: "article", resources: ["Reward utility map"], status: "available" },
    { id: "lesson-treasury-1", courseId: "course-treasury-risk", title: "Emission Budgets and Treasury Boundaries", type: "Workshop", order: 1, duration: "44m", completionRequired: true, quizRequired: true, media: "video", resources: ["Treasury model"], status: "available" },
    { id: "lesson-treasury-2", courseId: "course-treasury-risk", title: "Reward Abuse Prevention Controls", type: "Practical Exercise", order: 2, duration: "52m", completionRequired: true, quizRequired: true, media: "exercise", resources: ["Abuse checklist"], status: "available" },
    { id: "lesson-treasury-3", courseId: "course-treasury-risk", title: "Unlocked $NEURONS Governance Release", type: "Governance Review", order: 3, duration: "47m", completionRequired: true, quizRequired: true, media: "workshop", resources: ["RewardPolicy read model"], status: "available" },
    { id: "lesson-marketplace-1", courseId: "course-marketplace-activation", title: "Locked $NEURONS Utility in Marketplace Flows", type: "Practical Exercise", order: 1, duration: "39m", completionRequired: true, quizRequired: true, media: "exercise", resources: ["Voucher map"], status: "completed" },
    { id: "lesson-pok-1", courseId: "course-pok-certification", title: "PoK Evidence and Review Boundaries", type: "Quiz", order: 1, duration: "31m", completionRequired: true, quizRequired: true, media: "quiz", resources: ["PoK checklist"], status: "locked" }
  ],
  certificates: [
    {
      id: "cert-constitutional-literacy",
      courseId: "course-constitutional-onboarding",
      studentId: "student_demo_001",
      reviewedOn: "2026-05-13",
      expiresOn: "2027-05-13",
      previewStatus: "mock-preview",
      governanceReviewed: true,
      recognitionLevel: "Foundational",
      previewNote: "Preview only. No issuance, verification, ownership, or chain anchoring."
    },
    {
      id: "cert-marketplace-activation",
      courseId: "course-marketplace-activation",
      studentId: "student_demo_001",
      reviewedOn: "2026-05-15",
      expiresOn: "2027-05-15",
      previewStatus: "mock-preview",
      governanceReviewed: true,
      recognitionLevel: "Ecosystem",
      previewNote: "Preview only. No issuance, verification, ownership, or chain anchoring."
    }
  ],
  rewards: [
    {
      id: "reward-001",
      studentId: "student_demo_001",
      courseId: "course-constitutional-onboarding",
      previewPointTier: "Foundation Preview",
      previewSource: "Free course preview",
      previewPoints: 320,
      previewMilestones: ["local utility preview", "PoK completion", "governance policy active"],
      governanceControlled: true,
      previewPolicy: "No balance, claim, transfer, payout, or settlement.",
      previewBenefits: ["vouchers", "marketplace access", "internal services", "voting practice"],
      reviewedOn: "2026-05-13"
    },
    {
      id: "reward-002",
      studentId: "student_demo_001",
      courseId: "course-treasury-risk",
      previewPointTier: "Applied Preview",
      previewSource: "Paid course preview",
      previewPoints: 950,
      previewMilestones: ["75% progress", "PoK exam", "treasury review complete"],
      governanceControlled: true,
      previewPolicy: "Preview points remain non-monetary and cannot create entitlement in any mode.",
      previewBenefits: ["advanced pathway visibility", "assessment readiness", "professional eligibility preview"],
      reviewedOn: "pending"
    },
    {
      id: "reward-003",
      studentId: "student_demo_001",
      courseId: "course-marketplace-activation",
      previewPointTier: "Foundation Preview",
      previewSource: "Free course preview",
      previewPoints: 410,
      previewMilestones: ["course completion", "marketplace orientation quiz"],
      governanceControlled: true,
      previewPolicy: "No balance, claim, transfer, payout, or settlement.",
      previewBenefits: ["marketplace orientation", "license preview", "internal benefits"],
      reviewedOn: "2026-05-15"
    }
  ],
  enrolledCourses: [
    { courseId: "course-constitutional-onboarding", enrollmentType: "free-started", enrolledAt: "2026-05-02", accessState: "active", nextAction: "Complete foundation preview lesson" },
    { courseId: "course-marketplace-activation", enrollmentType: "free-started", enrolledAt: "2026-05-04", accessState: "active", nextAction: "Review recognition preview" }
  ],
  purchasedCourses: [
    { courseId: "course-treasury-risk", enrollmentType: "paid-purchased", purchasedAt: "2026-05-09", accessState: "active", nextAction: "Complete reward abuse prevention exercise" },
    { courseId: "course-pok-certification", enrollmentType: "paid-purchased", purchasedAt: "2026-05-15", accessState: "locked-by-governance-review", nextAction: "Wait for Academy Governance Review" }
  ],
  freeStartedCourses: ["course-constitutional-onboarding", "course-marketplace-activation"],
  userCourseProgress: [
    {
      courseId: "course-constitutional-onboarding",
      contentProgress: 67,
      lessonCompletion: 67,
      quizScore: null,
      pokStatus: "pending",
      validationProgress: 35,
      certificationEligibility: "not-eligible",
      rewardUnlockProgress: 22,
      completedLessons: 2,
      pendingLessons: 1,
      quizState: "locked",
      finalEvaluationStatus: "locked",
      nextRecommendedAction: "Complete lesson 3 before PoK quiz unlocks.",
      foundationPointsEarned: 42,
      appliedPointsEarned: 0,
      pendingRewardGates: ["gate-constitution-quiz", "gate-constitution-certification"]
    },
    {
      courseId: "course-treasury-risk",
      contentProgress: 33,
      lessonCompletion: 33,
      quizScore: null,
      pokStatus: "pending",
      validationProgress: 18,
      certificationEligibility: "not-eligible",
      rewardUnlockProgress: 8,
      completedLessons: 1,
      pendingLessons: 2,
      quizState: "locked",
      finalEvaluationStatus: "locked",
      nextRecommendedAction: "Complete remaining treasury lessons to unlock PoK evaluation.",
      foundationPointsEarned: 0,
      appliedPointsEarned: 76,
      pendingRewardGates: ["gate-treasury-module", "gate-treasury-quiz", "gate-treasury-certification"]
    },
    {
      courseId: "course-marketplace-activation",
      contentProgress: 100,
      lessonCompletion: 100,
      quizScore: 88,
      pokStatus: "approved",
      validationProgress: 100,
      certificationEligibility: "eligible",
      rewardUnlockProgress: 100,
      completedLessons: 1,
      pendingLessons: 0,
      quizState: "passed",
      finalEvaluationStatus: "approved",
      nextRecommendedAction: "Open recognition preview and marketplace voucher utility.",
      foundationPointsEarned: 410,
      appliedPointsEarned: 0,
      pendingRewardGates: []
    },
    {
      courseId: "course-pok-certification",
      contentProgress: 0,
      lessonCompletion: 0,
      quizScore: null,
      pokStatus: "pending",
      validationProgress: 0,
      certificationEligibility: "blocked",
      rewardUnlockProgress: 0,
      completedLessons: 0,
      pendingLessons: 1,
      quizState: "locked",
      finalEvaluationStatus: "governance-review-required",
      nextRecommendedAction: "Wait for tutor and recognition review before learning opens.",
      foundationPointsEarned: 0,
      appliedPointsEarned: 0,
      pendingRewardGates: ["gate-pok-consumption", "gate-pok-quiz", "gate-pok-certification"]
    }
  ],
  lessonProgress: [
    { lessonId: "lesson-constitution-1", courseId: "course-constitutional-onboarding", status: "completed", consumed: true, validated: true, progress: 100, rewardEarned: 16 },
    { lessonId: "lesson-constitution-2", courseId: "course-constitutional-onboarding", status: "completed", consumed: true, validated: false, progress: 100, rewardEarned: 26 },
    { lessonId: "lesson-constitution-3", courseId: "course-constitutional-onboarding", status: "available", consumed: false, validated: false, progress: 0, rewardEarned: 0 },
    { lessonId: "lesson-treasury-1", courseId: "course-treasury-risk", status: "completed", consumed: true, validated: false, progress: 100, rewardEarned: 76 },
    { lessonId: "lesson-treasury-2", courseId: "course-treasury-risk", status: "available", consumed: false, validated: false, progress: 0, rewardEarned: 0 },
    { lessonId: "lesson-treasury-3", courseId: "course-treasury-risk", status: "locked", consumed: false, validated: false, progress: 0, rewardEarned: 0 },
    { lessonId: "lesson-marketplace-1", courseId: "course-marketplace-activation", status: "validated", consumed: true, validated: true, progress: 100, rewardEarned: 41 },
    { lessonId: "lesson-pok-1", courseId: "course-pok-certification", status: "locked", consumed: false, validated: false, progress: 0, rewardEarned: 0 }
  ],
  moduleProgress: [
    { id: "module-constitution-core", courseId: "course-constitutional-onboarding", title: "Constitutional Core", lessonIds: ["lesson-constitution-1", "lesson-constitution-2", "lesson-constitution-3"], status: "in-progress", progress: 67 },
    { id: "module-treasury-risk", courseId: "course-treasury-risk", title: "Treasury Risk Controls", lessonIds: ["lesson-treasury-1", "lesson-treasury-2", "lesson-treasury-3"], status: "in-progress", progress: 33 },
    { id: "module-marketplace-utility", courseId: "course-marketplace-activation", title: "Marketplace Utility", lessonIds: ["lesson-marketplace-1"], status: "validated", progress: 100 },
    { id: "module-pok-design", courseId: "course-pok-certification", title: "PoK Design", lessonIds: ["lesson-pok-1"], status: "locked", progress: 0 }
  ],
  lessonResources: [
    { lessonId: "lesson-constitution-1", title: "Academy Constitution", type: "reading", availability: "mock-download" },
    { lessonId: "lesson-constitution-3", title: "Locked $NEURONS Utility Map", type: "worksheet", availability: "mock-download" },
    { lessonId: "lesson-treasury-2", title: "Abuse Prevention Checklist", type: "worksheet", availability: "mock-download" },
    { lessonId: "lesson-marketplace-1", title: "Voucher Flow Diagram", type: "reference", availability: "mock-download" }
  ],
  quizzes: [
    { id: "quiz-constitution", courseId: "course-constitutional-onboarding", title: "Constitutional PoK Evaluation", passingThreshold: 80, state: "locked", retryPolicy: "retry-available", mainRewardWeight: 50 },
    { id: "quiz-treasury", courseId: "course-treasury-risk", title: "Treasury Reward Policy Evaluation", passingThreshold: 82, state: "locked", retryPolicy: "retry-available", mainRewardWeight: 55 },
    { id: "quiz-marketplace", courseId: "course-marketplace-activation", title: "Marketplace Utility Evaluation", passingThreshold: 75, state: "passed", retryPolicy: "completed", mainRewardWeight: 45 },
    { id: "quiz-pok-certification", courseId: "course-pok-certification", title: "PoK Recognition Steward Evaluation", passingThreshold: 85, state: "locked", retryPolicy: "retry-blocked", mainRewardWeight: 60 }
  ],
  quizQuestions: [
    { id: "question-constitution-1", quizId: "quiz-constitution", prompt: "Which preview tier belongs to free courses?", correctAnswer: "Foundation Preview" },
    { id: "question-constitution-2", quizId: "quiz-constitution", prompt: "What unlocks the main Academy preview?", correctAnswer: "Proof-of-Knowledge validation" },
    { id: "question-treasury-1", quizId: "quiz-treasury", prompt: "Who controls emission budget compatibility?", correctAnswer: "Treasury and governance policy" },
    { id: "question-marketplace-1", quizId: "quiz-marketplace", prompt: "Can foundation preview points be withdrawn?", correctAnswer: "No" }
  ],
  quizAttempts: [
    { id: "attempt-marketplace-1", quizId: "quiz-marketplace", courseId: "course-marketplace-activation", score: 88, threshold: 75, result: "passed", pokStatus: "approved", attemptedAt: "2026-05-15" },
    { id: "attempt-treasury-preview-fail", quizId: "quiz-treasury", courseId: "course-treasury-risk", score: 64, threshold: 82, result: "failed", pokStatus: "retry-required", attemptedAt: "mock-preview" },
    { id: "attempt-treasury-preview-pass", quizId: "quiz-treasury", courseId: "course-treasury-risk", score: 88, threshold: 82, result: "passed", pokStatus: "approved", attemptedAt: "mock-preview" }
  ],
  pokValidationStatus: [
    { courseId: "course-constitutional-onboarding", status: "pending", reviewer: "PoKMinter mock", notes: "Awaiting quiz threshold after required lessons." },
    { courseId: "course-treasury-risk", status: "pending", reviewer: "ACS reward audit", notes: "Validation depends on passing treasury evaluation." },
    { courseId: "course-marketplace-activation", status: "approved", reviewer: "PoKMinter mock", notes: "Marketplace utility knowledge validated." },
    { courseId: "course-pok-certification", status: "pending", reviewer: "ACS recognition queue", notes: "Course access is governance-review gated." }
  ],
  rewardGates: [
    { id: "gate-constitution-consumption", courseId: "course-constitutional-onboarding", source: "lesson", rewardPercentage: 10, previewPoints: 32, rewardClass: "foundation", unlockCondition: "consume all required constitutional lessons", status: "pending" },
    { id: "gate-constitution-module", courseId: "course-constitutional-onboarding", source: "module", rewardPercentage: 15, previewPoints: 48, rewardClass: "foundation", unlockCondition: "complete Constitutional Core module", status: "pending" },
    { id: "gate-constitution-quiz", courseId: "course-constitutional-onboarding", source: "quiz", rewardPercentage: 50, previewPoints: 160, rewardClass: "foundation", unlockCondition: "pass Constitutional PoK Evaluation at 80%", status: "locked" },
    { id: "gate-constitution-certification", courseId: "course-constitutional-onboarding", source: "certification", rewardPercentage: 25, previewPoints: 80, rewardClass: "foundation", unlockCondition: "become recognition-preview eligible after PoK approval", status: "locked" },
    { id: "gate-treasury-consumption", courseId: "course-treasury-risk", source: "lesson", rewardPercentage: 8, previewPoints: 76, rewardClass: "applied", unlockCondition: "consume first treasury lesson", status: "unlocked" },
    { id: "gate-treasury-module", courseId: "course-treasury-risk", source: "module", rewardPercentage: 17, previewPoints: 162, rewardClass: "applied", unlockCondition: "complete Treasury Risk Controls module", status: "pending" },
    { id: "gate-treasury-quiz", courseId: "course-treasury-risk", source: "quiz", rewardPercentage: 55, previewPoints: 523, rewardClass: "applied", unlockCondition: "pass Treasury Reward Policy Evaluation at 82%", status: "locked" },
    { id: "gate-treasury-certification", courseId: "course-treasury-risk", source: "certification", rewardPercentage: 20, previewPoints: 190, rewardClass: "applied", unlockCondition: "final recognition preview review approved", status: "locked" },
    { id: "gate-marketplace-consumption", courseId: "course-marketplace-activation", source: "lesson", rewardPercentage: 10, previewPoints: 41, rewardClass: "foundation", unlockCondition: "consume marketplace activation lesson", status: "unlocked" },
    { id: "gate-marketplace-module", courseId: "course-marketplace-activation", source: "module", rewardPercentage: 15, previewPoints: 62, rewardClass: "foundation", unlockCondition: "complete marketplace module", status: "unlocked" },
    { id: "gate-marketplace-quiz", courseId: "course-marketplace-activation", source: "quiz", rewardPercentage: 45, previewPoints: 184, rewardClass: "foundation", unlockCondition: "pass Marketplace Utility Evaluation at 75%", status: "unlocked" },
    { id: "gate-marketplace-certification", courseId: "course-marketplace-activation", source: "certification", rewardPercentage: 30, previewPoints: 123, rewardClass: "foundation", unlockCondition: "recognition preview eligible", status: "unlocked" },
    { id: "gate-pok-consumption", courseId: "course-pok-certification", source: "lesson", rewardPercentage: 5, previewPoints: 60, rewardClass: "applied", unlockCondition: "course opens after governance review", status: "locked" },
    { id: "gate-pok-quiz", courseId: "course-pok-certification", source: "quiz", rewardPercentage: 60, previewPoints: 720, rewardClass: "applied", unlockCondition: "pass PoK steward evaluation at 85%", status: "locked" },
    { id: "gate-pok-certification", courseId: "course-pok-certification", source: "certification", rewardPercentage: 35, previewPoints: 420, rewardClass: "applied", unlockCondition: "ACS recognition integrity approval", status: "locked" }
  ],
  rewardUnlockEvents: [
    { id: "event-marketplace-quiz", courseId: "course-marketplace-activation", gateId: "gate-marketplace-quiz", previewPoints: 184, previewPointTier: "Foundation Preview", reason: "PoK passed", occurredAt: "2026-05-15" },
    { id: "event-treasury-consumption", courseId: "course-treasury-risk", gateId: "gate-treasury-consumption", previewPoints: 76, previewPointTier: "Applied Preview", reason: "Lesson consumption", occurredAt: "2026-05-10" }
  ],
  certificationRequirements: [
    { courseId: "course-constitutional-onboarding", requiredContentProgress: 100, requiredPokStatus: "approved", requiredQuizScore: 80, status: "not-eligible" },
    { courseId: "course-treasury-risk", requiredContentProgress: 100, requiredPokStatus: "approved", requiredQuizScore: 82, status: "not-eligible" },
    { courseId: "course-marketplace-activation", requiredContentProgress: 100, requiredPokStatus: "approved", requiredQuizScore: 75, status: "eligible" },
    { courseId: "course-pok-certification", requiredContentProgress: 100, requiredPokStatus: "approved", requiredQuizScore: 85, status: "blocked" }
  ],
  edgeCaseScenarios: {
    failedQuiz: {
      courseId: "course-treasury-risk",
      quizState: "failed",
      score: 64,
      threshold: 82,
      pokStatus: "retry-required",
      userMessage: "Score below threshold. Validation-weighted preview points remain locked until retry passes."
    },
    retryAvailable: {
      courseId: "course-treasury-risk",
      retryPolicy: "retry-available",
      nextAction: "Review failed topics and retry the PoK evaluation."
    },
    retryBlocked: {
      courseId: "course-pok-certification",
      retryPolicy: "retry-blocked",
      nextAction: "ACS recognition review is required before another attempt."
    },
    incompleteLessons: {
      courseId: "course-constitutional-onboarding",
      lockedReason: "Required lesson 3 is not consumed.",
      quizState: "locked"
    },
    noCertificationCourse: {
      id: "edge-no-certification-course",
      title: "Marketplace Voucher Orientation",
      recognitionPreviewEnabled: false,
      previewPointTier: "Foundation Preview"
    },
    pendingUnlockedRewards: {
      courseId: "course-treasury-risk",
      previewPointTier: "Applied Preview",
      pendingAmount: 875,
      dependency: "PoK approval and local preview review confirmation"
    },
    lockedOnlyFreeCourse: {
      courseId: "course-constitutional-onboarding",
      previewPointTier: "Foundation Preview",
      previewPolicy: "No balance, claim, transfer, payout, or settlement."
    },
    governanceRestrictedCourse: {
      courseId: "course-pok-certification",
      standing: "under-review",
      blockedReason: "Advanced recognition preview policy is still under Academy Governance Review."
    },
    acsIneligibleStudent: {
      studentId: "student_edge_acs_ineligible",
      trustScore: 41,
      acsEligibility: "not-eligible",
      reason: "Trust score below ACS review threshold."
    },
    emptyEnrolledCourseList: {
      studentId: "student_edge_empty",
      enrolledCourses: [],
      purchasedCourses: [],
      message: "No enrolled or purchased courses yet."
    }
  },
  progressEngine: {
    nextUnlocks: [
      { id: "unlock-1", label: "Treasury Risk checkpoint", reward: "240 applied preview points", requirement: "Reach 75% progress and pass PoK review" },
      { id: "unlock-2", label: "ACS reviewer eligibility", reward: "ACS review queue preview", requirement: "Trust score 80 and one advanced recognition preview" },
      { id: "unlock-3", label: "Marketplace license voucher", reward: "180 foundation preview points", requirement: "Complete Marketplace Activation path" }
    ],
    analytics: [
      { label: "PoK readiness", value: 72 },
      { label: "Governance literacy", value: 84 },
      { label: "Reward integrity", value: 91 },
      { label: "Marketplace activation", value: 68 }
    ]
  },
  governanceReviews: [
    { id: "review-constitution", area: "Constitutional review", status: "approved", reviewer: "Axodus Governance Faculty", risk: "low", notes: "Educational standards align with constitutional onboarding." },
    { id: "review-treasury", area: "Treasury review", status: "under-review", reviewer: "Treasury Council", risk: "medium", notes: "Applied preview pathways remain outside treasury execution and monetary entitlement." },
    { id: "review-reward", area: "Reward review", status: "approved", reviewer: "RewardPolicy mock", risk: "low", notes: "Free courses expose foundation preview points only." },
    { id: "review-certification", area: "Recognition review", status: "under-review", reviewer: "ACS Recognition Queue", risk: "medium", notes: "Advanced recognition previews require anti-fraud scoring." }
  ],
  acsWorkflows: [
    { id: "acs-tutor-review", name: "Tutor Review", status: "active-mock", escalation: "manual governance review" },
    { id: "acs-course-validation", name: "Course Validation", status: "active-mock", escalation: "constitutional standards queue" },
    { id: "acs-reward-audit", name: "Reward Audit", status: "active-mock", escalation: "treasury emission budget review" },
    { id: "acs-certification-escalation", name: "Recognition Escalation", status: "queued-mock", escalation: "PoK integrity panel" },
    { id: "acs-curriculum-compliance", name: "Curriculum Compliance", status: "active-mock", escalation: "Academy Governance Review" },
    { id: "acs-pok-review", name: "Proof of Knowledge Review", status: "active-mock", escalation: "ACS reviewer assignment" }
  ],
  learningPaths: [
    {
      id: "path-governance-operator",
      title: "Governance Operator Path",
      description: "A capability path from constitutional literacy to treasury-aware governance participation.",
      courseIds: ["course-constitutional-onboarding", "course-treasury-risk", "course-pok-certification"],
      standing: "approved",
      progress: 49
    },
    {
      id: "path-marketplace-creator",
      title: "Marketplace Creator Path",
      description: "A formation path for tutors and creators using local preview utility inside Axodus Marketplace.",
      courseIds: ["course-constitutional-onboarding", "course-marketplace-activation"],
      standing: "approved",
      progress: 91
    }
  ]
};
