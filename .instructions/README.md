# Axodus Academy Workspace Instructions

## Purpose

Academy coordinates educational content, learning paths, local learner progression, assessments and preview-only learner recognition for the Axodus ecosystem.

Academy is capability-oriented infrastructure, not production financial, credential, governance or provider authority.

## Canonical Authority

All work in this workspace is governed by:

1. `ACADEMY_EXECUTION_BOUNDARY.md` - mandatory execution and authority rules.
2. `ACADEMY_CURRENT_STATE_BASELINE.md` - current repository evidence.
3. `STATUS.md` and `BLOCKER_REGISTER.md` - current classification and open blockers.
4. `VALIDATION.md` - command-specific evidence.
5. `HANDOFF.md` - next safe implementation scope.

If another instruction conflicts with the canonical boundary, the stricter fail-closed interpretation wins and the conflict must be recorded.

Root-level Academy Markdown files are product/design context, not operational authority. They cannot override `.instructions/ACADEMY_EXECUTION_BOUNDARY.md`, current status, blockers or validation evidence.

## Current Operating Mode

```txt
NON_PRODUCTION
MOCK_OR_CONFIG_FIRST
READ_ONLY_OR_PREVIEW_ONLY_WHEN_APPLICABLE
EXECUTION_GATED
TREASURY_GATED
CERTIFICATION_ISSUANCE_GATED
REWARDS_GATED
FAIL_CLOSED_BY_DEFAULT
```

## Domain Separation

Keep these concepts independent:

- content access;
- lesson progress;
- quiz and assessment results;
- certificate preview eligibility;
- non-monetary reward preview;
- wallet authentication compatibility;
- production or governance authority.

No state in one domain grants state or authority in another.

## Compatibility Scaffolds

Wallet-authenticated routes, contracts, ABIs, deployment scripts, readiness endpoints, local persistence and provider modules are compatibility scaffolds. They may demonstrate isolation or local behavior, but never production readiness, wallet execution, credential authority, economic entitlement or L4 functional authority.

## Codex Selection Rule

Every Academy EPIC, Sprint and REQ must include the configuration block defined in `ACADEMY_EPIC_01.md`.

- Bounded local schemas/read-only services: `gpt-5.4 + Medium` or `High`.
- Boundaries, blockers, validation and authority-sensitive work: `gpt-5.5 + High`.
- Security, maturity and promotion decisions: `gpt-5.5 + Extra high`.

When unsure, use `gpt-5.5 + High`.

## Non-Negotiables

- no production claims from mock/local behavior;
- no maturity promotion from partial evidence;
- no mutation without an explicit fail-closed preview gate;
- no credential issuance or verification;
- no token, claim, payment, settlement, payout or treasury execution;
- no wallet transaction signing or contract/provider execution;
- no cross-nucleus or governance authority by implication;
- no scaffold counted as authority evidence.
