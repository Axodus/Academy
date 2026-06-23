# Academy Sprint 01 Handoff

Date: 2026-06-23

## Handoff State

```txt
Sprint 01: COMPLETE_BOUNDARY_BASELINE
Current maturity: L3_CANDIDATE_VALIDATION_INCOMPLETE
Next safe request: ACADEMY-REQ-03
Production authority: NONE
```

Sprint 01 establishes repository truth and the canonical boundary. It does not claim that runtime gates have already been implemented.

## Sprint 01 Acceptance Evidence

- [x] Real `.instructions`, source, API, contract and test surfaces inventoried.
- [x] Current validation commands recorded with terminal results or explicit incomplete/blocked status.
- [x] Historical 2026-06-08 validation and L4-candidate language classified as stale.
- [x] Operational gates defined in a canonical fail-closed authority matrix.
- [x] Wallet/API/contract/deployment/persistence/provider scaffolds classified as non-authoritative.
- [x] Six-condition preview mutation contract defined; current missing enforcement remains visible.
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
- Keep mutations fail-closed; the current missing runtime gate remains an open blocker.
- Update status, blockers and validation with observed evidence only.

## Acceptance Rule

```txt
No validation result means no maturity promotion.
No explicit preview gate means no local mutation.
No scaffold counts as authority evidence.
No production, treasury, wallet/signing, reward, settlement or certification-issuance gate opens.
```
