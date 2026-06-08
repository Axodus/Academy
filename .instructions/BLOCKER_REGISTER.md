# Academy Blocker Register

Last updated: 2026-06-08

## ACADEMY-BLOCKER-001 - Production Reward Authority Missing

Severity: HIGH

Status: OPEN

Description: Academy has mock/readiness reward and PoK surfaces, but production reward issuance, token minting, withdrawal and treasury execution are not approved.

Impact: Academy cannot claim production reward or certification execution.

Resolution path: Define governance, treasury, compliance and contract approval path before production reward behavior.

## ACADEMY-BLOCKER-002 - Current Validation Refresh Required

Severity: MEDIUM

Status: OPEN

Description: Prior local evidence exists, but PORTFOLIO-REQ-01 did not initially have a consolidated current validation report.

Impact: Maturity remains L3 candidate, not L4 final.

Resolution path: Execute Academy validation request with typecheck, lint, unit tests, contract tests and build if safe.

## ACADEMY-BLOCKER-003 - Production Persistence Not Approved

Severity: MEDIUM

Status: OPEN

Description: Local JSON and adapter readiness exist, but production database schema and runtime persistence are not approved.

Impact: Production learning state and certification state cannot be treated as authoritative.

Resolution path: Approve persistence design and migration plan through a separate request.
