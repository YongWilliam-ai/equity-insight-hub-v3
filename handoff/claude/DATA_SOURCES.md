# Data Sources and Access Matrix

| Category | Default source | Automation status | Entitlement / use rule | Fallback |
|---|---|---|---|---|
| U.S. index close, sector context, market reaction | Reuters plus relevant official releases | Manual research / citation | Public or company entitlement only. | CNBC, FT, WSJ, company IR, SEC / exchange. |
| U.S. Treasury / Fed policy and yields | Treasury, Federal Reserve; timestamped market-data provider | Manual research | Tier 1 for policy; preserve timestamp. | Reuters or another reputable Tier 2 for market reaction. |
| U.S. company result / guidance | Company IR and SEC filing | Manual / source link | Tier 1 preferred. | Reuters / reputable Tier 2; do not infer from social content. |
| Hong Kong filing / board diary | HKEX | Manual research / citation | Tier 1; calendar items are Scheduled only. | Company IR. If unavailable, leave unresolved. |
| Hong Kong index snapshot | Timestamped quote provider | Manual research | Label provider, delay, HKT cutoff, and intraday / close status. | Another timestamped public provider. |
| U.S. breadth and heatmap | Yahoo Finance chart endpoint for 11 Select Sector SPDR ETFs and SPY | Automated optional script | Public fallback; adjusted daily closes. | Approved market-data API; disclose changed methodology. |
| Bloomberg / premium content | Company-approved entitlement only | Optional manual | Use only through actual entitlement; record access type. | Tier 1 + public reputable coverage. |

## Refreshing the U.S. breadth proxy

After determining the latest completed U.S. session date, run:

```bash
pnpm fetch:breadth -- --as-of YYYY-MM-DD
pnpm analyse:breadth -- --as-of YYYY-MM-DD
pnpm validate:data data/YYYY-MM-DD
```

Do not run these scripts against an in-progress U.S. session. They produce a tradable sector-ETF proxy, not exchange advance/decline participation, and may be omitted if a reliable public response is unavailable.
