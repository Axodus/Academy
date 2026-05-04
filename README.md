# Axodus Academy — CMS API (on-chain)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/cd50ef59f2b34d2fada3eefc4d7d02c6)](https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
---
Fastify + Ethers v6 + Greenfield scaffold implementing EIP-712 auth, uploads, pointer registry and signed URLs.

## Quickstart

```bash
pnpm i   # or npm i / yarn
cp .env.example .env
pnpm dev
```

## Endpoints

- `POST /auth/nonce`
- `POST /auth/verify`
- `POST /upload`
- `POST /upload/commit`
- `POST /pointers`
- `GET  /pointers/:wallet`
- `POST /signed-url`
- `GET  /healthz`
- `GET  /metrics`

See `src/` for implementation.
