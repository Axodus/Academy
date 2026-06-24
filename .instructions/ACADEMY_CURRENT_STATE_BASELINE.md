# ACADEMY-REQ-01 - Current State Inspection and Evidence Baseline

Assessment time: 2026-06-23T08:37:16-03:00
Repository commit: `42730d27bbd56c10233479250ef19f595cd65b29`
Branch: `dev`
Tracked worktree at inspection start: clean

This file preserves the chronological REQ-01 baseline and subsequent deltas. The operative classification is the final Sprint 04 delta at the end of this file; earlier L3 and blocker statements are historical observations at their recorded dates.

## Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `High`

Justification:

- Risk level: High.
- Complexity: High because source, APIs, contracts, tests and conflicting instructions must be reconciled.
- Authority/security impact: High because the result controls allowed work and maturity interpretation.
- Reason for not using a smaller model: Partial tests and non-executing scaffolds must not be mistaken for readiness or authority.

## Baseline Classification

```txt
Evidence result: PARTIAL_PASS_WITH_BLOCKERS
Current L-Level: L3_CANDIDATE_VALIDATION_INCOMPLETE
L4 promotion supported: NO
D-Level evaluated: NO
Production readiness: NO
Production execution: DISABLED
```

The repository contains a substantial local prototype, API readiness surfaces, local persistence, Solidity scaffolds and tests. It does not have an implemented fail-closed preview mutation gate, safe learner-facing authority semantics, complete negative checks, or a fully passing E2E baseline. These gaps prevent an L4 recommendation.

## Workspace Inventory

| Area | Current evidence | Baseline interpretation |
|---|---|---|
| Operational instructions | 18 pre-existing Markdown files under `.instructions/` | Present but previously inconsistent across L3/L4, validation and handoff claims |
| Frontend | React/Vite Academy routes for catalog, learner courses, workspace, dashboard, progress, certifications, rewards and governance review | Functional mock UI; several learner-facing fields imply stronger credential/reward semantics than permitted |
| Academy services | Local data, progress, quiz, PoK, reward policy, integrity and API adapters | Local prototype logic; not production authority |
| Registered API | Health/readiness/OpenAPI, wallet nonce/verify and Academy read/mutation routes registered by `src/serverApp.ts` | Compatibility and local integration scaffolds only |
| Dormant route modules | Pointer, signed URL and upload route modules exist but are not registered by `src/serverApp.ts` | Source-level authority risk; no runtime capability established by current server composition |
| Persistence | JSON repository at `.academy-data/progress.json`, in-memory adapter and Postgres placeholder | Local/mock persistence only; no approved production schema or database authority |
| Contracts | `PoKMinter`, `LockedNeuronsVault`, `PermissionRegistry`, `PointerRegistry` and ownership base | Compilable/testable scaffolds; not deployed, audited or authorized; no L4 functional authority evidence |
| Contract/deployment integration | ABIs, readiness service and deployment scripts | Compatibility scaffolds; presence does not establish execution authority |
| Unit/API tests | `tests/academyLearning.test.ts` with 20 tests | Useful local evidence; current tests also prove POST routes mutate local JSON after wallet JWT auth |
| Solidity tests | `contracts/AcademyHardening.t.sol` with 6 tests | Scaffold behavior evidence only, not deployment or production evidence |
| Browser tests | `tests/e2e/academy-smoke.spec.ts` with 8 desktop cases plus tablet/mobile projects configured | Desktop result is 7 passed / 1 failed; tablet/mobile not run in this baseline |
| CI | Typecheck, lint, unit, contract compile/test, web build and desktop E2E workflow | Configuration exists; current external CI status was not inspected and is not claimed |

## Registered Academy API Surface

Read-style routes:

- `GET /academy/me`
- `GET /academy/courses/enrolled`
- `GET /academy/courses/:courseId/progress`
- `GET /academy/courses/:courseId/reward-gates`
- `GET /academy/contracts/readiness`
- `GET /readiness`
- `GET /openapi.json`

