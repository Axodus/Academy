# Academy Roadmap

Status: Prototype-ready mock nucleus
Current progress: ~90%

---

# Completed Prototype Scope

- Student-side course ownership through `/academy/my-courses`.
- Private enrolled course detail through `/academy/my-courses/:courseId`.
- Learning workspace through `/academy/learn/:courseId/lessons/:lessonId`.
- Mock lesson completion action.
- Quiz lock/unlock state based on required lesson completion.
- Mock PoK score validation against passing thresholds.
- Reward gates for lesson, module, quiz, and certification stages.
- Free courses generate `Locked $NEURONS`.
- Paid courses generate `Unlocked $NEURONS`.
- Progress Engine separates content, lesson, validation, certification, and reward progress.
- Academy Governance Review remains mock-only and treasury-aware.
- Wallet-authenticated Academy API readiness routes exist.
- Local JSON persistence supports integration testing for lesson completion and quiz attempts.
- `PoKMinter` and `LockedNeuronsVault` contract scaffolds exist without production token execution.

---

# Current Prototype Priorities

- Preserve Academy as sovereign cognitive formation infrastructure, not a generic LMS.
- Keep rewards capability-oriented and anti-farming.
- Make PoK validation visually more important than passive content consumption.
- Keep all contract, treasury, minting, withdrawal, transfer, and certification issuance behavior disabled.

---

# Remaining Production Gaps

- Persistent lesson completion and quiz attempts.
- Backend progression telemetry.
- ACS orchestration for tutoring, review, and escalation.
- Real certification issuance and proof hashes.
- Treasury execution and reward emission budgets.
- Smart contract adapters for `PoKMinter`, `LockedNeuronsVault`, `RewardPolicy`, and `TreasuryEmissionBudget`.
- TypeScript-aware ESLint coverage once versioned `@typescript-eslint` dependencies can be added cleanly.
- Production database-backed persistence.
- Contract test suite and audited deployment procedure.

---

# Next Milestone

Move from prototype-ready mock nucleus to persisted alpha by introducing a backend progression API, durable quiz attempts, and read-only governance/treasury adapters before any reward execution is enabled.
