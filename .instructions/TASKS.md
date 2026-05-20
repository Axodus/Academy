# Academy Tasks

# Active Tasks

## Learn-to-Win
- define Learn-to-Win economic model
- define progression incentives
- define participation validation
- define sustainability boundaries
- define reward emission limits

---

## Proof-of-Knowledge
- define capability validation systems
- define educational verification flows
- define governance readiness validation
- define progression checkpoints
- define anti-farming mechanisms
- implement mock quiz lock/unlock rules tied to required lesson completion
- implement mock PoK approval/retry-required state from quiz score thresholds

---

## Certifications
- define certification framework
- define specialization tracks
- define operational competency validation
- define SBT integration
- define certification telemetry

---

## Governance Formation
- define DAO onboarding flows
- define constitutional education
- define treasury education
- define governance progression
- define operational governance paths

---

## ACS Integration
- define AI tutor systems
- define adaptive learning flows
- define cognitive assistants
- define personalized progression
- define governance simulations

---

## Educational Rewards
- define reward accounting
- define staking-linked rewards
- define progression rewards
- define sustainability controls
- define treasury integration
- implement staged reward gates where lesson consumption is low-weight and PoK validation is high-weight

---

## Backend
- implement progression tracking
- implement certification systems
- implement educational telemetry
- implement reward aggregation
- implement learning analytics
- implement wallet-authenticated Academy API readiness routes
- implement local persistence adapter for lesson completion and quiz attempts
- document API migration path from mock frontend services to backend adapters
- consolidate repository abstraction for student progress, lesson completion and quiz attempts
- add deterministic state integrity checks before production persistence migration
- define JSON, in-memory and Postgres-placeholder repository adapter boundaries

---

## Frontend
- implement learning dashboards
- implement progression visibility
- implement certification visibility
- implement governance education flows
- implement reward visibility
- implement mock-first Academy MVP nucleus routes
- implement Progress Engine at `/progress`
- implement explicit Locked $NEURONS and Unlocked $NEURONS reward class visibility
- implement Academy Governance Review route for constitutional, treasury, reward, certification, and ACS review visibility
- preserve multichain login as reusable identity/auth component
- implement student-side `/academy/my-courses` course ownership dashboard
- implement private enrolled course detail at `/academy/my-courses/:courseId`
- implement learning workspace at `/academy/learn/:courseId/lessons/:lessonId`
- expose content progress, lesson completion, quiz score, PoK status, validation progress, certification eligibility, and reward unlock progress as separate UI signals
- add service-layer read models for studentAcademyService, learningWorkspaceService, courseProgressService, quizService, pokValidationService, and rewardGateService
- polish Academy prototype routes toward ~90% prototype readiness
- improve learning workspace hierarchy, player placeholder, quiz state clarity, reward gate visualization, and responsive card behavior
- add ESLint 9 flat config for JS/JSX lint execution while TypeScript lint parser remains a future tooling hardening task
- add frontend `academyApi` adapter for wallet-authenticated backend integration readiness
- add OpenAPI spec and frontend ABI read models for integration consumers

---

## Smart Contracts
- implement `LockedNeuronsVault` contract scaffold for internal-only Locked $NEURONS accounting
- implement `PoKMinter` contract scaffold for governance-controlled PoK validation and reward qualification
- keep Unlocked $NEURONS as event/readiness qualification only until treasury/token contracts are approved
- expose contract readiness status without enabling writes
- harden `PoKMinter` against duplicate validation and proof hash replay
- expose public `/readiness` and `/openapi.json` for integration consumers
- document on-chain/off-chain boundaries and keep educational state out of contracts
- add runtime Solidity tests for `PoKMinter` and `LockedNeuronsVault` replay, duplicate validation, unauthorized caller, reward cap and locked accounting flows

---

## QA Automation
- add Playwright configuration for desktop, tablet and mobile smoke coverage
- add Academy browser smoke specs for routes, learning workspace, quiz/PoK and reward gate visibility
- install Playwright runner and browsers before CI execution
- add CI workflow for typecheck, lint, unit tests, contract compile, web build and Playwright smoke execution

---

# Current Blockers

## Learn-to-Win
- canonical reward sustainability model pending
- progression weighting strategy pending

---

## Certifications
- operational specialization structure pending
- governance specialization tracks pending

---

## ACS Integration
- adaptive learning orchestration pending
- AI tutor behavioral constraints pending

## Production Readiness
- real persistence for lesson completion and quiz attempts pending
- backend/API progression telemetry pending
- contract writes, minting, transfers, withdrawals, and real certification issuance remain disabled
- TypeScript-aware ESLint coverage requires adding versioned `@typescript-eslint` dependencies without workspace install stalls
- production database schema and Postgres adapter implementation pending
- audited deployment and production contract address governance pending

---

# Future Tasks

- DAO academies
- enterprise academies
- decentralized educational federation
- governance simulation systems
- operational capability scoring
- AI-assisted mentorship systems