Mutation routes:

- `POST /academy/courses/:courseId/lessons/:lessonId/complete`
- `POST /academy/courses/:courseId/quizzes/:quizId/attempts`

Authentication routes:

- `POST /auth/nonce`
- `POST /auth/verify`

The Academy mutation routes require wallet-derived JWT authentication but do not require a separate preview-mode gate. They write to the local JSON repository and therefore fail the canonical default-deny requirement until Sprint 02 adds explicit runtime enforcement. Wallet authentication is identity compatibility only; it proves no signing authority, claim authority, payment authority, credential authority or production readiness.

## Authority Risk Findings

1. **Preview mutation gate missing - HIGH.** POST routes are enabled whenever a valid JWT is supplied; no explicit preview opt-in or non-production assertion exists.
2. **Readiness semantic mismatch - HIGH.** Readiness responses report writes disabled while Academy POST routes can write local state. The distinction between external execution and local preview mutation is not represented.
3. **Credential semantics - HIGH.** Current types/fixtures expose issue dates, verification status, proof hashes and NFT compatibility even though issuance and verification authority are prohibited.
4. **Reward semantics - HIGH.** Current models expose amounts, claimability, balances, unlock events and future wallet distribution language. These are mock values but are too authority-adjacent for the Sprint 02 target model.
5. **Contract authority ambiguity - HIGH.** Contracts include state-changing functions and deployment scripts. Tests prove scaffold behavior, not approval, deployment, treasury authority or production capability.
6. **Wallet/signing ambiguity - HIGH.** Wallet signature verification exists for authentication. It must never be described as Academy transaction signing or execution authority.
7. **Production persistence absent - MEDIUM.** Postgres is a throwing placeholder; no production schema, migration or approved adapter exists.
8. **Dormant provider routes - MEDIUM.** Upload, signed-URL and pointer modules exist outside the registered server composition and require separate scope/authority review before use.
9. **Negative policy checks absent - HIGH.** No automated check currently rejects prohibited authority identifiers or learner-facing labels.

## Stale and Conflicting Evidence

All maturity and validation claims dated 2026-06-08 are historical evidence, not current acceptance evidence.

- `STATUS.md` previously stated both L3 candidate and a later L4-candidate promotion.
- `ACADEMY_MATURITY_ASSESSMENT.md` previously recommended L4 candidate.
- `HANDOFF.md` simultaneously preserved L4-candidate language and requested refresh before promotion beyond L3.
- `VALIDATION.md` marked global PASS while omitting E2E from required current evidence.
- Historical `PORTFOLIO-REQ-*` results do not satisfy ACADEMY-EPIC-01 acceptance.

## Current Validation Evidence

Commands were executed on 2026-06-23 against the commit above.

Desktop E2E result: FAIL. Seven cases passed and `/academy/progress` failed.

| Command | Result | Evidence |
|---|---|---|
| `npm run typecheck` | PASS | Exit 0 |
| `npm run lint` | PASS | Exit 0 |
| `npm test -- --run` | PASS | Exit 0; 1 file, 20 tests |
| `npm run test:contracts` | PASS | Exit 0; 6 Solidity tests |
| `npm run build` under an initial 240-second observation limit | INCOMPLETE | Exit 124; aggregate command exceeded the initial observation limit |
| `npm run build` rerun under a 480-second limit | PASS | Exit 0; exact aggregate command completed in approximately 4m09s |
| `npm run build:web` | PASS_WITH_WARNINGS | Exit 0; 4,353 modules; Rollup annotation and chunk-size warnings; approximately 3m05s |
| `npm run build:api` | PASS | Exit 0 |
| `npm run test:e2e -- --project=desktop` in sandbox | ENVIRONMENT_BLOCKED | Localhost access failed with `EPERM`; not treated as product evidence |
| Same E2E command outside sandbox | FAIL | Exit 1; 7 passed, `/academy/progress` failed because `Axodus Academy` was not found |

