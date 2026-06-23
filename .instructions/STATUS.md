# Academy Status

Last updated: 2026-06-23

## Current Request

`ACADEMY-SPRINT-01` - Current State and Instruction Alignment

- `ACADEMY-REQ-01`: baseline established in `ACADEMY_CURRENT_STATE_BASELINE.md`.
- `ACADEMY-REQ-02`: boundary established in `ACADEMY_EXECUTION_BOUNDARY.md`.

## Current Classification

```txt
L-Level: L3_CANDIDATE_VALIDATION_INCOMPLETE
L4 promotion: NOT_SUPPORTED
D-Level: NOT_EVALUATED
Production readiness: NO
Production execution: DISABLED
Evidence result: PARTIAL_PASS_WITH_BLOCKERS
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
- Unit/API tests: PASS, 20 tests.
- Solidity scaffold tests: PASS, 6 tests; not authority evidence.
- Web build: PASS_WITH_WARNINGS.
- API build: PASS.
- Aggregate build: PASS on exact-command rerun with a 480-second limit; the initial 240-second attempt was incomplete.
- Desktop E2E: FAIL, 7 passed and `/academy/progress` failed.
- Tablet/mobile E2E: NOT RUN.
- Preview mutation gate: NOT IMPLEMENTED.
- Negative static authority checks: NOT IMPLEMENTED.

## Authority Status

| Area | Status |
|---|---|
| Local fixtures and read models | ALLOWED, mock/local only |
| Read-only catalog/path work | ALLOWED after Sprint 01 handoff |
| Local progress mutation | BLOCKED until explicit fail-closed preview gate is implemented |
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

See `BLOCKER_REGISTER.md`. The primary blockers are the absent preview mutation gate, unsafe learner-facing authority semantics, absent negative static checks and the failing E2E route.

## Next Safe Work

`ACADEMY-SPRINT-02`, limited to validated local schemas/fixtures and deterministic read-only catalog/learning-path services. Sprint 02 must not consume or extend mutation, wallet, contract, payment, credential, provider or production authority.
