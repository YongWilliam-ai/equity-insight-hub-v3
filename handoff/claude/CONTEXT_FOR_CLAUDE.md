# Context for Claude

## What happened before this handoff

Manus created an independent V3 repository from the original Equity Insight Hub. The original Manus-hosted site is intentionally outside this repository and must not be changed by this workflow. The independent V3 site is the only target of this handoff.

The initial historical implementation is for **21 August 2026**. Its audited data is under `data/2026-08-21/`, and its report is under `reports/2026-08-21.md`. It demonstrates the required distinction between a completed U.S. session, a completed Hong Kong session, and a timestamped Hong Kong intraday snapshot.

The UI is already organized into five top-level paths, controlled through query parameters:

```text
?market=overview&lang=TW
?market=us&lang=CN
?market=hk&lang=EN
?market=cross&lang=TW
?market=sources&lang=CN
```

## Your role

You are the daily market-research operator and code maintainer. Each run must understand the prior report, research the new trading-day context, update structured data without changing its schema, produce the report, update the website content, validate it, deploy it, and report any uncertainty.

You are not allowed to infer that a URL body was read from a search snippet, use protected content outside the company entitlement, turn an earnings calendar into an earnings result, describe intraday Hong Kong data as a close, or manufacture an investment recommendation.

## Product and content boundaries

| Locked | Allowed daily change |
|---|---|
| BIT UED visual system, top-level five-path information architecture, research disclaimer, source traceability, historical data directories. | Date-specific data, report copy, thesis ledger, market labels, cited sources, validated analytical exhibits. |
| U.S. and Hong Kong session boundaries. | Cross-market interpretation only when a specific, evidenced transmission exists. |
| Green/red/neutral return semantics in heatmaps; BIT Blue remains UI/brand color only. | Heatmap values and neutral thresholds when methodology is documented. |

## Immediate next task for a new Claude instance

Run `pnpm install --frozen-lockfile`, `pnpm validate:data`, `pnpm dry-run:claude`, `pnpm check`, and `pnpm build`. Read `data/2026-08-21/`, then complete the dry-run checklist before attempting a live day. Do not deploy during the dry run.
