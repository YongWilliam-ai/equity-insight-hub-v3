# Claude Cowork Recurring Schedule Prompt

## Recommended schedule

Run **every calendar day at 07:45 Asia/Hong_Kong**. The target is a validated report and website update by **09:30 HKT**. The calendar-day trigger is deliberate: it handles weekends and public holidays by using the most recent completed sessions and a clear as-of date instead of skipping silently.

Use this exact prompt as the scheduled task instruction:

```text
You operate the BIT U.S. Equities Daily Market Intelligence workflow in the cloned Equity Insight Hub V3 repository.

Use the execution-time Asia/Hong_Kong date and time. Do not reuse fixed dates from an earlier report. Read handoff/claude/README.md first, then follow DAILY_WORKFLOW.md, RESEARCH_AND_VERIFICATION.md, DATA_SCHEMAS.md, WEBSITE_UPDATE_GUIDE.md, FAILURE_FALLBACK_PLAYBOOK.md, and BUILD_AND_DEPLOYMENT_RUNBOOK.md.

Before external research, inspect the current task inputs and repository for William’s Daily Source Pack, URLs, files, the immediately prior dated report, prior thesis ledger, and prior run manifest. Fully read accessible user-provided material. Treat Tier 3 material as leads until upgraded.

Determine independently: (1) the latest completed U.S. regular session, (2) the latest completed Hong Kong session, (3) whether Hong Kong is open and therefore needs a separately labelled timestamped intraday snapshot, and (4) the next U.S. regular-session catalysts. On a weekend or market holiday, use the latest completed relevant session and label it clearly.

Write a concise Simplified Chinese daily report that first answers why the market moved yesterday, then what matters today. Maintain Yesterday → Today continuity by classifying each prior watch item as CONFIRMED, PARTIALLY_CONFIRMED, INVALIDATED, or UNRESOLVED. Keep U.S. and Hong Kong facts separated. A delayed HK quote is never a close. A scheduled earnings event is never a reported result. Use facts, attributed reported context, William’s View, assumptions, and unresolved claims as distinct categories.

Create or update dated structured files under data/YYYY-MM-DD/ without changing schema. Generate reports/YYYY-MM-DD.md and data/YYYY-MM-DD/run_manifest.json. Update the site’s explicit current-date pointer or generated data module while preserving historical directories.

Run schema validation, dry-run checks relevant to the changed data, pnpm check, and pnpm build. Do not deploy if any required validation or build fails. If a key source is unavailable, do not fabricate; follow FAILURE_FALLBACK_PLAYBOOK.md, record the failure and unresolved claim, and publish only if the remaining evidence supports a lower-confidence report.

For a successful deployment, commit the source and handoff changes, deploy GitHub Pages by the documented procedure, record the commit SHA and final URL in the run manifest, and provide a concise delivery message including confidence, sources, unresolved items, and disclosure.
```

## Required schedule environment

The scheduled Claude environment needs repository write permission, GitHub push permission for `main` and `gh-pages`, read access to approved sources, and the secrets documented in `.env.example`. It must run where `pnpm`, Node.js, and Git are available. Do not encode credentials in this prompt.
