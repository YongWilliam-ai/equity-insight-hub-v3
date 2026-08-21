# BIT Material Alignment Status

## Scope of this V3 release

This independent V3 release preserves the complete 21 August 2026 research record and adds portable analytical exhibits. Its market content, facts, sources, timestamps, scenarios and disclosures remain locked. The presentation now adopts the accessible portions of the official `品牌视觉手册2026V2.pdf`; it does **not** claim complete implementation of every BIT UED component.

## Materials used now

| Material | Use in this release | Rationale |
|---|---|---|
| Existing Equity Insight research presentation | Information hierarchy, source-aware research rhythm, US/HK separation, and readable analytical exhibits | It remains the content and evidence baseline; it is not treated as an official BIT visual specification. |
| Existing verified 21 August research record | Complete three-language market facts, thesis, stock evidence, Today’s Watch, sources, and disclosure | V3 treats this as locked content rather than rewriting or shortening it. |
| `品牌视觉手册2026V2.pdf`, pp. 4, 17–20, 22–25 | BIT Blue `#0040FF`, BIT Black `#0A0D14`, BIT White, grey/blue priority, restrained auxiliary-colour rule, Matrixport Pro / Readex Pro type rule, and supporting-pattern principle | Applied as scoped V3 tokens, with Readex Pro used as the documented restricted-environment fallback. |
| `标志:logo` Drive folder | Official BIT Black/White/Blue logo variants, including `BIT with slogan.svg` and the approved “Bridge Into Tomorrow” variant | Confirmed by direct Drive preview. The file is not embedded until an export is safely available to the deployment environment; V3 does not redraw or approximate it. |

## Official BIT materials not used yet

| Requested material | Status | Required next step |
|---|---|---|
| BIT material-pool workbook | Available and inspected | Its linked materials remain the reference index. |
| BIT UED Design System | Link found, but inaccessible in the available company-browser session | Grant the same Drive account access or export the design-system file. |
| Brand Visual Guidelines | Chinese 2026 V2 guide accessible and used; English guide not yet reviewed | Review the English guide if a language-specific conflict is possible. |
| BIT Visual Asset Handbook | Link found, but inaccessible in the available company-browser session | Grant the same Drive account access or export the handbook. |
| Official BIT logo and fonts | Logo variants are visible in Drive; font file was not exported locally | Provide the approved SVG/PNG export and webfont distribution terms if the original logo or Matrixport Pro is to be embedded. |

## Deliberate design limits

The release does not invent or approximate the official BIT logo, and it does not label a non-official webfont as Matrixport Pro. It uses the explicitly documented Readex Pro restricted-environment fallback. It avoids marketing-heavy 3D/glass effects, animated tickers and decorative dashboards, because the official guide positions metal/glass 3D treatment as a marketing-material option and positions patterns as secondary details. Future UED components should be mapped into `client/src/index.css` and the portable React components without changing locked research content.
