# Academy Certificate Preview Boundary

## Current Capability

Academy may calculate certificate-preview eligibility and render a clearly labeled preview from mock/local learner state.

## Prohibited Authority

Academy EPIC-01 does not authorize:

- certificate or badge issuance;
- credential verification or verification URLs;
- proof hashes, signatures or issuer identity;
- NFT/SBT or on-chain metadata;
- wallet ownership or transferability;
- production learner identity or persistence;
- governance, operational or cross-nucleus qualification.

Completion, assessment success and preview eligibility are separate states. None is a credential.

## Required Model Direction

Sprint 02 must use explicit `CertificatePreview`-style semantics with persistent preview-only labeling and without authoritative credential fields.

See `ACADEMY_EXECUTION_BOUNDARY.md` and `SECURITY.md`.
