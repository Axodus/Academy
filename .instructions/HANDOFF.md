# Academy Handoff

Date: 2026-06-24

## Current Handoff State

```txt
Sprint 03 / ACADEMY-REQ-06: PASS
Current maturity: L3_CANDIDATE_VALIDATION_INCOMPLETE
Next safe request: ACADEMY-REQ-07 or Sprint 04 validation/consolidation
Production authority: NONE
```

REQ-06 establishes a safe learner-facing dashboard, rewards, progress and certificate preview experience on top of the Sprint 02 foundation and the REQ-05 learner flow. It does not claim production authority, reward execution authority, credential authority, wallet/signing authority, contract authority or maturity promotion beyond the current L3 candidate state.

## REQ-06 Delivered

- learner dashboard rendering from preview-safe summary models;
- certificate preview presentation with explicit `not-issued` and preview-eligible semantics;
- reward, progress and recognition preview surfaces aligned to non-authoritative labels;
- learner-facing `/academy/me` payload no longer exposes contract-readiness data for dashboard/certificate surfaces;
- learner-facing route metadata labeled `mock-local`, `preview-only`, `not-issued` and `non-monetary-preview`;
- desktop, tablet and mobile E2E rerun to PASS.

## Delivery Reality Check

Actually implemented:

- learner preview summary service for dashboard, progress, rewards and certificate pages;
- certificate preview state presentation and metadata;
- learner-facing route payload hardening for `/academy/me`;
- learner-facing UI copy hardening for dashboard/certificate/reward/progress surfaces;
- Academy tests and cross-device E2E validation;
- `.instructions` refresh for REQ-06.

Only documented or deferred:

- repository-wide negative static authority checks;
- later maturity consolidation work.

Still blocked:

- real rewards;
- real certification;
- on-chain issuance;
- treasury;
- wallet/signing;
- payouts;
- billing;
- settlement;
- production;
- real credentials;
- external providers;
- production APIs;
- production databases;
- NFT/SBT minting;
- contract writes.

## Sprint 01 Historical Context

Sprint 01 establishes repository truth and the canonical boundary. It does not claim that runtime gates have already been implemented.

## Sprint 01 Acceptance Evidence

- [x] Real `.instructions`, source, API, contract and test surfaces inventoried.
- [x] Current validation commands recorded with terminal results or explicit incomplete/blocked status.
- [x] Historical 2026-06-08 validation and L4-candidate language classified as stale.
- [x] Operational gates defined in a canonical fail-closed authority matrix.
- [x] Wallet/API/contract/deployment/persistence/provider scaffolds classified as non-authoritative.
- [x] Six-condition preview mutation contract defined at Sprint 01 time; REQ-05 later implements the registered Academy POST enforcement.
- [x] L-Level separated from D-Level and production authority.
- [x] Sprint 02 scope limited to schemas, fixtures and deterministic read-only services.

## Sprint 02 Allowed Scope

ACADEMY-REQ-03 and ACADEMY-REQ-04 may implement only:

- Zod-validated TypeScript education schemas;
- deterministic mock/local fixtures;
- non-monetary reward preview and certificate preview models;
- immutable, read-only course catalog services;
- immutable, read-only learning-path resolution;
- validation and unit tests for those bounded surfaces.

## Sprint 02 Forbidden Scope

- enabling or extending POST mutations;
- using wallet identity as educational, reward or credential authority;
- production persistence, schema or migrations;
- provider or production API calls;
- contract deployment, reads used as entitlement, or writes;
- credential issuance or verification;
- token amounts, balances, claims, transfers or economic entitlement;
- treasury, billing, settlement or payouts;
- cross-nucleus permission or governance decisions.

## Compatibility Rule

Existing wallet-authenticated APIs, contracts, ABIs, deployment scripts, readiness endpoints and persistence placeholders may remain only as isolated compatibility scaffolds. They must not be consumed by Sprint 02 and never count as L4 functional authority evidence.

## Required Controls

- Follow `ACADEMY_EXECUTION_BOUNDARY.md`.
- Include the required Codex configuration in every REQ.
- Escalate to `gpt-5.5 + High` if any authority-sensitive field or dependency appears.
- Keep mutations fail-closed; REQ-05 implements the runtime gate for the registered Academy POST routes and REQ-06 must not broaden it.
- Update status, blockers and validation with observed evidence only.

## Acceptance Rule

```txt
No validation result means no maturity promotion.
No explicit preview gate means no local mutation.
No scaffold counts as authority evidence.
No production, treasury, wallet/signing, reward, settlement or certification-issuance gate opens.
```
