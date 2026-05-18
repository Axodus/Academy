export type AcademyStanding = "compliant" | "approved" | "under-review" | "restricted" | "deprecated";
export type AccessType = "free" | "paid";
export type RewardType = "Locked $NEURONS" | "Unlocked $NEURONS";

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
