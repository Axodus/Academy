# Academy Security

## Security Objective

Protect educational integrity while preventing mock/local features and compatibility scaffolds from being interpreted or reused as production, financial, credential, wallet, contract or governance authority.

The mandatory controls are defined in `ACADEMY_EXECUTION_BOUNDARY.md`.

## Critical Controls

### Default deny

- Mutations fail closed unless an explicit non-production preview gate is implemented and enabled.
- Missing, invalid or ambiguous configuration denies mutation.
- No fallback may select a production database or provider.
- `AcademyRuntimeBoundary` metadata alone never authorizes POST behavior.

### Domain isolation

- Progress, assessment, certificate preview and reward preview remain separate.
- Authentication does not grant learner entitlement or execution authority.
- Contract/provider modules cannot be reached from mock learner services.

### Credential safety

Learner-facing surfaces may show preview eligibility and preview presentation only. They must not assert issuance, verification, proof, ownership, chain anchoring or transferability.

### Reward safety

Learner-facing surfaces may show non-monetary preview points only. They must not assert token amounts, balances, claimability, wallet distribution, transfer, settlement, payout or treasury backing.

### Compatibility scaffolds

Contracts, ABIs, deployment scripts, wallet-authenticated routes, readiness endpoints and persistence placeholders must be isolated, documented as non-authoritative and tested only for boundary behavior.

## Current REQ-05 Enforcement Status

- Registered Academy POST routes are fail-closed by default.
- Local preview mutation is enabled only when the runtime is non-production and `ACADEMY_LOCAL_PREVIEW_MUTATION=true`.
- Responses remain labeled `mock-local`, `preview-only`, `non-authoritative` and `production: false`.
- No provider, wallet signing, contract write, payment, treasury, settlement or production persistence path is opened by REQ-05.
- Repository-wide negative static checks remain deferred; current protection is limited to Academy learner-flow tests plus the route/UI changes delivered in REQ-05.

## Mandatory Negative Checks

ACADEMY-REQ-07 must fail on prohibited identifiers or authority labels in learner-facing models, fixtures, services, API responses and UI, including:

```txt
claimable
claimed
minted
issued
issuanceDate
proofHash
verificationUrl
verificationStatus
walletDistribution
tokenBalance
transferable
sbt
nft
onChain
txHash
contractAddress
```

Exceptions are limited to explicit blocklists, negative tests, security documentation and reviewed compatibility-scaffold allowlists.

## Review Requirements

Security, maturity, promotion and production-risk review require `gpt-5.5 + Extra high`.

A review must verify:

- runtime gates fail closed;
- no production side effect is reachable;
- no authority is inferred from UI or scaffold state;
- validation evidence is complete and current;
- L-Level and D-Level remain separate;
- all production-sensitive gates remain closed.
