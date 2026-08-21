# Failure and Fallback Playbook

| Failure | Required action | Prohibited action |
|---|---|---|
| Source unavailable | Try an approved alternate; for material facts use primary source plus reputable coverage where possible. Log the failed URL and impact. | Pretending the source body was read or filling gaps from snippets. |
| Reuters inaccessible | Use a Tier 1 filing/release plus another reputable Tier 2 outlet where available. | Reconstructing the Reuters article from headline snippets. |
| Yahoo market data unavailable | Use another timestamped public provider or official exchange source; label provider and delay. | Reusing stale value without an as-of label. |
| HKEX unavailable | Keep diary / result claim unresolved. | Inventing a company result or marking Scheduled as Reported. |
| Premium article unavailable | Record title / accessible metadata only and seek authorised company or public alternatives. | Bypassing paywalls or claiming full body access. |
| Data conflict | Preserve both timestamped source records, compare scope and cutoff, and mark unresolved until resolved. | Quietly selecting the more convenient number. |
| No significant market event | Publish lower event-density report focused on session status, thesis status, and upcoming validation. | Manufacturing a narrative or filling with irrelevant macro checklist. |
| Schema validation fails | Fix data or explicitly extend schema in a reviewed commit; then re-run validation. | Changing UI only to hide invalid data. |
| Typecheck or build fails | Stop deployment, diagnose, fix, and record test results. | Publishing a broken output or claiming an update is live. |
| GitHub Pages deployment fails | Leave `deployment_status: NOT_DEPLOYED`, preserve the prior live site, retry with error record. | Claiming website update succeeded. |

Every fallback that changes confidence or report coverage must be visible in `research_log.md`, `run_manifest.json`, and—when material—the reader-facing sources / verification note.
