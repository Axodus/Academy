# Academy Architecture

Status: Infrastructure hardening phase

---

# Responsibility Boundaries

## Frontend

Owns:
- navigation and visual state
- student learning workspace UI
- optimistic mock actions
- wallet login initiation
- rendering progress, PoK, reward and certification read models

Does not own:
- authoritative progression state
- PoK approval
- reward accounting
- certification issuance
- governance policy decisions

## Academy API

Owns:
- wallet-authenticated student endpoints
- persistence repository orchestration
- quiz unlock enforcement
- PoK evaluation read model
- reward gate read model
- integrity checks before state changes

Does not own:
- token execution
- treasury execution
- governance authority
- direct UI logic

## Progress Engine

Owns:
- content progress
- lesson completion
- validation progress
- reward unlock progress
- certification eligibility calculations

Must stay deterministic and testable.

## PoK Validation

Owns:
- score threshold evaluation
- approved/retry-required state
- validation requirements for certification and reward gates

Does not own:
- lesson playback
- UI state
- reward percentage definitions
- treasury policy

## Reward Policy

Owns:
- reward gates
- reward percentages
- validation weight
- free/paid reward class separation

Does not own:
- contract accounting
- student lesson state
- UI display rules

## Persistence

Current:
- JSON repository adapter for integration readiness

Target:
- repository interface backed by PostgreSQL, Redis, indexers or chain sync services.

All route code must depend on repository interfaces, not concrete storage assumptions.

## Contracts

Own:
- proof replay prevention
- double validation prevention
- policy-capped reward qualification
- Locked $NEURONS internal accounting

Do not own:
- lesson progress
- quiz answers
- educational analytics
- reputation algorithms
- UI logic

---

# Current Data Flow

```text
Frontend
  -> Academy API
  -> AcademyProgressRepository
  -> JSON adapter
  -> Progress / PoK / Reward Policy services
  -> Contract readiness read models
```

Future production flow:

```text
Frontend
  -> Academy API
  -> Repository interfaces
  -> DB / Redis / indexer adapters
  -> Progress Engine
  -> PoK validation
  -> Reward Policy Engine
  -> contract adapters
  -> Governance / Treasury approval
```

---

# Hardening Rules

- No reward execution from passive content consumption.
- No PoK approval before required lessons are complete.
- No duplicate PoK approval for one student/course.
- No proof hash replay.
- No contract writes from frontend.
- No production addresses invented in code.
- No JSON persistence assumption in route logic.
