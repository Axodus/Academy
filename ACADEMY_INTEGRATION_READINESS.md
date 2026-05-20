# Academy Integration Readiness

Status: Readiness specification
Execution mode: mock persistence and contract-safe staging

---

# Boundaries

This phase prepares Academy for real integration without enabling production reward execution.

Disabled until governance approval:
- real `$NEURONS` minting
- withdrawals
- transfers
- external token swaps
- real certification issuance
- treasury execution

Enabled in this phase:
- wallet-authenticated API routes
- persisted mock lesson completion
- persisted mock quiz attempts
- PoK validation read model
- reward gate read model
- Solidity contract scaffolding for PoK and Locked $NEURONS accounting
- OpenAPI specification in `academy.openapi.json`
- frontend ABI read models for `PoKMinter` and `LockedNeuronsVault`

---

# Auth Model

Academy API uses wallet login through signed nonces:

- EVM: `personal_sign` validates wallet ownership.
- Solana: wallet `signMessage` validates public key ownership.
- API returns a JWT.
- Student routes require `Authorization: Bearer <jwt>`.

JWT subject is the wallet address or Solana public key.

---

# API Surface

## `POST /auth/nonce`

Creates a login nonce.

Request:

```json
{
  "network": "evm",
  "address": "0x...",
  "chainId": 1
}
```

Response:

```json
{
  "nonce": "uuid",
  "message": "Sign this message to login: ..."
}
```

## `POST /auth/verify`

Verifies wallet signature and returns JWT.

Request:

```json
{
  "network": "evm",
  "address": "0x...",
  "chainId": 1,
  "nonce": "uuid",
  "signature": "0x..."
}
```

Response:

```json
{
  "jwt": "...",
  "user": {
    "id": "0x...",
    "evm": "0x...",
    "sol": null
  }
}
```

## `GET /academy/me`

Returns authenticated identity, mock student profile, persisted lesson completions and quiz attempts.

## `GET /readiness`

Public service readiness endpoint.

Returns:
- service status
- integration-readiness mode
- `contractWritesEnabled: false`
- `rewardExecutionEnabled: false`

## `GET /openapi.json`

Public OpenAPI JSON document for integration consumers.

## `GET /academy/courses/enrolled`

Returns student-side enrolled and purchased course read models.

## `GET /academy/courses/:courseId/progress`

Returns course progress, module/lesson state, PoK state, certification requirements and reward gates.

## `POST /academy/courses/:courseId/lessons/:lessonId/complete`

Persists mock lesson completion for the authenticated wallet.

Rules:
- completion only affects content progress
- completion does not approve PoK
- completion does not unlock main reward gates

## `POST /academy/courses/:courseId/quizzes/:quizId/attempts`

Persists quiz attempt and evaluates mock PoK.

Rules:
- locked until required lessons are completed
- passing threshold approves PoK
- failing threshold returns retry-required
- reward gates are recalculated as a read model

## `GET /academy/courses/:courseId/reward-gates`

Returns reward gate distribution and validation weight.

## `GET /academy/contracts/readiness`

Returns configured contract addresses, ABI function names and safety checks.

Rules:
- does not execute contract writes
- does not require production addresses
- marks missing or invalid addresses as readiness gaps

---

# Persistence

Default persistence is a local JSON file:

```text
.academy-data/progress.json
```

Configured by:

```text
ACADEMY_DATA_FILE
```

This is alpha persistence for integration readiness only. Production should replace it with a database-backed repository.

---

# Contracts

## `LockedNeuronsVault`

Purpose:
- internal-only Locked `$NEURONS` accounting
- no ERC-20 transfer
- no withdrawal
- no swap
- issuer-controlled credit and utility spend

Primary functions:
- `setIssuer(address issuer, bool enabled)`
- `credit(address account, uint256 amount, bytes32 reason)`
- `spend(address account, uint256 amount, bytes32 utility)`
- `available(address account)`
- `balanceOf(address account)`

Frontend ABI:

```text
src/abis/LockedNeuronsVault.json
```

## `PoKMinter`

Purpose:
- records PoK validation outcomes
- enforces course reward policy
- credits `LockedNeuronsVault` only for approved locked rewards
- emits unlocked reward qualification events without transferring tokens
- rejects duplicate validation for the same student/course
- rejects proof hash replay
- allows governance owner to deactivate a course policy

Primary functions:
- `setValidator(address validator, bool enabled)`
- `setCoursePolicy(bytes32 courseId, RewardClass rewardClass, uint256 maxReward, uint16 passingScoreBps, bytes32 policyHash)`
- `setCoursePolicyActive(bytes32 courseId, bool active)`
- `recordValidation(address student, bytes32 courseId, uint16 scoreBps, uint256 rewardAmount, bytes32 proofHash)`

Frontend ABI:

```text
src/abis/PoKMinter.json
```

Production note:
`PoKMinter` is not a production token minter yet. It is a governance-controlled validation and qualification boundary.

---

# Next Production Steps

- Replace JSON persistence with database repository.
- Add API integration tests with signed JWT fixtures.
- Add contract tests for policy limits, failed validations and Locked Vault credits.
- Add deployment scripts per chain without default private keys.
- Add read-only frontend API adapters before enabling writes.
- Add governance approval flow for `PoKMinter` validators and reward policies.
- Add production contract addresses only through environment variables:
  - `ACADEMY_CONTRACT_CHAIN_ID`
  - `ACADEMY_CONTRACT_RPC_URL`
  - `ACADEMY_POK_MINTER_ADDRESS`
  - `ACADEMY_LOCKED_NEURONS_VAULT_ADDRESS`
