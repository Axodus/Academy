# Academy Blocker Register

Last updated: 2026-06-24

## Promotion Blockers

### ACADEMY-BLOCKER-001 - Preview Mutation Gate Missing

Severity: HIGH
Status: RESOLVED

Academy POST routes now fail closed by default. Local preview behavior requires explicit local preview configuration, non-production runtime classification and local/mock persistence only. Authentication remains insufficient by itself.

Resolution: implemented in `ACADEMY-REQ-05` and covered by Academy tests proving default denial and boundary-metadata denial.

### ACADEMY-BLOCKER-002 - Learner-Facing Authority Semantics

Severity: HIGH
Status: PARTIAL

REQ-05 removed prohibited authority semantics from the learner flow and route serialization. REQ-06 hardens the learner dashboard, rewards, progress and certificate preview surfaces plus learner-facing `/academy/me` payloads. Repository-wide enforcement is still incomplete until the deferred negative static checks exist.

Resolution: continue with repository-wide negative checks and any remaining UI cleanup required by later scope.

### ACADEMY-BLOCKER-003 - Negative Static Checks Missing

Severity: HIGH
Status: OPEN

No automated policy currently rejects prohibited authority identifiers or labels in learner-facing models, fixtures, services, API responses and UI.

Resolution: implement ACADEMY-REQ-07 checks with reviewed exceptions limited to blocklists, negative tests, security documentation and isolated compatibility scaffolds.

### ACADEMY-BLOCKER-004 - Desktop E2E Failure

Severity: MEDIUM
Status: RESOLVED

The prior desktop E2E failure was a stale expectation in the learning workspace preview-gates assertion. Current desktop result is 8 passed / 0 failed.

Resolution: expectation corrected and desktop E2E rerun to PASS during `ACADEMY-REQ-05`.

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
