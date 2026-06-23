# ACADEMY-EPIC-01 - L4 Consolidation

Status: IN PROGRESS

Execution order: Sprint 01 must be accepted before Sprint 02 implementation begins.

Authority contract: `ACADEMY_EXECUTION_BOUNDARY.md`.

## Canonical Safety Posture

```txt
NON_PRODUCTION
MOCK_OR_CONFIG_FIRST
READ_ONLY_OR_PREVIEW_ONLY_WHEN_APPLICABLE
EXECUTION_GATED
TREASURY_GATED
CERTIFICATION_ISSUANCE_GATED
REWARDS_GATED
```

No compatibility scaffold is authority evidence. No validation result means no maturity promotion. L-Level and D-Level remain separate.

## EPIC Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `Extra high`

Justification:

- Risk level: Very high because acceptance affects maturity and production-risk interpretation.
- Complexity: High across documentation, frontend, APIs, persistence, contracts and tests.
- Authority/security impact: Very high because the EPIC touches credentials, rewards, wallet/signing, treasury and promotion semantics.
- Reason for not using a smaller model: Governance and acceptance decisions must not over-promote scaffolds or weaken closed gates.

## Sprint Recommendations

### ACADEMY-SPRINT-01 - Current State and Instruction Alignment

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `High`

Justification:

- Risk level: High.
- Complexity: High across repository inspection and instruction reconciliation.
- Authority/security impact: High because the sprint establishes all operational gates.
- Reason for not using a smaller model: Partial evidence or ambiguous wording could create an unsafe baseline.

### ACADEMY-SPRINT-02 - Educational Domain Foundation

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `Medium`

Justification:

- Risk level: Moderate.
- Complexity: Medium for bounded schemas, fixtures and deterministic services.
- Authority/security impact: Moderate because credential/reward terminology must remain preview-only.
- Reason for not using a smaller model: Domain naming must not blur local preview with real authority.

### ACADEMY-SPRINT-03 - Learner Experience Mock/Local

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `High`

Justification:

- Risk level: Moderate to high.
- Complexity: High across progress, assessment and preview state transitions.
- Authority/security impact: High because learner output is credential-adjacent and reward-adjacent.
- Reason for not using a smaller model: State coupling can accidentally imply entitlement or issuance.

### ACADEMY-SPRINT-04 - Validation and Consolidation

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `Extra high`

Justification:

- Risk level: Very high.
- Complexity: High across negative checks, validation and evidence reconciliation.
- Authority/security impact: Very high because security and promotion conclusions affect governance interpretation.
- Reason for not using a smaller model: The sprint must detect subtle open gates and reject unsupported promotion.

## Request Recommendations

### ACADEMY-REQ-01 - Current State Inspection and Evidence Baseline

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `High`

Justification:

- Risk level: High.
- Complexity: High because repository truth must be reconciled with stale and conflicting evidence.
- Authority/security impact: High because this baseline controls later maturity claims.
- Reason for not using a smaller model: A smaller model may treat scaffolds or partial validation as readiness.

### ACADEMY-REQ-02 - Instruction Normalization and Academy Boundary Contract

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `High`

Justification:

- Risk level: High.
- Complexity: High because multiple operational documents contain conflicting authority language.
- Authority/security impact: High across execution, certification, rewards, wallet/signing and treasury gates.
- Reason for not using a smaller model: Boundary wording must remain fail-closed and unambiguous.

### ACADEMY-REQ-03 - Academy Education Schemas and Fixtures

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `Medium`

Justification:

- Risk level: Moderate.
- Complexity: Medium for bounded schemas, fixtures and validation.
- Authority/security impact: Moderate because certificate/reward names are authority-adjacent.
- Reason for not using a smaller model: Unsafe fields could blur preview data with real identity, credential or reward authority.

### ACADEMY-REQ-04 - Course Catalog and Learning Path Services

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `Medium`

Justification:

- Risk level: Moderate.
- Complexity: Medium for deterministic catalog/path resolution.
- Authority/security impact: Moderate while services remain read-only and local.
- Reason for not using a smaller model: Service boundaries must reject permissions, payments, providers, production APIs and mutations.

### ACADEMY-REQ-05 - Learner Progress, Quiz and Assessment Mock Flow

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `High`

Justification:

- Risk level: Moderate to high.
- Complexity: High across progress, scoring, retries and eligibility transitions.
- Authority/security impact: High because transitions are adjacent to rewards and certificates.
- Reason for not using a smaller model: Coupled state may accidentally create entitlement or credential semantics.

### ACADEMY-REQ-06 - Learner Dashboard and Certificate Preview

#### Recommended Codex Configuration

Recommended model: `gpt-5.4`
Recommended reasoning level: `High`

Justification:

- Risk level: Moderate to high.
- Complexity: Medium to high across models, services, UI and tests.
- Authority/security impact: High because learner-facing previews can imply credential or reward authority.
- Reason for not using a smaller model: Unsafe labels may imply issuance, verification, claims, wallet distribution or NFT/SBT authority.

### ACADEMY-REQ-07 - Validation, Negative Static Checks and Security Gate Review

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `Extra high`

Justification:

- Risk level: High.
- Complexity: High across static checks, runtime gates and complete validation evidence.
- Authority/security impact: Very high because missed findings can create production-risk claims.
- Reason for not using a smaller model: Review must detect unsafe identifiers, open gates, hidden side effects and incomplete evidence.

### ACADEMY-REQ-08 - L4 Consolidation and Handoff

#### Recommended Codex Configuration

Recommended model: `gpt-5.5`
Recommended reasoning level: `Extra high`

Justification:

- Risk level: Very high.
- Complexity: High across the entire EPIC evidence set.
- Authority/security impact: Very high because the result is a maturity and governance decision point.
- Reason for not using a smaller model: Promotion must remain evidence-backed and keep L-Level separate from D-Level.

## Required Request Template

Every future Academy EPIC, Sprint and REQ must include:

```md
## Recommended Codex Configuration

Recommended model: `<MODEL_NAME>`
Recommended reasoning level: `<REASONING_LEVEL>`

Justification:

- Risk level:
- Complexity:
- Authority/security impact:
- Reason for not using a smaller model:
```
