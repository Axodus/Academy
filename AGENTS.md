# Repository Guidelines

## Project Structure & Module Organization

`src/` contains the TypeScript application: React UI entry points live in `main.tsx` and `App.tsx`, Fastify composition is in `serverApp.ts`, and HTTP handlers are in `src/routes/`. Keep Academy features under `src/modules/academy/` (`components/`, `pages/`, `services/`, `types/`, and `utils/`). Shared services, repositories, libraries, and ABI JSON live in their respective `src/` folders. Solidity contracts are in `contracts/`; deployment and policy checks are in `scripts/`. Put unit tests in `tests/*.test.ts` and browser smoke coverage in `tests/e2e/`. Treat `.instructions/` as the source for architecture, security, workflow, and project-state guidance.

## Build, Test, and Development Commands

Use Node 20+ and Yarn 1 as declared in `package.json`.

- `yarn dev` runs Vite and the API watcher together.
- `yarn build` builds the web bundle and type-compiles the API into `dist/`.
- `yarn typecheck` runs strict TypeScript checking; run it for all TypeScript changes.
- `yarn lint` checks JavaScript, JSX, and module scripts with ESLint.
- `yarn test --run` runs Vitest unit tests once; `yarn test:e2e --project=desktop` runs Playwright smoke tests.
- `yarn compile` and `yarn test:contracts` validate Hardhat contracts.
- `yarn check:academy-authority` enforces Academy authority-language policy.

## Coding Style & Naming Conventions

Use ES modules, two-space indentation, semicolons, and strict TypeScript. Name React components and their files in PascalCase (for example, `CourseCard.tsx`); use camelCase for functions, variables, hooks, routes, and services. Keep business rules in Academy services rather than page components. Prefix intentionally unused JavaScript arguments with `_` to satisfy ESLint.

## Testing Guidelines

Add focused Vitest coverage beside the relevant behavior using `describe` and `it` names that state the expected outcome. Exercise changed learner flows in `tests/e2e/academy-smoke.spec.ts` when UI behavior changes. Run the narrowest relevant test while iterating, then run the matching CI checks before opening a pull request. No coverage percentage is enforced; meaningful behavior coverage is expected.

## Commit, Pull Request, and Boundary Guidance

Use concise, imperative commit subjects such as `Add course progress validation`. Keep pull requests scoped, explain user-visible or API changes, list validation commands and outcomes, link the relevant issue when one exists, and attach screenshots for UI changes.

Before Academy changes, read `.instructions/ACADEMY_EXECUTION_BOUNDARY.md`, `STATUS.md`, `BLOCKER_REGISTER.md`, and `HANDOFF.md`. Academy behavior remains non-production and preview-oriented: do not introduce wallet signing, payment, reward execution, credential issuance, provider execution, or contract-write paths without an explicit authority-sensitive request. Reconcile the related `.instructions/` records when architecture or authority changes.

## AXODUS_WORKSPACE_COORDINATION

This workspace is part of the federated Axodus portfolio. Read the root
[`AGENTS.md`](../AGENTS.md) and the
[Agent Coordination Protocol](../.instructions/AGENT_COORDINATION_PROTOCOL.md) before starting work.

Keep this file's local rules authoritative for this repository. For every
completed or materially blocked task, provide the required **Global Coordination
Handoff**: workspace, scope, local status, validation, local records changed,
dependencies, blockers or risks, priority impact, requested portfolio action,
and preserved boundaries.

Update this repository's existing local status, roadmap, task, validation,
blocker, or report records when the authorized task requires it. Do not edit
root portfolio records directly; the root Axodus orchestrator consolidates
validated handoffs into global status, priorities, blockers, dependencies, and
reports.
