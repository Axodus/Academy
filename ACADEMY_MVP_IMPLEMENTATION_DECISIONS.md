# Academy MVP Implementation Decisions

Version: 0.1
Status: Approved for mock frontend MVP implementation

---

# Core Decision

The Academy MVP is implemented as a frontend-first, mock-only nucleus.

The MVP preserves the constitutional role of Academy as the Proof-of-Knowledge-based, governance-controlled `$NEURONS` distribution and qualification layer of Axodus.

No real token minting, reward withdrawal, certification contract, NFT credential issuance, or smart contract write is enabled in this phase.

---

# Reward Naming

The canonical reward token label is:

`$NEURONS`

The MVP must not use legacy reward abbreviations.

Reward classes are:

- `Locked $NEURONS`
- `Unlocked $NEURONS`

---

# Reward Model

## Free Course -> Locked $NEURONS

Locked rewards are mock internal balances.

They are:

- non-withdrawable
- non-transferable
- non-swappable
- usable for vouchers
- usable for NFTs
- usable for marketplace purchases
- usable for internal services
- usable for licenses
- usable for internal benefits
- usable for voting utilities

## Paid Course -> Unlocked $NEURONS

Unlocked rewards are mock future wallet-compatible rewards.

They may unlock through:

- progress milestones
- course completion
- certification completion
- Proof of Knowledge review
- governance approval
- treasury budget availability

Future direct wallet distribution requires governance and treasury approval.

---

# Future Contract Compatibility

The MVP includes mock read-model metadata for future contracts:

- `PoKMinter`
- `LockedNeuronsVault`
- `RewardPolicy`
- `TreasuryEmissionBudget`

These entities are present for frontend compatibility only.

Contract writes are disabled.

---

# Progress Engine

The `/progress` route is the central Academy progression surface.

It must show:

- user level
- trust score
- Locked $NEURONS
- Unlocked $NEURONS
- completed courses
- certifications
- next unlocks
- ACS eligibility
- Marketplace eligibility
- PoK readiness
- constitutional standing

---

# Governance Review Naming

The governance review route is:

`/academy-governance-review`

The page label is:

`Academy Governance Review`

Avoid using `legacy governance-validation phrasing` because it may imply direct user governance validation.
