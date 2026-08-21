# Website Update Guide

## Data flow

```text
Research log + source audit
        ↓
data/YYYY-MM-DD/{us_market,hk_market,thesis,sources,market_analytics}.json
        ↓
reports/YYYY-MM-DD.md + run_manifest.json
        ↓
V3 five market paths + static build + GitHub Pages
```

The static site currently imports the historical data model for its initial demonstration. Before production daily automation, refactor the date selection in the page into one explicit current-date import or generated module. Do not replace historical directories. New runs must add a dated directory and update a single `current_report.json` pointer or generated `client/src/data/current.ts` file; this prevents today’s facts from overwriting history.

## Five reading paths

| Path | Must contain | Must not contain |
|---|---|---|
| Overview | 30–60 second thesis, clear U.S./HK entry points, only evidenced cross-market statement. | A compressed duplicate of every article or unverified causality. |
| U.S. | Completed U.S. close, macro driver, stocks, sector interpretation, U.S. validation, U.S. exhibits. | HSI prices, HK earnings diary, claims about HK breadth. |
| Hong Kong | Completed HK close, separately timestamped intraday snapshot, HKEX/company evidence, HK validation. | U.S. closing indices presented as HK data, scheduled earnings stated as results. |
| Cross-Market | Specific transmission chain and status. | Generic global-market commentary or duplicated market recaps. |
| Sources | Grouped source ledger, limitations, disclosure. | Hidden or unsupported citations. |

## Language and URLs

Language and market selection are separate. Preserve `?market=<overview|us|hk|cross|sources>&lang=<TW|CN|EN>`. Switching language must change every visible UI label and content block; switching market must preserve the active language.

## Charts and heatmap

The breadth chart and sector heatmap are **U.S.-only** exhibits. Heatmap return semantics are independent from the BIT brand palette:

| Return band | Direction color |
|---|---|
| Strongly positive | Dark green / teal |
| Modestly positive | Light green / teal |
| Near zero | Neutral grey |
| Modestly negative | Light coral |
| Strongly negative | Orange-red to deep red |

BIT Blue remains a structural UI color for controls, dividers, and selected navigation. Do not use blue as a positive-return color.
