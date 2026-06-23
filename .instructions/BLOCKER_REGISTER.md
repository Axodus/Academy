# Academy Blocker Register

Last updated: 2026-06-23

## Promotion Blockers

### ACADEMY-BLOCKER-001 - Preview Mutation Gate Missing

Severity: HIGH
Status: OPEN

Academy POST routes accept wallet-derived JWT authentication and write local JSON state without a separate explicit preview-mode gate. Authentication is not authorization for preview execution.

Resolution: implement the six-condition preview mutation contract in `ACADEMY_EXECUTION_BOUNDARY.md` and prove default denial with tests.

### ACADEMY-BLOCKER-002 - Learner-Facing Authority Semantics

Severity: HIGH
Status: OPEN

Current models, fixtures and UI contain credential/reward fields such as issue dates, verification status, proof hashes, NFT compatibility, claimability, token amounts and wallet-distribution language.

Resolution: replace these with explicit non-monetary reward previews and certificate previews, then validate all learner-facing surfaces.

### ACADEMY-BLOCKER-003 - Negative Static Checks Missing

Severity: HIGH
Status: OPEN

No automated policy currently rejects prohibited authority identifiers or labels in learner-facing models, fixtures, services, API responses and UI.

Resolution: implement ACADEMY-REQ-07 checks with reviewed exceptions limited to blocklists, negative tests, security documentation and isolated compatibility scaffolds.

### ACADEMY-BLOCKER-004 - Desktop E2E Failure

Severity: MEDIUM
Status: OPEN

Current desktop E2E result is 7 passed / 1 failed. `/academy/progress` did not render the expected `Axodus Academy` shell marker.

Resolution: diagnose and fix or correct the route expectation, then run desktop, tablet and mobile projects with terminal results.

## Closed-by-Policy Production Gates

These gates are intentionally closed and are not Sprint 01 defects:

- production reward, token, claim, mint, transfer or payout authority;
- certification issuance, verification or credential authority;
- wallet transaction signing;
- contract deployment or state-changing provider calls;
- treasury, billing, settlement or payout execution;
- production database schema, migration or persistence;
- production API/provider execution;
- cross-nucleus or governance authority.

Opening any gate requires a separate approved request, the required Codex escalation and new security/governance evidence. L4 promotion alone cannot open a gate.

## Resolved by Sprint 01

### ACADEMY-BLOCKER-006 - Conflicting Operational Status

Severity: HIGH
Status: RESOLVED

The prior L3/L4, validation and handoff conflicts were replaced by a single evidence-backed classification and canonical boundary dated 2026-06-23.

### ACADEMY-BLOCKER-005 - Exact Aggregate Build Result Incomplete

Severity: LOW
Status: RESOLVED

The initial 240-second observation window expired. The exact `npm run build` command was rerun with a 480-second limit and completed with exit 0 in approximately 4m09s.
