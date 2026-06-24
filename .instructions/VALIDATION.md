# Academy Validation

Last updated: 2026-06-24

Authority contract: `ACADEMY_EXECUTION_BOUNDARY.md`.

## Validation Policy

- Results are command-specific and require terminal completion.
- Timeout, skipped, incomplete and environment-blocked results are not passes.
- Static checks must cover the declared paths and reject stale exceptions.
- Scaffold compile/tests establish scaffold behavior only, never execution authority.
- Validation can support maturity evidence but cannot open a production-sensitive gate.

## Sprint 04 Current Evidence

Command date: 2026-06-24

| Command | Result | Detail |
|---|---|---|
| `npm run check:academy-authority` | PASS | Exit 0; 49 files; 30 prohibited terms; 6 reviewed allowlist entries; 25 allowed matches |
| `npm run typecheck` | PASS | Exit 0 |
| `npm run lint` | PASS | Exit 0 |
| `./node_modules/.bin/vitest --run tests/academyLearning.test.ts` | PASS | Exit 0; 35/35 tests |
| `npm run build` | PASS | Exit 0; exact aggregate web/API command completed |
| `npm run test:e2e -- --project=desktop --project=tablet --project=mobile` | PASS | Exit 0; 24/24 tests; 8 per project |
| `npm run compile` | PASS | Exit 0; Solidity scaffold current, nothing to compile |
| `npm run test:contracts` | PASS | Exit 0; 6/6 scaffold tests |

Observed warnings during the E2E web-server build were limited to third-party Rollup annotation handling, large chunks and `NO_COLOR`/`FORCE_COLOR`; they did not fail the command. They remain build-quality notes, not authority evidence or critical Academy blockers.

## Static Authority Scan

Scanned paths:

```txt
src/modules/academy
src/routes/academy.ts
src/data/mock/academy.mock.js
src/repositories/academyProgressAdapters.ts
src/repositories/academyProgressRepository.ts
src/services/academyPersistence.ts
src/serverApp.ts
tests/academyLearning.test.ts
tests/e2e/academy-smoke.spec.ts
```

Reviewed exceptions:

- isolated `contractReadiness.ts` scaffold names, exact patterns only;
- `req.jwtVerify()` in server composition, authentication only;
- exact `certificateAuthority: "not-issued"` denial metadata;
- corresponding safe-negative/scaffold test assertions;
- explicitly marked negative-test regions.

The scanner fails on unmatched prohibited terms, stale allowlist entries, nested markers and unclosed markers. Policy and implementation are in `scripts/academy-authority-policy.mjs` and `scripts/check-academy-authority.mjs`.

## REQ Results

```txt
ACADEMY-REQ-07: PASS
ACADEMY-REQ-08: PASS
ACADEMY-SPRINT-04: PASS
```

This current evidence supports `L4_CONSOLIDATED` and `D3+` for the non-production mock/local Academy EPIC. It does not support production readiness, L5, D4, D5, or any financial, credential, wallet, provider, database or contract-write authority.

## Historical Evidence

REQ-01, REQ-05 and REQ-06 command results remain historical evidence. Earlier E2E failures and missing-static-check conclusions are superseded by the Sprint 04 terminal results above, not deleted from version history.

## Reproduction Commands

```bash
npm run check:academy-authority
npm run typecheck
npm run lint
./node_modules/.bin/vitest --run tests/academyLearning.test.ts
npm run build
npm run test:e2e -- --project=desktop --project=tablet --project=mobile
npm run compile
npm run test:contracts
```
