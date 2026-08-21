# Claude First-Run Test

This is a dry run against the historical **2026-08-21** fixture. It must not research new facts, change data, commit, push, or deploy.

## Steps

1. Clone the repository and install locked dependencies.
2. Read `handoff/claude/README.md` and `CONTEXT_FOR_CLAUDE.md`.
3. Load every file in `data/2026-08-21/` and validate them.
4. Read `reports/2026-08-21.md`; identify the completed U.S. date, completed HK date, HKT intraday cutoff, previous thesis statuses, and source limitation for U.S. breadth.
5. Open each route locally: Overview, U.S., Hong Kong, Cross-Market, and Sources in TW, CN, and EN.
6. Confirm the U.S. heatmap has green positives, neutral grey near zero, and red negatives; confirm the chart does not claim HK breadth.
7. Run `pnpm dry-run:claude`, `pnpm check`, and `pnpm build`.
8. Produce a PASS / FAIL note only. Do not deploy.

## Expected observations

| Check | Expected result |
|---|---|
| U.S. date | 2026-08-20 completed regular session. |
| HK completed close | 2026-08-20. |
| HK intraday snapshot | 2026-08-21 10:56:52 HKT; delayed and never labelled close. |
| Cross-market status | `UNRESOLVED`. |
| Breadth methodology | 11 Select Sector SPDR adjusted-close proxy, not exchange A/D breadth. |
| Current report | 2026-08-21 fixture only; do not treat it as live current data. |

If any expected observation fails, stop before any live task and diagnose from the data, schema, page mapping, and source ledger.
