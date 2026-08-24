# Equity Insight Hub V3 — Claude Cowork Handoff

This directory is the operating manual for maintaining `YongWilliam-ai/equity-insight-hub-v3` after it leaves Manus. It is deliberately self-contained: Claude should not rely on prior chat history, hidden agent memory, browser cookies, unpublished files, or an assumption that a source was read.

## Read in this order

> **Current migration status:** Read `CLAUDE_MIGRATION_READINESS_2026-08-24.md` first. The historical 2026-08-21 dry run is useful evidence, but it does not authorise a live schedule. The active 24 August page remains date-pinned until the readiness exit gates are closed.

| Order | File | Purpose |
|---:|---|---|
| 1 | `CLAUDE_MIGRATION_READINESS_2026-08-24.md` | Current implementation, schedule blockers, exit gates and tool-capability map. |
| 2 | `CONTEXT_FOR_CLAUDE.md` | Historical product boundaries and the original handoff scope. |
| 3 | `CLAUDE_OPERATING_PROMPT_V2.md` | Fresh-session bootstrap and daily research/publish operating contract. |
| 4 | `DAILY_WORKFLOW.md` | Dynamic-date daily research and publication procedure. |
| 5 | `RESEARCH_AND_VERIFICATION.md` | Source hierarchy, fact/judgment separation and conflict handling. |
| 6 | `DATA_SCHEMAS.md` | Stable daily data contracts. |
| 7 | `WEBSITE_UPDATE_GUIDE.md` | Required current-report pointer and five market reading paths. |
| 8 | `FAILURE_FALLBACK_PLAYBOOK.md` | What to do when sources, data, tests or deployment fail. |
| 9 | `BUILD_AND_DEPLOYMENT_RUNBOOK.md` | Reproducible local checks and GitHub Pages deployment. |
| 10 | `CLAUDE_UPLOAD_AND_PROVISION_CHECKLIST.md` | Uploads, authorised access, prohibited sensitive material and rollout choices. |
| 11 | `CLAUDE_FIRST_RUN_TEST.md` and `ACCEPTANCE_TESTS.md` | Historical fixture dry run and go/no-go checks. |

## Operating principles

> **No black boxes. No hard-coded dates. No silent fabrication. No mixing a completed close with intraday data.**

The site has five reading paths—Overview, U.S. Market, Hong Kong Market, Cross-Market, and Sources. They are one product, but they must not become one mixed market narrative. Use the current runtime date in `Asia/Hong_Kong`, preserve historical dates, and record every run in `data/YYYY-MM-DD/run_manifest.json`.

The current production website is a static GitHub Pages site. It contains no server-side data fetching. Claude must research, verify, update versioned JSON and report files, run checks, then build and deploy static output.

## Required output of every successful daily run

1. A source log and research record with fact/judgment separation.
2. Date-versioned `us_market.json`, `hk_market.json`, `thesis.json`, `sources.json`, and, if U.S. analytics are refreshed, `market_analytics.json`.
3. A concise Simplified Chinese main report under `reports/YYYY-MM-DD.md`.
4. A `run_manifest.json` for auditability.
5. A validated static build and a committed Pages deployment.

If any required source, verification, data boundary, test, or deployment is missing, do not claim the run is complete. Follow `FAILURE_FALLBACK_PLAYBOOK.md`.
