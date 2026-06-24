# Academy Roadmap

Last updated: 2026-06-24

All phases are governed by `ACADEMY_EXECUTION_BOUNDARY.md`.

## ACADEMY-SPRINT-01 - Current State and Instruction Alignment

Status: COMPLETE

Deliverables:

- evidence-backed baseline;
- stale evidence classification;
- canonical execution boundary;
- normalized operational status, blockers, validation and handoff;
- safe Sprint 02 scope.

Open runtime and validation blockers remain promotion blockers for later implementation; they do not invalidate the completed Sprint 01 baseline/boundary deliverables.

## ACADEMY-SPRINT-02 - Educational Domain Foundation

Status: COMPLETE

Deliverables:

- validated education schemas;
- deterministic mock/local fixtures;
- immutable course catalog services;
- immutable learning-path services;
- non-monetary reward preview and certificate preview types;
- bounded tests.

No mutation, wallet, contract, provider, payment, credential or production authority is in scope.

## ACADEMY-SPRINT-03 - Learner Experience Mock/Local

Status: COMPLETE, `ACADEMY-REQ-05` PASS and `ACADEMY-REQ-06` PASS

Delivered in `ACADEMY-REQ-05`:

- pure mock learner transitions;
- fail-closed local preview mutation enforcement;
- progress, quiz and assessment preview flow;
- reward, recognition and certificate-preview separation;
- explicit preview boundary metadata.

Delivered in `ACADEMY-REQ-06`:

- learner dashboard preview rendering from preview-safe summary models;
- certificate preview presentation with `not-issued`, `eligible-preview`, `not-eligible-preview` and `presentation-preview` states;
- persistent preview-only and non-authoritative learner-facing labels;
- learner-facing route metadata extended with `certificateAuthority` and `rewardAuthority`;
- desktop, tablet and mobile E2E rerun to PASS.

Remaining Sprint 03 work:

- repository-wide negative static authority checks;
- final maturity consolidation remains deferred to Sprint 04.

## ACADEMY-SPRINT-04 - Validation and Consolidation

Status: BLOCKED ON IMPLEMENTATION

Planned deliverables:

- negative static authority checks;
- complete command-specific validation;
- security gate review;
- blocker reconciliation;
- evidence-backed L4 decision and handoff.

## Future Authority Work

Production databases, providers, contracts, credentials, rewards, treasury, billing, settlement, payouts and cross-nucleus integration are not phases of EPIC-01. Each requires a separate approved request and cannot be inferred from L4 maturity.
