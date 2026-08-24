# Claude Migration Readiness — Current State as of 2026-08-24

## Purpose and authority

This document supersedes the **environment-state conclusions** in `CLAUDE_HANDOVER_DIAGNOSIS.md` where the repository has changed after its 2026-08-21 dry run. It does not weaken the diagnosis's research, data-boundary, security, or no-fabrication standards. If two instructions conflict, use the stricter rule and record the conflict.

The migration target is only `YongWilliam-ai/equity-insight-hub-v3`. Do not modify the original Manus-hosted Equity Insight Hub.

## What changed after the historical dry run

The active root page is now `WeekendAug24Full.tsx`, selected by `App.tsx` unless the query contains `date=2026-08-21`. The public 24 August page contains a full six-path structure: Overview, U.S., Hong Kong, Cross-market, This Week, and Sources. It has complete TW/CN/EN interface controls, distinct Education and Analysis reading modes, an internal-research disclosure, a BIT Blue app mark plus black wordmark, a 1D/5D/20D U.S. sector heatmap, SVG export, and a public history entry for the full 21 August report.

The old diagnosis correctly found an unguarded `hk.intraday_snapshot` access in the **legacy** `V3PreviewAug21.tsx` component. That component still exists on the legacy `/archive/2026-08-21` route, so the null guard remains a real technical debt item. It is not the current root page, but a scheduled workflow must not treat it as a safe reusable template until it is fixed or retired.

## Current schedule blockers

| ID | State | Why it blocks a safe schedule | Required resolution and evidence |
|---|---|---|---|
| R1 — active page is date-pinned | **Blocking** | `WeekendAug24Full.tsx` imports `data/2026-08-24/*` directly and its U.S. analytics import remains pinned to `data/2026-08-21/*`. New daily JSON cannot update the public page without editing React code. | Refactor to a single generated current-report pointer/module and dated content payload. Prove a second fixture changes the root date, prose, charts and export filename with no page-component edits. |
| R2 — legacy HK intraday null safety | **Blocking for reuse of the V3 preview path** | `V3PreviewAug21.tsx` assumes `hk.intraday_snapshot` exists although the schema permits omission whenever HK is closed. | Render an explicit “HK not open at cutoff; no intraday snapshot” state when absent, then add an automated fixture test with the field omitted. |
| R3 — scheduled GitHub identity | **Blocking** | GitHub push worked in the current Manus session, but this does not prove the future Claude scheduled environment has write scope for both `main` and `gh-pages`. | In Claude's actual scheduled environment, run a non-destructive authenticated remote probe before enabling deployment. Provision credentials through the environment secret/authorized-source mechanism only. Never place a token in the prompt, repository, manifest or upload. |
| R4 — production-static hygiene | **High priority** | The current source still contains a dev-only `/manus-storage` favicon reference, an unsubstituted analytics placeholder, and the Manus runtime plugin. These can create production 404/console noise and make the static output less portable. | Replace favicon with a repository asset, conditionally remove/replace analytics, and remove the Manus runtime dependency before declaring the handoff self-contained. Build and inspect `dist/public` after the change. |
| R5 — complete data-driven localisation | **High priority** | Current 24 August copy was manually localised inside the component. A daily schedule needs date-specific TW/CN/EN content in data, not hardcoded JSX. | Store all visible daily content in the dated payload; pass a full three-language audit on a new fixture. |
| R6 — source-access policy | **Blocking for any required licensed source** | The historical dry run received Reuters 403. It is unacceptable to infer article bodies from snippets. | Provide authorised access, or formally adopt the documented Tier 1 + accessible Tier 2 fallback and reflect the lower confidence in the source ledger and report. |
| R7 — reproducible breadth inputs | **High priority** | Historical analytics referenced sandbox-local paths that are not portable. | Run the repo-relative breadth scripts, retain raw inputs or permitted provenance in the dated directory, and make the run manifest point to repository-relative artefacts. |

## Mandatory exit gates before a live schedule

1. **Dynamic current-report architecture:** R1 is resolved and a current-report pointer drives the root page; historical pages still load.
2. **Closed-market Hong Kong test:** R2 is resolved and an intraday-absent fixture passes rendered-route testing, not only schema/type/build checks.
3. **Scheduled-environment deployment test:** R3 is proven in Claude's own scheduled environment without committing a credential.
4. **Source policy:** R6 is explicitly confirmed. Every source in the test report is fully read within its permitted access model or is marked unavailable.
5. **Fresh fixture test:** Claude creates a new dated fixture, validates all three languages and every path, exercises neutral heatmap colour, verifies SVG export, and confirms no U.S./HK mixing.
6. **Supervised first live run:** Claude completes one live, source-audited report with a human review before enabling unattended publication.

Until all six gates pass, Claude may perform research, write a draft, update a branch or produce a `NOT_DEPLOYED` run manifest, but must not claim the public site is current or create an unattended publish schedule.

## Required daily tool capability map

Claude should use the available capability that performs each action below. Exact product-specific tool names may differ; the control objective does not.

| Stage | Required capability | Required behavior |
|---|---|---|
| Preflight | Clock, filesystem, Git | Determine Asia/Hong_Kong runtime; clone/pull repository; inspect prior report, thesis and manifest; verify clean or explain an existing diff. |
| User material | File/document and browser reader | Fully extract supplied text, tables, charts, captions and accessible article bodies before external research. Treat user material as leads until independently verified. |
| External research | Browser/search plus official-source navigation | Discover leads, then read primary / reputable source pages. Search snippets are never evidence. Record URL, access time, source tier, market and what the source supports. |
| Data gathering | Approved market-data / official-source tools | Establish completed U.S. and HK session cutoffs independently. Use an HKT timestamp for any HK intraday snapshot. |
| Analysis | Structured writing and data editing | Separate fact, attributed reported context, interpretation, assumption and unresolved claim. Write one-to-three real driver chains, not a news dump. |
| Website update | Code editor, JSON validation and local browser | Update dated data plus the current-report pointer; verify all markets and languages. Do not change brand architecture casually. |
| Visual/functional QA | Browser evaluation and screenshots | Check text localisation, no completed/intraday mixing, heatmap direction semantics, source links, reading-mode difference, logo/font loading, history entry and export behavior. |
| Release | Git plus public-page browser verification | Commit source only after tests pass, deploy static output, wait for propagation, then test the cache-busted public URL. Record commit SHAs and status in the manifest. |

## Non-negotiable research language

Use **Research Summary / 研究摘要**, not a named personal opinion block, for the current internal BIT release. The source/disclosure section must continue to state that the content is AI-assisted research, not approved client communication or promotional material, not personalised investment advice, and not a buy/sell/short instruction or return guarantee.
