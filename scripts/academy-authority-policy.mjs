export const ACADEMY_AUTHORITY_SCAN_PATHS = [
  "src/modules/academy",
  "src/routes/academy.ts",
  "src/data/mock/academy.mock.js",
  "src/repositories/academyProgressAdapters.ts",
  "src/repositories/academyProgressRepository.ts",
  "src/services/academyPersistence.ts",
  "src/serverApp.ts",
  "tests/academyLearning.test.ts",
  "tests/e2e/academy-smoke.spec.ts"
];

export const ACADEMY_PROHIBITED_AUTHORITY_TERMS = [
  "claimable",
  "claimed",
  "minted",
  "issued",
  "issuanceDate",
  "proofHash",
  "verificationUrl",
  "verificationStatus",
  "walletDistribution",
  "tokenBalance",
  "transferable",
  "sbt",
  "nft",
  "onChain",
  "txHash",
  "contractAddress",
  "walletClaim",
  "rewardClaim",
  "certificateIssue",
  "credentialVerification",
  "tokenReward",
  "treasury",
  "settlement",
  "payout",
  "billing",
  "mint",
  "claim",
  "verify",
  "verified",
  "ownership"
];

export const ACADEMY_AUTHORITY_ALLOWLIST = [
  {
    path: "src/modules/academy/services/contractReadiness.ts",
    term: "mint",
    patterns: [/pokMinter/gi, /pok-minter/gi],
    classification: "non-learner-facing-contract-readiness-scaffold",
    rationale: "PoKMinter names identify an isolated read-only scaffold whose writesEnabled flag is fixed false."
  },
  {
    path: "src/serverApp.ts",
    term: "verify",
    patterns: [/req\.jwtVerify\(\)/gi],
    classification: "authentication-only-server-scaffold",
    rationale: "JWT session authentication protects routes but grants no learner, reward, credential, or execution authority."
  },
  {
    path: "src/modules/academy/types/academy.ts",
    term: "issued",
    patterns: [/certificateAuthority:\s*["']not-issued["']/gi],
    classification: "safe-negative-boundary-metadata",
    rationale: "The exact not-issued literal is required preview metadata and denies certificate authority."
  },
  {
    path: "src/modules/academy/services/academyPreviewRuntime.ts",
    term: "issued",
    patterns: [/certificateAuthority:\s*["']not-issued["']/gi],
    classification: "safe-negative-boundary-metadata",
    rationale: "The exact not-issued literal is required preview metadata and denies certificate authority."
  },
  {
    path: "tests/academyLearning.test.ts",
    term: "mint",
    patterns: [/body\.contracts\.PoKMinter/gi],
    classification: "non-learner-facing-contract-readiness-scaffold-test",
    rationale: "This assertion validates the isolated read-only readiness scaffold and does not enter a learner payload."
  },
  {
    path: "tests/academyLearning.test.ts",
    term: "issued",
    patterns: [/certificateAuthority:\s*["']not-issued["']/gi, /["']not-issued["']/gi],
    classification: "safe-negative-boundary-assertion",
    rationale: "Tests assert the exact not-issued denial metadata emitted by the learner preview runtime."
  }
];

export const ACADEMY_AUTHORITY_TEST_ALLOW_START = "academy-authority-scan: allow-start negative-test";
export const ACADEMY_AUTHORITY_TEST_ALLOW_END = "academy-authority-scan: allow-end";
