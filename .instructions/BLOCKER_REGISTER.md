# Academy Blocker Register

Last updated: 2026-06-24

## EPIC-01 Promotion Blockers

### ACADEMY-BLOCKER-001 - Preview Mutation Gate Missing

Severity: HIGH
Status: RESOLVED

Resolved by REQ-05. Registered Academy POST routes fail closed by default; local preview behavior requires explicit configuration, non-production runtime and local-only persistence. Boundary metadata and authentication are insufficient.

### ACADEMY-BLOCKER-002 - Learner-Facing Authority Semantics

Severity: HIGH
Status: RESOLVED

Resolved across REQ-05 through REQ-07. Learner models, fixtures, route payloads and UI use mock/local preview semantics. REQ-07 removed the remaining compatibility-read-model leakage and legacy governance-risk fixture terms.

### ACADEMY-BLOCKER-003 - Negative Static Checks Missing

Severity: HIGH
Status: RESOLVED

Resolved by REQ-07. `npm run check:academy-authority` scans 49 Academy-relevant files for all 30 required terms, enforces exact reviewed exceptions and fails on stale allowlist entries or malformed negative-test regions.

### ACADEMY-BLOCKER-004 - Desktop E2E Failure

Severity: MEDIUM
Status: RESOLVED

Current Sprint 04 result is 24/24 across desktop, tablet and mobile, including `/academy/progress`.

### ACADEMY-BLOCKER-005 - Exact Aggregate Build Result Incomplete

Severity: LOW
Status: RESOLVED

The exact aggregate build has a current Sprint 04 terminal PASS.

### ACADEMY-BLOCKER-006 - Conflicting Operational Status

Severity: HIGH
Status: RESOLVED

Status, roadmap, validation, security, maturity, blockers, baseline and handoff now agree on `L4_CONSOLIDATED`, `D3+`, and `NON_PRODUCTION`.

## Remaining Closed-by-Policy Gates

These are intentional authority boundaries, not unresolved blockers for non-production L4 maturity:

- production and production persistence;
- production APIs and external providers;
- real rewards or financial entitlement;
- real certification, real credentials and credential verification;
- wallet transaction signing;
- contract deployment/writes;
- on-chain issuance and NFT/SBT minting;
- payment, treasury, billing, payout and settlement;
- ACS provisioning and cross-nucleus authority.

Opening any gate requires a separate approved request and new security/governance evidence. `L4_CONSOLIDATED` and `D3+` cannot open a gate.
