# External Files Manifest

## Already inside the GitHub repository after clone

| Asset | Location | Purpose |
|---|---|---|
| Current historical research data | `data/2026-08-21/` | Schema example and dry-run fixture. |
| Historical report | `reports/2026-08-21.md` | Writing and source-traceability example. |
| BIT logos and Matrixport Pro fonts | `client/public/brand/` | Current UI branding. |
| UED / brand status record | `docs/bit-materials-status.md` | What was adopted and why. |
| Claude handoff documents | `handoff/claude/` | Operating system for daily work. |

## Must be manually supplied to Claude or its execution environment

| File / access | Required? | Why | Contains secrets? | Safe to commit? |
|---|---:|---|---:|---:|
| Approved source access or entitlement instructions (e.g., Bloomberg / paid publisher) | Only if company expects use | Allows licensed sources to be used lawfully and audibly. | May involve credentials | No credentials in repo. |
| Current Daily Source Pack, mentor requirements, morning brief, or internal research input | Yes when provided for a run | These are per-run inputs and must be read before external research. | Possibly internal | Commit only if approved and not confidential. |
| Compliance-approved external-facing template / disclosure wording | Recommended | Keeps reports and website within approved wording. | No | Yes if approved for repository. |
| Current corporate source list / approved provider matrix | Recommended | Clarifies what the company is allowed to use and cite. | No | Yes if non-confidential. |
| GitHub write credential / deployment permission | Yes for publishing | Enables push to `main` and `gh-pages`. | Yes | Never. |
| Optional public data API key | Optional | For a chosen provider if public endpoints are insufficient. | Yes | Never. |

The BIT brand workbook, official logo assets, UED material, fonts, and Visual Asset Handbook used by the current V3 are already committed as necessary deployable assets or documented status. Do not add company Drive cookies, account passwords, browser profiles, or API tokens.
