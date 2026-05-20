# Academy Decisions

# Active Decisions

## Academy Direction

Decision:
Academy acts as the sovereign cognitive formation infrastructure of the Axodus ecosystem.

Status:
CONFIRMED

---

## Learn-to-Win Philosophy

Decision:
The ecosystem prioritizes capability-driven participation over speculative participation.

Knowledge becomes economic infrastructure.

Status:
CONFIRMED

---

## Proof-of-Knowledge Philosophy

Decision:
Proof-of-Knowledge validates:
- understanding
- capability
- operational competence
- governance readiness

Status:
CONFIRMED

---

## Governance Formation

Decision:
Academy contributes directly to governance quality and ecosystem sustainability.

Governance participation should increasingly favor informed participants.

Status:
CONFIRMED

---

## ACS Integration

Decision:
ACS systems may provide:
- AI tutors
- adaptive learning
- personalized progression
- governance simulations

ACS systems remain assistive, not sovereign.

Status:
CONFIRMED

---

## Certification Philosophy

Decision:
Certifications must represent real demonstrated capability.

Avoid meaningless credential inflation.

Status:
CONFIRMED

---

## Educational Rewards

Decision:
Educational rewards must prioritize:
- sustainability
- meaningful participation
- real capability
- ecosystem contribution

Avoid reward farming systems.

Status:
CONFIRMED

---

## Educational Economy

Decision:
The Academy acts as long-term ecosystem formation infrastructure.

Educational systems contribute to:
- governance quality
- treasury sustainability
- ecosystem intelligence
- operational capability

Status:
CONFIRMED

---

## Academy MVP Nucleus

Decision:
The initial Academy implementation is frontend-first and mock-only.

It must represent Academy as the Proof-of-Knowledge-based, governance-controlled `$NEURONS` distribution and qualification layer of Axodus, not as a generic LMS.

Status:
CONFIRMED

---

## Academy Reward Classes

Decision:
Free courses issue mock `Locked $NEURONS`.

Paid courses issue mock `Unlocked $NEURONS`.

`NRS` is not valid reward terminology for Academy MVP surfaces.

Status:
CONFIRMED

---

## Academy Future Contract Compatibility

Decision:
The MVP may expose mock read-model metadata for future contract surfaces:
- PoKMinter
- LockedNeuronsVault
- RewardPolicy
- TreasuryEmissionBudget

No contract writes, minting, withdrawal, transfer, or certification issuance are enabled in the MVP.

Status:
CONFIRMED

---

## Academy Learning Consumption and PoK Rewards

Decision:
Academy student-side progression must separate passive content consumption from validated capability.

Watching lessons may release only small consumption rewards. The highest reward weight must come from quiz/evaluation success and final certification eligibility through Proof-of-Knowledge validation.

Mock reward gates must classify each stage as lesson, module, quiz, or certification and expose locked, pending, unlocked, or rejected status.

Free enrolled courses generate only `Locked $NEURONS`. Paid purchased courses generate `Unlocked $NEURONS` in the future production model, released progressively after validation and governance/treasury controls.

Status:
CONFIRMED

---

## Academy Prototype Polish Status

Decision:
The Academy nucleus is now treated as an approximately 90% prototype-ready mock MVP.

The student-side flow exists, including enrolled/purchased course surfaces, learning workspace, lesson completion mock actions, quiz state visualization, PoK threshold validation, staged reward gates, and Locked/Unlocked `$NEURONS` separation.

Remaining gaps are production concerns: persistence, backend telemetry, real ACS orchestration, real certification issuance, contract writes, minting, withdrawals, transfers, and treasury execution.

Status:
CONFIRMED

---

## Academy Integration Readiness

Decision:
Academy may now expose wallet-authenticated backend readiness routes for student progress, lesson completion, quiz attempts, PoK validation read models, and reward gate read models.

Persistence is local JSON-backed until a production database repository is approved. This enables integration testing without creating hidden production authority.

`LockedNeuronsVault` and `PoKMinter` are contract scaffolds for governance-controlled validation and internal locked reward accounting. They do not enable withdrawals, swaps, external transfers, real token minting, or production certification issuance.

Integration consumers should use `academy.openapi.json`, `src/abis/PoKMinter.json`, `src/abis/LockedNeuronsVault.json`, and `GET /academy/contracts/readiness` before any alpha deployment.

`PoKMinter` must reject duplicate student/course validations and proof hash replay. Course reward policies may be deactivated by governance owner before production execution is ever enabled.

Status:
CONFIRMED

---

## Academy Hardening Boundaries

Decision:
Academy hardening separates frontend, API, repository, Progress Engine, PoK validation, reward policy, persistence and contracts into explicit boundaries.

API routes must depend on repository interfaces rather than JSON storage assumptions. Reward policy logic remains off-chain and separate from `PoKMinter`; contracts only enforce proof/accounting integrity.

Playwright coverage is introduced as a QA boundary, but CI execution depends on installing the Playwright runner and browser binaries.

Status:
CONFIRMED

---

# Pending Decisions

## Canonical Learn-to-Win Emission Model

Status:
PENDING

---

## Governance Weighting for Certifications

Status:
PENDING

---

## Proof-of-Knowledge Validation Mechanics

Status:
PENDING

---

## Enterprise Academy Strategy

Status:
PENDING

---

## DAO Academy Federation Model

Status:
PENDING
