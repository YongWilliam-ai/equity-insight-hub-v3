# BIT Material Alignment Status

## Scope of this V3 release

This independent V3 release preserves the complete 21 August 2026 research record and adds portable analytical exhibits. It does **not** claim that its present visual system is an official BIT design implementation.

## Materials used now

| Material | Use in this release | Rationale |
|---|---|---|
| Existing Equity Insight research presentation | Information hierarchy, source-aware research rhythm, US/HK separation, and readable analytical exhibits | This was the only accessible visual/content baseline available in the repository. |
| Existing verified 21 August research record | Complete three-language market facts, thesis, stock evidence, Today’s Watch, sources, and disclosure | V3 treats this as locked content rather than rewriting or shortening it. |

## Official BIT materials not used yet

| Requested material | Status | Required next step |
|---|---|---|
| BIT material-pool workbook | Not available in the task uploads | Provide the workbook or an export with accessible linked files. |
| BIT UED Design System | Not available | Provide design tokens, component references, or an accessible link. |
| Brand Visual Guidelines | Not available | Provide Chinese and/or English files; any conflict will be documented before use. |
| BIT Visual Asset Handbook | Not available | Provide the handbook and approved asset files. |
| Official BIT logo and fonts | Not available | Provide export-ready logo assets and technically usable font files or fallback rules. |

## Deliberate design limits

The release avoids inventing or approximating an official BIT logo, font, or colour system. It also avoids marketing-heavy cover treatments, crypto-style effects, animated tickers, and decorative dashboards. When official materials become available, map their tokens and components into `client/src/index.css` and the portable React components without changing locked research content.
