# Academy Status

Last updated: 2026-06-23

## Current Request

`ACADEMY-SPRINT-03` - Learner Experience Mock/Local and Fail-Closed Preview Flow

- `ACADEMY-REQ-05`: PASS on 2026-06-23.
- Sprint 02 foundation remains the required base in `src/modules/academy/services/academyPreviewSchema.ts`, `src/data/mock/academy.mock.js`, `src/modules/academy/services/academyData.ts` and `src/routes/academy.ts`.

## Current Classification

```txt
L-Level: L3_CANDIDATE_VALIDATION_INCOMPLETE
L4 promotion: NOT_SUPPORTED
D-Level: NOT_EVALUATED
Production readiness: NO
Production execution: DISABLED
Current request result: PASS
```

L-Level describes maturity evidence only. It grants no D-Level, deployment permission, financial authority, credential authority or production authority.

## Canonical Operating Mode

```txt
NON_PRODUCTION
MOCK_OR_CONFIG_FIRST
READ_ONLY_OR_PREVIEW_ONLY_WHEN_APPLICABLE
EXECUTION_GATED
TREASURY_GATED
CERTIFICATION_ISSUANCE_GATED
REWARDS_GATED
FAIL_CLOSED_BY_DEFAULT
```

The canonical rules are in `ACADEMY_EXECUTION_BOUNDARY.md`.

## Current Evidence

- Typecheck: PASS.
- Lint: PASS.
- Academy learner tests: PASS, `tests/academyLearning.test.ts`, 31 tests.
- Desktop E2E: PASS, 8 passed.
- Tablet/mobile E2E: NOT RUN for REQ-05.
- Preview mutation gate: IMPLEMENTED for registered Academy POST routes.
- Mutation enforcement: FAIL_CLOSED by default; local preview mutation requires explicit local preview configuration and non-production runtime.
- Boundary metadata alone authorizes no POST behavior.
- Negative static authority checks: PARTIAL only; Academy learner tests cover route serialization, prohibited learner-facing fields and restricted learner-facing UI semantics, but repository-wide checks are still deferred.

## Authority Status

| Area | Status |
|---|---|
| Local fixtures and read models | ALLOWED, mock/local only |
| Read-only catalog/path work | ALLOWED |
| Local progress mutation | ALLOWED only behind the explicit local preview gate and non-production runtime checks |
| Wallet authentication | COMPATIBILITY SCAFFOLD only |
| Wallet transaction signing | CLOSED |
| Certificate/badge preview | PREVIEW ONLY |
| Certification issuance/verification | CLOSED |
| Non-monetary reward preview | PREVIEW ONLY |
| Token reward, claim or transfer | CLOSED |
| Contract tests/static inspection | ALLOWED as scaffold validation |
| Contract deployment/write | CLOSED |
| Production database/API/provider | CLOSED |
| Treasury, billing, settlement, payout | CLOSED |
| Cross-nucleus/governance authority | CLOSED |

## Promotion Blockers

See `BLOCKER_REGISTER.md`. The primary blockers are the missing repository-wide negative static checks, incomplete broader validation coverage and deferred dashboard/certificate-preview cleanup outside REQ-05.

## Next Safe Work

`ACADEMY-REQ-06` or `ACADEMY-REQ-07`, limited to remaining preview cleanup, repository-wide negative static checks and broader validation consolidation without opening any production-sensitive gate.
