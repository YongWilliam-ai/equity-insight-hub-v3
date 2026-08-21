# Equity Insight Hub V3 — Claude Cowork Handoff

This directory is the operating manual for maintaining `YongWilliam-ai/equity-insight-hub-v3` after it leaves Manus. It is deliberately self-contained: Claude should not rely on prior chat history, hidden agent memory, browser cookies, unpublished files, or an assumption that a source was read.

## Read in this order

| Order | File | Purpose |
|---:|---|---|
| 1 | `CONTEXT_FOR_CLAUDE.md` | Current product state, boundaries, and what Claude must do next. |
| 2 | `DAILY_WORKFLOW.md` | The dynamic-date daily research and publication procedure. |
| 3 | `RESEARCH_AND_VERIFICATION.md` | Source hierarchy, fact/judgment separation, and conflict handling. |
| 4 | `DATA_SCHEMAS.md` | Stable daily data contracts. |
| 5 | `CLAUDE_SCHEDULE_PROMPT.md` | Exact recurring-task prompt and recommended run time. |
| 6 | `WEBSITE_UPDATE_GUIDE.md` | How JSON becomes the five market reading paths. |
| 7 | `FAILURE_FALLBACK_PLAYBOOK.md` | What to do when sources, data, tests, or deployment fail. |
| 8 | `BUILD_AND_DEPLOYMENT_RUNBOOK.md` | Reproducible local checks and GitHub Pages deployment. |
| 9 | `CLAUDE_FIRST_RUN_TEST.md` and `ACCEPTANCE_TESTS.md` | Dry run and go/no-go tests. |

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
