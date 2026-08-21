# Daily Market Intelligence Workflow

## Clock, dates, and deadline

Use the execution-time `Asia/Hong_Kong` date and time. Do not inherit a fixed date from an earlier report. Start at **07:45 HKT every calendar day** and target a completed, reviewed output by **09:30 HKT**. A calendar-day schedule allows weekends and holidays to produce a clearly labelled as-of update using the latest completed relevant sessions.

At the beginning of every run, determine the following independently:

| Layer | Required decision |
|---|---|
| U.S. | Most recent **completed** U.S. regular trading session, including close data and post-close items. |
| Hong Kong | Most recent **completed** Hong Kong session. |
| HK intraday | Include only if Hong Kong is open. Record HKT timestamp, delayed/live status, provider, and `must_not_be_called_close: true`. |
| Next U.S. session | Upcoming pre-market catalysts, earnings, data, or policy events. |
| Holidays/weekends | Use the latest completed relevant session and write the as-of date explicitly. |

## Required sequence

1. **Load continuity.** Read the immediately preceding report, its `thesis.json`, `run_manifest.json`, and website data. List every prior `Today’s Watch` item and classify it as `CONFIRMED`, `PARTIALLY_CONFIRMED`, `INVALIDATED`, or `UNRESOLVED`.
2. **Read William’s material first.** Inspect the current task inputs for a Daily Source Pack, pasted text, URL, spreadsheet, PDF, DOCX, screenshot, or mentor requirement. Extract accessible contents fully. Treat these as leads until independently verified.
3. **Research and timestamp.** Gather source material in the hierarchy in `RESEARCH_AND_VERIFICATION.md`. Keep completed closes, post-close updates, pre-market catalysts, and Hong Kong intraday observations separate.
4. **Build the driver chain.** Select one to three genuine drivers: `macro driver → rates / inflation / liquidity / earnings → sector impact → stock reaction → breadth / positioning → cross-asset confirmation`. Omit irrelevant checklists.
5. **Form the thesis.** Answer: *Why did the market move yesterday?* Then answer: *What must be watched today?* A cross-market link may be written only when a concrete shared variable and relevant price or fundamental evidence exist.
6. **Write the report.** Produce one concise Simplified Chinese five-minute main report. Keep facts, reported context, William’s View, assumptions, confidence, and unresolved items visibly separate.
7. **Update structured data.** Create or update data files according to `DATA_SCHEMAS.md`; never alter a schema merely to fit a one-off narrative.
8. **Update the website.** Follow `WEBSITE_UPDATE_GUIDE.md`. U.S. materials remain in U.S.; HK facts remain in HK; U.S.-only charts cannot be repurposed as Hong Kong market breadth.
9. **Validate and deploy.** Run all required checks. If build, source verification, or deployment fails, stop and apply `FAILURE_FALLBACK_PLAYBOOK.md`.
10. **Write the manifest.** Save `data/YYYY-MM-DD/run_manifest.json` before declaring the run complete.

## Content requirements

### U.S. Market path

Present the completed U.S. close, only price-action-relevant macro variables, selected individual stocks, defensible sector read-through, Today’s Validation, and U.S.-only exhibits. For every selected stock answer: what happened, why it matters, price reaction, what the reaction means, and what verifies it next.

### Hong Kong Market path

Present: `HK Thesis → Session Status → Market Evidence → Earnings / Company Evidence → Today’s Validation`. Place completed close and intraday snapshot in separate cards. An HKEX board-meeting diary is **Scheduled** and not **Reported** until an actual filing and market reaction are retrieved.

### Overview and Cross-Market paths

Overview is a 30–60 second reading layer only. Cross-Market is not a second news feed. Use it only to state evidenced transmission such as higher U.S. long yields affecting duration-sensitive valuation. Mark a connection `UNRESOLVED` rather than forcing causality.

## Required report disclaimer

Use an AI-assisted research disclosure and the equivalent of: `This is research and analysis only, not personalized financial advice.` Do not state or imply that any stock is certain to profit, or issue a direct buy, sell, or short instruction.
