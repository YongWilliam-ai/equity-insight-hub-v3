# Data Schemas and Freshness Contract

Each daily run writes data under `data/YYYY-MM-DD/`. Do not add date-specific fields to these contracts without updating the JSON Schema, website mapping, validation script, and this document in the same commit.

## Common requirements

Every date directory must contain the five core files and a `run_manifest.json`:

```text
data/YYYY-MM-DD/
  us_market.json
  hk_market.json
  thesis.json
  sources.json
  market_analytics.json   # carry forward with explicit as_of if not refreshed
  run_manifest.json
```

| File | Required meaning | Freshness requirement | Primary-source requirement |
|---|---|---|---|
| `us_market.json` | Latest completed U.S. regular session. | Session date must be the actual completed session used. | Index / company / policy claims must be Tier 1 or Tier 2. |
| `hk_market.json` | Latest completed HK session and optional intraday snapshot. | Close must have actual close date; intraday must have HKT cutoff. | HKEX for official diary / filing; market quote provider for index snapshot. |
| `thesis.json` | Yesterday → Today thesis and prior-thesis audit. | `as_of_hkt` is the report cutoff. | Each status needs source-backed evidence. |
| `sources.json` | Auditable source register. | Every source records the run’s access / as-of date in research log. | Tier and access type must be explicit. |
| `market_analytics.json` | U.S.-only breadth and heatmap methodology. | `as_of` states the final adjusted-close date used. | Source and proxy limitation are mandatory. |

The machine-readable JSON Schemas are in `handoff/claude/schemas/`. They protect structure; the research log protects provenance and freshness.

## Field-level interpretation

| File / field | Type | Required | Meaning / example | Source and freshness rule |
|---|---|---:|---|---|
| `us_market.market` | string | Yes | `US` | Must equal `US`. |
| `us_market.session_date` | ISO date | Yes | `2026-08-20` | Latest completed U.S. session. |
| `us_market.completed_session` | boolean | Yes | `true` | Never mark an in-progress U.S. session complete. |
| `us_market.index_returns_pct` | object of number | Yes | `{"S&P 500": -0.87}` | Same close / timestamp basis. |
| `us_market.macro` | object | Yes | 10Y, 30Y, oil context. | Include only variables relevant to price action and preserve data source in research log. |
| `us_market.stock_evidence` | array | Yes | WMT / DE / MRNA evidence. | Each item must have price reaction and fact / event detail. |
| `hk_market.completed_session` | object | Yes | `{"date":"2026-08-20","HSI":25698.49,"change_pct":0.8}` | Completed close only. |
| `hk_market.intraday_snapshot` | object | Optional | Timestamped HSI snapshot. | Require HKT time, `delayed`, and `must_not_be_called_close: true`. Omit when HK is not open. |
| `hk_market.events` | array of string | Yes | HKEX diary names. | Scheduled event only until actual results are sourced. |
| `thesis.previous_thesis_ledger` | array | Yes | Prior thesis status / evidence. | Status is one of `CONFIRMED`, `PARTIALLY_CONFIRMED`, `INVALIDATED`, `UNRESOLVED`. |
| `sources.sources` | array | Yes | Source name, tier-like type, market, confidence, access, URL. | Do not cite an inaccessible body as read. |
| `market_analytics.breadth_definition` | string | Yes | 11 sector ETF positive-return percentage. | Must retain proxy limitation; not A/D breadth. |

## Run manifest

Copy `handoff/claude/templates/daily_run_manifest.json` to `data/YYYY-MM-DD/run_manifest.json` during every run. It is required even when publication fails; in that case, set deployment status to `NOT_DEPLOYED` and state the blocker.
