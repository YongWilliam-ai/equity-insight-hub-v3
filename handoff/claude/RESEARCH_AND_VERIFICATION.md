# Research and Verification Rules

## Evidence hierarchy

| Tier | Use first for | Examples |
|---|---|---|
| Tier 1 | Filings, policy, official schedules, financial results, official releases. | SEC, company IR, HKEX, Federal Reserve, U.S. Treasury, government releases. |
| Tier 2 | Completed-session context, market reaction, reputable reporting, public market data. | Reuters, public Bloomberg where entitled, CNBC, FT, WSJ, Yahoo Finance, Investing.com. |
| Tier 3 | Lead generation and explanatory context only until upgraded. | User-provided broker brief, Futunn, TechFlow, research threads, social posts. |

Major figures, material conclusions, reported earnings, and official schedules need Tier 1 or Tier 2 support where available. Preserve a source URL, source type, access type, access time, timestamp / as-of time, market, confidence, and a short usage note.

## Fact, reported context, and analysis

| Label | Definition | Writing rule |
|---|---|---|
| Fact | A dated value or disclosed statement from an identified source. | State source and timestamp. |
| Reported context | A reputable outlet’s market explanation or consensus description. | Attribute to the outlet; do not convert it into an unqualified fact. |
| William’s View | The analyst’s interpretation of a fact pattern. | Label it as personal observation and name confirmation / invalidation conditions. |
| Assumption | A necessary but unverified operating assumption. | State it explicitly and downgrade confidence. |
| Unresolved | A claim where evidence is incomplete, conflicting, or unavailable. | Keep it visible; do not infer the missing body. |

## Full-reading requirement

When William supplies a URL or document, read accessible title, time, body, tables, charts, captions, numbers, tickers, and quoted statements. A search-result snippet is not an article body. If access remains incomplete, record exactly what is unavailable, request the missing copy or screenshot, and continue only with facts independent of the unavailable material.

## Session and timestamp rules

1. Never combine different timestamps in one “current” number.
2. A delayed Hong Kong quote is an intraday snapshot, never a close.
3. A company on an earnings calendar is a scheduled event, never a reported result.
4. U.S. pre-market catalysts are distinct from prior completed-session facts.
5. A U.S. sector ETF breadth proxy is not NYSE/Nasdaq advance-decline data and not Hong Kong breadth.

## Source conflict procedure

Keep both records when trusted sources conflict. Compare instrument, currency, exchange, corporate-action adjustment, session cutoff, publication time, and data type. Prefer the primary source for the primary fact; do not silently overwrite the conflict. Record the conflict in `unresolved_claims` in the run manifest until resolved.
