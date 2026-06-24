# Academy Roadmap

Last updated: 2026-06-24

All phases are governed by `ACADEMY_EXECUTION_BOUNDARY.md`.

## ACADEMY-SPRINT-01 - Current State and Instruction Alignment

Status: COMPLETE

Delivered the evidence baseline, canonical execution boundary, stale-evidence classification and safe handoff.

## ACADEMY-SPRINT-02 - Educational Domain Foundation

Status: COMPLETE

Delivered strict preview schemas, deterministic validated fixtures, immutable catalog/path read models and non-authoritative reward/certificate preview models.

## ACADEMY-SPRINT-03 - Learner Experience Mock/Local

Status: COMPLETE; `ACADEMY-REQ-05` PASS and `ACADEMY-REQ-06` PASS

Delivered deterministic progress/assessment flow, reward/recognition/certificate-preview separation, fail-closed POST gating, explicit local preview configuration, learner dashboards and cross-device E2E coverage.

## ACADEMY-SPRINT-04 - Validation and Consolidation

Status: COMPLETE; `ACADEMY-REQ-07` PASS and `ACADEMY-REQ-08` PASS

Delivered:

- repository-wide Academy authority scan and reproducible package command;
- explicit path/term/pattern allowlist with stale-entry failure;
- learner fixture and UI cleanup that removes compatibility scaffold leakage;
- current typecheck, lint, unit/API, aggregate build, E2E and contract scaffold evidence;
- security review of all required production-sensitive gates;
- blocker, maturity and handoff reconciliation;
- final `L4_CONSOLIDATED`, `D3+`, `NON_PRODUCTION` conclusion.

## ACADEMY-EPIC-01 Conclusion

Status: COMPLETE_NON_PRODUCTION

`L4_CONSOLIDATED` means the mock/local Academy experience is integrated, validated and security-bounded. It does not authorize production deployment, real rewards, real certification, wallet/signing, payment, treasury, settlement, providers, production persistence or contract writes.

## Future Authority Work

Any production database, provider, contract, credential, reward, payment, treasury, billing, payout, settlement or cross-nucleus work requires a separate approved EPIC and fresh security evidence. None is an automatic next phase of `ACADEMY-EPIC-01`.
