# Academy Security

Last updated: 2026-06-24

## Security Objective

Keep Academy mock/local, preview-only and fail-closed while preventing learner UI, API data and compatibility scaffolds from implying production, financial, credential, wallet, provider or contract authority.

The controlling contract is `ACADEMY_EXECUTION_BOUNDARY.md`.

## REQ-07 Enforcement

- `npm run check:academy-authority` scans 49 Academy-relevant source/test files for all 30 required prohibited terms.
- The allowlist is exact by path, term and pattern, includes a rationale, and fails when stale.
- Negative tests require explicit bounded markers; nested or unclosed markers fail.
- Learner fixture compatibility read models were removed rather than broadly allowlisted.
- Registered Academy POST routes remain default-deny.
- Explicit local preview behavior still requires `ACADEMY_LOCAL_PREVIEW_MUTATION=true` and a non-production runtime.
- `AcademyRuntimeBoundary`/boundary metadata and authentication cannot authorize mutation.
- Academy persistence remains fixed to local JSON; the Postgres adapter is a throwing placeholder.
- Provider/write route modules remain absent from `src/serverApp.ts` registration.

## Reviewed Allowlist

| Path/context | Allowed match | Reason |
|---|---|---|
| `src/modules/academy/services/contractReadiness.ts` | exact PoK minter scaffold names | isolated read-only contract readiness; writes fixed disabled |
| `src/serverApp.ts` | `req.jwtVerify()` | route authentication only; no learner or execution authority |
| runtime/type metadata | exact `certificateAuthority: "not-issued"` | explicit denial metadata required by the preview contract |
| Academy tests | corresponding safe-negative/scaffold assertions | verifies the denied/scaffold behavior |
| marked test regions | prohibited literals | negative-test blocklists and failure fixtures only |

No learner-facing page, component, route payload, fixture or normal service behavior is broadly allowlisted.

## Security Gate Review

| Gate | Status | Evidence |
|---|---|---|
| `PRODUCTION_GATE` | CLOSED | Runtime metadata is non-production; no production activation path |
| `EXECUTION_GATE` | GATED | POST default denial plus explicit local preview/non-production checks |
| `TREASURY_GATE` | CLOSED | No financial action path in Academy runtime |
| `REWARDS_GATE` | CLOSED | Non-monetary preview points only |
| `CERTIFICATION_ISSUANCE_GATE` | CLOSED | Eligibility/presentation preview only |
| `ON_CHAIN_ISSUANCE_GATE` | CLOSED | No learner chain path or provider execution |
| `WALLET_SIGNING_GATE` | CLOSED | Authentication compatibility only; no transaction signing |
| `PAYMENT_GATE` | CLOSED | No Academy payment flow |
| `BILLING_GATE` | CLOSED | No Academy billing flow |
| `PAYOUT_GATE` | CLOSED | No Academy payout flow |
| `SETTLEMENT_GATE` | CLOSED | No Academy settlement flow |
| `PROVIDER_EXECUTION_GATE` | CLOSED | Provider route modules are not registered |
| `PRODUCTION_DATABASE_GATE` | CLOSED | Local JSON binding; Postgres adapter throws |
| `REAL_CREDENTIALS_GATE` | CLOSED | Recognition/certificate preview only |
| `ACS_PROVISIONING_GATE` | NOT_AUTHORIZED | UI workflow labels only; no provisioning implementation |
| `CONTRACT_WRITE_GATE` | CLOSED | Readiness reports writes disabled; no runtime write registration |
| `NFT_SBT_MINT_GATE` | CLOSED | No learner model, UI or runtime path |

No deviation was found. Contract source, ABIs, tests, deployment scripts, auth routes and readiness endpoints remain non-authoritative scaffolds.

## Final Security Statement

Academy remains `NON_PRODUCTION`, `MOCK_OR_CONFIG_FIRST` and `READ_ONLY_OR_PREVIEW_ONLY` except for explicitly gated local preview behavior. It has no production, wallet/signing, reward execution, certification issuance, treasury, payment, billing, payout, settlement, provider execution, contract-write or credential-verification authority.
