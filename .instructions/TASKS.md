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

## Promotion Blockers

- implement the explicit fail-closed preview mutation gate;
- remove authority-adjacent learner fields and labels;
- implement negative static authority checks;
- resolve the `/academy/progress` desktop E2E failure;
- preserve the passing exact aggregate build result after implementation changes;
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
