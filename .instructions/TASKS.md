# Academy Tasks

Last updated: 2026-06-23

## Sprint 01

- [x] Inspect `.instructions`, source, APIs, contracts, tests and validation evidence.
- [x] Establish a current evidence baseline.
- [x] Identify stale and conflicting maturity evidence.
- [x] Define the canonical execution boundary.
- [x] Classify compatibility scaffolds as non-authoritative.
- [x] Define the fail-closed preview mutation contract.
- [x] Define a safe Sprint 02 handoff.

## Sprint 02 Safe Queue

### ACADEMY-REQ-03

- validated TypeScript schemas;
- deterministic mock/local fixtures;
- non-monetary reward preview model;
- certificate preview model without credential authority;
- schema and fixture validation tests.

### ACADEMY-REQ-04

- immutable read-only catalog listing and lookup;
- deterministic filtering and ordering;
- immutable learning-path and prerequisite resolution;
- explicit not-found/invalid-reference behavior;
- unit tests without provider, persistence or wallet dependencies.

## Sprint 03

### ACADEMY-REQ-05

- [x] implement deterministic local/mock learner progress flow;
- [x] normalize quiz availability, scoring and retry preview behavior;
- [x] keep progress, assessment, reward preview, recognition preview and certificate-preview eligibility as separate states;
- [x] enforce fail-closed Academy POST behavior by default;
- [x] require explicit local preview configuration and non-production runtime for local preview POST behavior;
- [x] prove boundary metadata alone cannot authorize POST behavior;
- [x] keep learner-facing serialized responses free of prohibited authority fields;
- [x] rerun required typecheck, lint, Academy learner tests and desktop E2E;
- [x] update `.instructions` with REQ-05 results and remaining blockers.

## Promotion Blockers

- implement repository-wide negative static authority checks;
- complete broader learner dashboard/certificate-preview cleanup if a later request requires it;
- preserve broader validation coverage as implementation continues;
- run required desktop/tablet/mobile acceptance coverage before L4 review.

## Closed Gates / Not Active Tasks

The following are not authorized implementation tasks under EPIC-01:

- production persistence or database migrations;
- production API/provider integration;
- wallet transaction signing;
- contract deployment or writes;
- token rewards, claims, transfers or balances;
- certificate issuance or verification;
- treasury, billing, settlement or payouts;
- cross-nucleus permissions or governance authority.

See `ACADEMY_EXECUTION_BOUNDARY.md` before selecting any task.