The longer exact aggregate rerun closes the initial timeout as an observation-window issue. No tablet/mobile E2E result is claimed.

## Baseline Decision

- Preserve `L3_CANDIDATE_VALIDATION_INCOMPLETE`.
- Revoke the previous operational use of `PROMOTE_TO_L4_CANDIDATE`; retain it only as historical context in version control.
- Do not evaluate or infer D-Level.
- Do not count routes, authentication, contracts, ABIs, scripts, placeholders or readiness documents as functional authority.
- Start Sprint 02 only within the safe scope in `ACADEMY_EXECUTION_BOUNDARY.md` and `HANDOFF.md`.

## REQ-05 Delta - 2026-06-23

- Added explicit Academy runtime preview metadata and preview-mutation gating.
- Implemented deterministic local/mock learner flow derivation for progress, quiz, assessment, reward preview, recognition preview and certificate-preview eligibility.
- Updated Academy POST routes to fail closed by default and require explicit local preview configuration in non-production runtime.
- Added Academy learner tests proving deterministic progress, retry preview behavior, prohibited-field absence and boundary-metadata denial.
- Corrected the desktop E2E preview-gates expectation and reran desktop E2E to PASS.

Current delta classification:

```txt
ACADEMY-REQ-05: PASS
L-Level: L3_CANDIDATE_VALIDATION_INCOMPLETE
L4 promotion supported: NO
D-Level evaluated: NO
Production execution: DISABLED
```

## REQ-06 Delta - 2026-06-24

- Added a learner preview summary service for dashboard, progress, rewards and certificate pages.
- Added learner-facing `certificateAuthority` and `rewardAuthority` preview metadata.
- Hardened learner-facing `/academy/me` to remove contract-readiness data from dashboard/certificate-facing payloads.
- Updated learner-facing dashboard, progress, rewards and certificate preview pages to render preview-safe summary data and labels.
- Expanded Academy learner tests to cover rendered preview surfaces and learner-facing `/academy/me` payload safety.
- Reran desktop, tablet and mobile E2E to PASS.

Current delta classification:

```txt
ACADEMY-REQ-06: PASS
L-Level: L3_CANDIDATE_VALIDATION_INCOMPLETE
L4 promotion supported: NO
D-Level evaluated: NO
Production execution: DISABLED
```

## REQ-07 / REQ-08 Final Delta - 2026-06-24

- Added `npm run check:academy-authority` with 30 prohibited terms, exact reviewed exceptions, stale-allowlist rejection and bounded negative-test markers.
- Expanded enforcement across 49 Academy-relevant files, including modules, routes, fixtures, persistence, repository interfaces, server composition and Academy tests.
- Removed learner-facing compatibility read models and normalized remaining legacy fixture/UI authority language.
- Reconfirmed default-deny POST behavior, explicit non-production local preview gating and boundary-metadata non-authorization.
- Completed the required validation matrix: static check, typecheck, lint, 35 Academy tests, aggregate build, 24 cross-device E2E tests, contract compile and 6 contract scaffold tests all PASS.
- Reviewed every required production-sensitive gate as closed, gated or not authorized.
- Reconciled status, roadmap, validation, security, blockers, maturity and handoff.

Final classification:

```txt
ACADEMY-REQ-07: PASS
ACADEMY-REQ-08: PASS
ACADEMY-SPRINT-04: PASS
ACADEMY-EPIC-01: COMPLETE_NON_PRODUCTION
L-Level: L4_CONSOLIDATED
D-Level: D3+
Production: NON_PRODUCTION
Production authority: NONE
```

This final maturity conclusion grants no production, reward execution, certification issuance, wallet/signing, payment, treasury, settlement, provider, database or contract-write authority.
