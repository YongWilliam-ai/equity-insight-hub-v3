# Claude Upload and Provision Checklist

## One-time migration package

Upload **one ZIP file** to Claude, or give Claude authorised clone access to `YongWilliam-ai/equity-insight-hub-v3` and upload the listed addenda. The ZIP should contain the current repository, including `handoff/claude/`, historical `data/` and `reports/`, and the BIT assets already committed under `client/public/brand/`.

Also attach these two documents to Claude's first migration task because they are the most recent audit context:

| Priority | File | Why Claude needs it |
|---:|---|---|
| Required | `CLAUDE_HANDOVER_DIAGNOSIS.md` | Historical dry-run evidence and the original blockers. |
| Required | `pasted_content_10.txt` | The last Claude response/context and its stated stop point. |
| Required | `handoff/claude/CLAUDE_MIGRATION_READINESS_2026-08-24.md` | Current-state reconciliation and schedule exit gates. |
| Required | `handoff/claude/CLAUDE_OPERATING_PROMPT_V2.md` | Fresh-session operating contract and daily tool behaviour. |
| Recommended | Latest public 24 August URLs or screenshots | Lets Claude verify the intended current product, BIT header and internal-research disclosure visually. |

If repository clone access is unavailable, upload the ZIP plus all five files above. Do **not** upload only a page screenshot: Claude needs the source, dated data, tests, scripts, handoff docs and brand assets together.

## Per-run Daily Source Pack

For every daily run, attach only the materials that are new for that run. Claude must read them before external research.

| Send to Claude when available | Required handling |
|---|---|
| Mentor request, editorial focus, daily brief or pasted notes | Treat as a lead; fully read it; do not promote unsupported claims to fact. |
| URLs, PDFs, DOCX, XLSX, screenshots or charts | Extract accessible text, tables, captions and visual evidence. Record inaccessible portions. |
| Previous internal report or explicitly requested thesis review | Classify each watch item as confirmed, partially confirmed, invalidated or unresolved. |
| Compliance-approved disclosure text / style guide | Use it verbatim where it supersedes the repository wording. |
| Approved corporate source/provider matrix | Apply it to source selection and citations. |

## Configure as access or secrets — never as uploaded files

| Need | Correct provision method | Never do this |
|---|---|---|
| GitHub write access for `main` and `gh-pages` | Connect the repository/account or inject a scoped token through Claude's secret mechanism. Test it in the scheduled environment. | Paste a token into Claude chat, prompt, source file, `.env.example`, manifest or Git commit. |
| Licensed sources / Bloomberg / paywalled publishers | Grant authorised account/connector access and document permitted use. | Upload cookies, browser profiles, passwords, exported sessions or licence files. |
| Optional market-data API | Save its key in the environment secret manager and document its provider and coverage. | Paste the key into chat or commit it. |
| Internal BIT data / client material | Use the company-approved secure workspace and access policy. | Put confidential customer data in a public GitHub repository or an unrestricted Claude project. |

## Do not upload

Do not upload passwords, API keys, GitHub tokens, browser cookies, exported sessions, authentication backups, company Drive cookies, private customer data, account screenshots that expose personal information, proprietary licensed research not cleared for Claude, or unrestricted internal databases.

## Decision before scheduling

The recommended sequence is: first give Claude the migration package, then have it complete the controlled refactor and a new-fixture dry run, then verify push access in the scheduled environment, then run one supervised live report, and only then turn on a daily 07:45 HKT recurring task. A schedule before those gates is not a migration; it is an unattended deployment risk.

## Two practical rollout choices

| Approach | Trade-offs | Cost profile | Setup complexity |
|---|---|---|---|
| **Supervised Claude daily run for the first three market days** | Highest confidence: Claude follows the prompt, produces draft artifacts and awaits review before publishing. It delays full automation briefly. | Uses Claude for each run; no additional always-on service. | Moderate: upload package, connect repository and give source access. |
| **Recurring daily Claude task after exit gates** | Most convenient: starts at 07:45 HKT and targets 09:30 HKT. It is safe only after dynamic data flow, visual tests and scheduled-environment GitHub access are proven. | Uses Claude for each daily run. | Higher: requires the same environment access on every fresh scheduled session. |

Use the supervised option first. Move to the recurring task only when the exit-gate record says READY.
