# Academy On-chain Boundaries

Status: Contract hardening boundary

---

# Off-chain Responsibilities

Keep off-chain:
- lesson watch state
- lesson completion drafts
- quiz answers
- quiz attempt details beyond committed proof summaries
- analytics
- UI state
- session state
- tutoring state
- ACS review drafts
- recommendation logic
- reputation calculations before governance approval

These states are high-volume, mutable, privacy-sensitive, or educational rather than accounting-critical.

---

# On-chain Responsibilities

Move on-chain only when governance approves:
- reward release proofs
- proof hash replay protection
- LockedNeuronsVault balances
- policy-capped PoK validation records
- certification proof anchors
- governance eligibility checkpoints
- reward accounting integrity

---

# Current Contracts

## LockedNeuronsVault

Purpose:
- non-transferable internal Locked $NEURONS accounting
- issuer-controlled credits
- issuer-controlled internal utility spend

Explicitly absent:
- ERC-20 transfer
- withdrawal
- swap
- external trade

## PoKMinter

Purpose:
- validates PoK proof summaries under active course policy
- rejects duplicate student/course validation
- rejects proof hash replay
- enforces reward caps
- credits LockedNeuronsVault for approved locked rewards
- emits unlocked reward qualification without transferring tokens

Explicitly absent:
- educational state storage
- quiz answer storage
- reputation logic
- frontend logic
- treasury policy calculation

---

# Production Gates

Before production execution:
- Solidity unit tests must cover replay, double validation, permissions and reward caps.
- Governance must approve validators.
- Treasury must approve emission envelopes.
- Contract addresses must be configured through environment variables only.
- Frontend must remain read-only for contract state until write flow review is complete.
