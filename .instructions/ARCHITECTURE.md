# Academy Architecture

## Current Nucleus

Academy currently contains:

- React/Vite learner-facing routes;
- local mock fixtures and TypeScript read models;
- course, progress, quiz, PoK and reward-preview-oriented services;
- Fastify health, authentication and Academy routes;
- local JSON/in-memory persistence with a Postgres placeholder;
- Solidity contracts, ABIs, readiness views and deployment scripts;
- unit/API, Solidity and Playwright tests.

The authoritative inventory is `ACADEMY_CURRENT_STATE_BASELINE.md`.

## Architectural Boundaries

### Educational domain

Courses, lessons, learning paths, progress and assessments may operate over validated mock/local data. Sprint 02 services are read-only and deterministic.

### Learner recognition

Badges and certificates are previews only. Eligibility is a learner-state calculation, not issuance, verification, ownership or credential authority.

### Reward preview

Learner rewards are non-monetary preview points only. They create no token balance, claim, transfer, payout or treasury entitlement.

### API and persistence

GET routes may expose mock/read-only data with boundary metadata. POST compatibility routes remain blocked from approved use until a separate explicit preview gate fails closed by default. Persistence remains in-memory or local ignored-file storage.

### Wallet authentication

Wallet signatures may establish a compatibility session. They do not authorize Academy transactions, claims, credentials, payments or production execution.

### Contracts and providers

Contracts, ABIs, scripts, readiness services and dormant provider routes are isolated compatibility scaffolds. They are outside the Academy learner domain and provide no functional authority.

## Required Direction

1. Validated TypeScript schemas and fixtures.
2. Immutable catalog and learning-path services.
3. Pure mock learner transitions.
4. Explicit certificate/reward preview models.
5. Fail-closed runtime gates.
6. Negative authority checks.
7. Evidence-backed maturity assessment.

## Constraints

- no hidden authority in frontend state or API adapters;
- no provider call from mock/local domain services;
- no production persistence fallback;
- no learner field that implies economic or credential authority;
- no contract or wallet state used as learner entitlement;
- no L-Level interpreted as D-Level or production permission.

See `ACADEMY_EXECUTION_BOUNDARY.md` for the mandatory authority matrix.
