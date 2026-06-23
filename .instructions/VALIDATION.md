# Academy Validation

Last updated: 2026-06-23

Authority contract: `ACADEMY_EXECUTION_BOUNDARY.md`.

## Validation Policy

- Results are command-specific.
- Only observed terminal results may be marked PASS or FAIL.
- Timeout, skipped, incomplete and environment-blocked results are not passes.
- Partial coverage cannot support global readiness or maturity promotion.
- Scaffold tests establish scaffold behavior only, never execution authority.

## ACADEMY-REQ-01 Evidence

Commit inspected: `42730d27bbd56c10233479250ef19f595cd65b29`

| Command | Result | Detail |
|---|---|---|
| `npm run typecheck` | PASS | Exit 0 |
| `npm run lint` | PASS | Exit 0 |
| `npm test -- --run` | PASS | Exit 0; 20/20 tests |
| `npm run test:contracts` | PASS | Exit 0; 6/6 Solidity scaffold tests |
| `npm run build` with initial 240-second limit | INCOMPLETE | Exit 124 |
| `npm run build` rerun with 480-second limit | PASS | Exit 0; exact aggregate command completed in approximately 4m09s |
| `npm run build:web` | PASS_WITH_WARNINGS | Exit 0; Rollup annotation and large-chunk warnings |
| `npm run build:api` | PASS | Exit 0 |
| Desktop E2E inside sandbox | ENVIRONMENT_BLOCKED | Local preview access failed with `EPERM` |
| Desktop E2E outside sandbox | FAIL | Exit 1; 7 passed, `/academy/progress` failed |
| Tablet E2E | NOT RUN | No claim |
| Mobile E2E | NOT RUN | No claim |

## Current Validation Result

```txt
PARTIAL_PASS_WITH_BLOCKERS
```

The result supports the existence of a working local prototype and contract scaffolds. It does not support L4 promotion, production readiness or any financial, credential, wallet, contract, database or provider authority.

## Required Before L4 Consolidation

- exact aggregate build continues to have a terminal PASS after implementation changes;
- unit/API and required contract scaffold tests pass;
- desktop, tablet and mobile E2E requirements pass or are explicitly revised by an approved request;
- preview mutations fail closed by default;
- negative static checks pass;
- learner-facing authority semantics are removed;
- blockers, status, maturity assessment and handoff agree;
- no production-sensitive gate is opened.

## Known Commands

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
npm run test:contracts
npm run test:e2e -- --project=desktop
npm run test:e2e -- --project=tablet
npm run test:e2e -- --project=mobile
```
