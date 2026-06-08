# Academy Validation

Last updated: 2026-06-08

## Known Commands

From `package.json`:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:contracts`
- `npm run test:e2e`

## PORTFOLIO-REQ-01 Validation Scope

Safe documentation checks:

- `.instructions/STATUS.md` exists.
- `.instructions/ACADEMY_MATURITY_ASSESSMENT.md` exists.
- no production readiness claim is introduced.
- production reward, treasury, wallet signing and on-chain execution remain disabled.

## Current Validation Status

Status: PASS

PORTFOLIO-REQ-01 commands run:

```bash
npm run typecheck
npm run lint
npm run test -- --run
```

Results:

- Typecheck: PASS
- Lint: PASS
- Tests: PASS, 1 file / 20 tests

Remaining validation:

- Contract tests, web build and e2e smoke should be run in a dedicated Academy validation request before any maturity promotion beyond L3 candidate.
