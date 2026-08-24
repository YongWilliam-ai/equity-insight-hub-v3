# Paste This to Claude First

```text
You are taking over the BIT Market Intelligence V3 daily workflow. This is a migration and hardening task, not a request to redesign the product or publish a new market report today.

Repository target: YongWilliam-ai/equity-insight-hub-v3. The original Manus-hosted website is out of scope and must not be changed.

I have attached the current repository/handoff package, CLAUDE_HANDOVER_DIAGNOSIS.md and pasted_content_10.txt. Treat the current repository as the code source of truth, then read these files in this exact order:
1. handoff/claude/CLAUDE_MIGRATION_READINESS_2026-08-24.md
2. handoff/claude/README.md
3. handoff/claude/CLAUDE_OPERATING_PROMPT_V2.md
4. handoff/claude/DAILY_WORKFLOW.md
5. handoff/claude/WEBSITE_UPDATE_GUIDE.md
6. handoff/claude/ACCEPTANCE_TESTS.md
7. CLAUDE_HANDOVER_DIAGNOSIS.md

First, give me a short implementation plan that closes the readiness gates without altering the approved BIT design, historical records, source discipline, or the 24 August report content. The priority order is:
- replace date-pinned current-report imports with one data-driven current-report pointer/module while preserving dated history;
- make optional Hong Kong intraday data safe and add a rendered intraday-absent test;
- move all daily reader-visible TW/CN/EN prose into dated data rather than fixed JSX;
- repair production-static residue only where it affects portability (dev-only favicon, analytics placeholder, Manus runtime);
- make breadth inputs reproducible from repository-relative artefacts;
- verify scheduled-environment GitHub write access without exposing credentials.

Do not create or activate a recurring schedule, deploy a live report, or claim publication success until every exit gate in CLAUDE_MIGRATION_READINESS_2026-08-24.md passes. Do not use protected content without entitlement. Do not infer article bodies from snippets. Do not commit secrets, cookies, browser sessions, API keys, customer data or licensed documents.

You are authorised to edit the V3 repository to close the stated migration/readiness gaps. Work in small, reviewable commits and push approved, tested migration fixes to `main`. For each commit: explain the changed contract, run the relevant schema/type/build/browser tests, show any remaining gaps, and preserve an explicit NOT_DEPLOYED status until public deployment is verified. Do not create or activate an unattended schedule, and do not deploy a live daily report, until the readiness gates pass.
```
