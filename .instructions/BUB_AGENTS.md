# BUB_AGENTS.md

Operational guidance for using bub-agents inside the Academy workspace.

All recommendations must comply with `ACADEMY_EXECUTION_BOUNDARY.md`. Agents may analyze compatibility scaffolds but must not treat them as authority evidence.

## Purpose

Bub-agents are advisory execution-support agents for planning, architecture review, security review, QA, documentation, and implementation analysis. They do not override the latest user instruction, this workspace `.instructions`, repository reality, security constraints, or Axodus architecture principles.

The Coding Execution Agent remains responsible for final decisions, edits, validation, commit, and report.

## Workspace Context

Workspace: `Academy`

Repository root: `/mnt/d/Rede/Github/Axodus/Academy`

Primary responsibility: courses, modules, lessons, progress, quizzes, Proof of Knowledge, certificates, rewards eligibility, and learning access.

## When To Use Bub-Agents

Use bub-agents for multi-file changes, architecture decisions, course/progress model changes, entitlement or access behavior, reward eligibility, API/service behavior, test planning, documentation updates, or sprint-level execution.

Do not use bub-agents for typo fixes, simple text changes, trivial imports, isolated formatting, or obvious one-line fixes.

## Roles

- Planner: task decomposition, affected files, execution order, risks, acceptance criteria.
- Architect: module boundaries, learning data flow, Core/ACS/Governance compatibility.
- Backend: services, routes, validation, persistence, errors.
- Frontend: pages, layouts, learning states, progress UI, accessibility.
- Web3: reward and claim boundaries, read-only vs execution separation.
- Security: access guards, entitlement checks, secrets, unsafe assumptions.
- QA: course progress, quizzes, certificates, regression and edge cases.
- Documentation: `.instructions`, README, decisions, workflow, readiness notes.

## Delegation Template

```md
# Bub-Agent Task
Role:
Workspace: Academy
Repository: /mnt/d/Rede/Github/Axodus/Academy
Task:
Relevant context:
Expected output:
- findings
- risks
- affected files
- recommended steps
- acceptance criteria
Constraints:
- Follow workspace `.instructions`.
- Keep learning, access, and rewards eligibility separated.
- Mark uncertainty clearly.
```

## Workspace-Specific Rules

- Course progress, quiz completion, certificates, and rewards eligibility must be separate concepts.
- Rewards are non-monetary previews under EPIC-01. Real claim execution requires a separate approved authority request and is not an Academy implementation fallback.
- Learning access should remain compatible with Marketplace entitlements and ACS policy.
- Do not infer Governance approval, ACS access, or reward execution from UI state alone.
- Proof of Knowledge flows must be auditable and testable.
- Avoid hardcoded course, wallet, reward, or production contract assumptions.
- User-facing learning state must distinguish planned, mock, read-only, and implemented behavior.

## Conflict Resolution

Resolve conflicts in this order: latest user instruction, workspace `.instructions`, repository architecture, security requirements, smallest safe change, maintainability, bub-agent recommendation.

If unresolved, stop and report the blocker.

## Final Report

State whether bub-agents were used, roles used, key findings, accepted recommendations, rejected recommendations, tests run, and remaining risks.

## Commit Behavior

When a sprint is completed, run practical validation, check `git status`, commit the completed sprint, and report the commit hash.

Recommended commit format: `academy: <short description>`
