# Axodus Academy — CMS API (on-chain)

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
