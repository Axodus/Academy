# ACADEMY-REQ-02 - Canonical Execution Boundary

Status: ACTIVE
Effective date: 2026-06-23

## Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `High`

Justification:

- Risk level: High.
- Complexity: High because the boundary applies across UI, APIs, persistence, contracts, providers and documentation.
- Authority/security impact: High because it controls wallet/signing, credentials, rewards, treasury and production semantics.
- Reason for not using a smaller model: Ambiguous or incomplete wording could open authority through implication rather than code.

## Mandatory Runtime Classification

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

This file is the canonical Academy authority contract. Other `.instructions` files must link to it and may strengthen, but never weaken, these rules.

## Authority Matrix

| Capability | Current status | Allowed Academy behavior |
|---|---|---|
| Course catalog and learning paths | MOCK/LOCAL | Read-only fixture/config resolution |
| Learner progress and quiz state | LOCAL PREVIEW | Pure mock transitions; local mutation only behind the explicit preview gate, non-production runtime checks and local/mock persistence |
| Certificate | PREVIEW ONLY | Eligibility and visual preview with `not-issued` authority metadata; no issuance, verification or ownership claim |
| Badge | PREVIEW ONLY | Display metadata and recognition preview labels only; no credential authority |
| Reward | NON-MONETARY PREVIEW ONLY | Preview points/labels with `non-monetary-preview` metadata; no token, balance, claim, transfer or economic entitlement |
| Wallet authentication | COMPATIBILITY SCAFFOLD | Identity/session compatibility only |
| Wallet signing | CLOSED | No transaction, claim, credential or provider signing |
| Persistence | LOCAL/MOCK | In-memory or local ignored files only |
| Production database | CLOSED | No schema, migrations, connection or authoritative records |
| Contracts and ABIs | COMPATIBILITY SCAFFOLD | Static inspection and local tests only |
| Contract deployment/write | CLOSED | No deployment, transaction or state-changing provider call |
| Treasury, billing, settlement, payout | CLOSED | No calculation that creates entitlement and no execution |
| External providers | CLOSED | No runtime provider execution under Academy EPIC-01 |
| Cross-nucleus authority | CLOSED | No inferred permissions, eligibility or governance effect |

## Preview Mutation Contract

Academy POST routes may remain only as compatibility paths and must fail closed by default.

A future local preview mutation is permitted only when all conditions are true:

1. An explicit Academy preview-mutation configuration is enabled.
2. Runtime classification is demonstrably non-production.
3. The selected repository is in-memory or local ignored-file storage.
4. No provider, wallet transaction, contract, production database or external side effect is reachable.
5. The response declares `mock/preview`, `local-only`, `non-authoritative` and `non-executing` semantics.
6. Tests prove default denial and fail-closed behavior for invalid or missing configuration.

Current implementation status: `ENFORCED_FOR_REGISTERED_ACADEMY_POST_ROUTES`. The Academy POST routes now fail closed by default and require explicit local preview gating plus non-production runtime checks. This does not count as production authority and does not remove the remaining L4 blockers.

Local preview mutation must never:

- sign or request a transaction signature;
- mint, issue, verify, claim, transfer or settle anything;
- create payment or reward entitlement;
- call a provider or production API;
- write to a production database;
- modify treasury, billing, settlement or payout state;
- establish cross-nucleus permission or governance authority.

## Compatibility Scaffold Rule

The following are non-authoritative regardless of apparent completeness:

- wallet-authenticated routes and JWTs;
- contract source, ABIs and contract tests;
- deployment scripts and network configuration;
- readiness endpoints and OpenAPI descriptions;
- Postgres placeholders and repository interfaces;
- provider, upload, signed-URL and pointer modules;
- mock records, dashboards and UI status labels.

Scaffolds may count only as evidence that a boundary is isolated, disabled and tested fail-closed. They never count as functional execution authority, production readiness, D-Level evidence or permission to open a gate.

## Learner-Facing Semantic Rules

Sprint 02 must replace authority-adjacent learner models with explicit preview models. Learner-facing fixtures, services, API responses and UI must not imply:

- claimability, claiming, minting or issuance;
- verification status, verification URL or proof hash;
- wallet distribution, token balance or transferability;
- NFT, SBT, on-chain, transaction or contract ownership;
- payment, settlement, payout or monetary value.

Learner-facing dashboard and certificate preview surfaces must additionally:

- remain read-only or preview-only;
- avoid contract-readiness metadata;
- use persistent `mock-local`, `preview-only`, `non-authoritative`, `not-issued` and `non-monetary-preview` labels where appropriate.

Negative static checks must cover the prohibited identifiers defined by ACADEMY-REQ-07. Exceptions are limited to blocklists, negative tests, security documentation and reviewed compatibility-scaffold allowlists.

## Evidence and Promotion Rules

- Validation is command-specific; a narrow pass cannot support a broader claim.
- Incomplete, timed-out, skipped or environment-blocked checks are not passes.
- L4 Consolidated requires implemented boundaries, passing negative checks, required validation and reconciled documentation.
- L-Level never grants D-Level.
- Production remains blocked regardless of L-Level.
- Security, maturity and promotion review require `gpt-5.5 + Extra high`.

## Change Control

Any request that touches operational gates, security boundaries, credentials, rewards, wallet/signing, treasury, billing, settlement, payouts, production APIs/databases, provider execution, cross-nucleus authority or governance must:

1. use at least `gpt-5.5 + High`;
2. state the affected gate explicitly;
3. preserve default-deny behavior;
4. update baseline, blockers, validation and handoff evidence;
5. stop without implementation if new authority would be required.
