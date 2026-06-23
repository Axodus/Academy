# Academy Decisions

Last updated: 2026-06-23

## Active Decisions

### Canonical Execution Boundary

Decision: `ACADEMY_EXECUTION_BOUNDARY.md` is the controlling authority contract for all Academy work.

Status: CONFIRMED

### Current Maturity

Decision: Academy remains `L3_CANDIDATE_VALIDATION_INCOMPLETE`. Previous L4-candidate promotion language is superseded by current evidence.

Status: CONFIRMED

### L-Level and D-Level Separation

Decision: L-Level measures maturity evidence only. It cannot grant D-Level, production permission, financial authority, credential authority or governance authority.

Status: CONFIRMED

### Mock/Preview Domain

Decision: Current Academy learner functionality is non-production and mock/local. Courses and learning paths are config/read-only; learner state is preview-only where mutation is explicitly gated.

Status: CONFIRMED

### Preview Mutation

Decision: POST compatibility routes must fail closed by default. Authentication is insufficient. Local mutation requires every condition in the canonical preview mutation contract.

Implementation status: NOT IMPLEMENTED

### Certificate and Badge Semantics

Decision: Academy exposes preview eligibility and presentation only. It has no issuance, verification, ownership, chain or cross-nucleus credential authority.

Status: CONFIRMED

### Reward Semantics

Decision: Academy learner-facing rewards are non-monetary previews only. They create no token balance, claim, transfer, settlement, payout or treasury entitlement.

Status: CONFIRMED

### Compatibility Scaffolds

Decision: Wallet authentication, contracts, ABIs, deployment scripts, readiness endpoints, persistence placeholders and provider modules are isolated compatibility scaffolds. They never count as functional authority evidence.

Status: CONFIRMED

### Validation and Promotion

Decision: Only current, observed, command-specific terminal results count. No partial result supports global readiness or maturity promotion.

Status: CONFIRMED

### Codex Configuration

Decision: Every Academy EPIC, Sprint and REQ includes the model/reasoning block in `ACADEMY_EPIC_01.md`. Authority-sensitive work uses at least `gpt-5.5 + High`; security and maturity decisions use `gpt-5.5 + Extra high`.

Status: CONFIRMED

## Superseded Operational Decisions

The following prior interpretations are no longer active:

- `PROMOTE_TO_L4_CANDIDATE` based on 2026-06-08 validation;
- using mock Locked/Unlocked token classes as the target learner-facing model;
- treating wallet-authenticated routes as integration readiness evidence;
- describing contract scaffolds as future execution readiness within the active sprint;
- treating E2E as optional for current maturity evidence.

Historical text remains available through version control and grants no authority.

## Pending Decisions

- exact runtime configuration interface for fail-closed local preview mutations;
- reviewed allowlist structure for ACADEMY-REQ-07 negative checks;
- production database, providers, contracts, credentials, rewards and financial execution, each requiring separate future authority.
