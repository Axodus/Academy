# Academy Workflow

## Required Sequence

1. Read `ACADEMY_EXECUTION_BOUNDARY.md`, `STATUS.md`, `BLOCKER_REGISTER.md` and `HANDOFF.md`.
2. Add the required Codex configuration block to the request.
3. Classify every touched surface as read-only, local preview, compatibility scaffold or prohibited authority.
4. Define evidence and negative tests before implementation.
5. Implement only within the approved request scope.
6. Run command-specific validation and record terminal results.
7. Reconcile status, blockers, decisions and handoff without promoting maturity from partial evidence.

## Change Classification

### Read-only/local domain changes

May use `gpt-5.4` when bounded to schemas, fixtures, deterministic resolvers and tests with no authority-sensitive dependency.

### Authority-sensitive changes

Must use at least `gpt-5.5 + High` when touching operational gates, permissions, credentials, rewards, wallet/signing, treasury, billing, settlement, payouts, production APIs/databases, providers, cross-nucleus authority or governance.

### Security and maturity decisions

Must use `gpt-5.5 + Extra high`.

## Mutation Workflow

Local preview mutation is forbidden until the preview mutation contract in `ACADEMY_EXECUTION_BOUNDARY.md` is implemented and tested. Authentication alone never enables mutation.

Once implemented, preview mutation must remain explicit, non-production, local-only, non-authoritative, non-executing and fail-closed.

## Validation Workflow

- Run the exact commands required by the request.
- Record exit code, test counts, warnings, failures, skips and timeouts.
- Do not convert a component pass into an aggregate pass.
- Do not convert scaffold tests into authority evidence.
- Do not hide or soften failures.

## Documentation Workflow

Any architecture or authority change must reconcile:

- `ARCHITECTURE.md`;
- `SECURITY.md`;
- `DECISIONS.md`;
- `TASKS.md`;
- `ROADMAP.md`;
- `STATUS.md`;
- `BLOCKER_REGISTER.md`;
- `VALIDATION.md`;
- `HANDOFF.md`.

The canonical execution boundary may be strengthened only through an explicit authority-sensitive request. It must never be weakened implicitly.
