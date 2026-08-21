# BIT Material Alignment Status

## Scope of this V3 release

This independent V3 release preserves the complete 21 August 2026 research record and adds portable analytical exhibits. Its market content, facts, sources, timestamps, scenarios and disclosures remain locked. Its presentation adopts the relevant light-theme rules from the user-provided BIT Design System and Visual Identity Guidance; it does **not** claim that a research page should use every BIT marketing or product-interface component.

## Materials used now

| Material | Use in this release | Rationale |
|---|---|---|
| Existing Equity Insight research presentation | Information hierarchy, source-aware research rhythm, US/HK separation, and readable analytical exhibits | It remains the content and evidence baseline; it is not treated as an official BIT visual specification. |
| Existing verified 21 August research record | Complete three-language market facts, thesis, stock evidence, Today’s Watch, sources, and disclosure | V3 treats this as locked content rather than rewriting or shortening it. |
| `品牌视觉手册2026V2.pdf` + `VisualIdentityGuidanceV2.pdf` | BIT Blue `#0040FF`, BIT Black `#0A0D14`, BIT White, grey/blue priority, restrained auxiliary-colour rule and visual-background limits | Used to remove the inherited ivory ledger surface and establish the white / black / blue research hierarchy. |
| `【UED8月】BITDesignSystem.zip` | Light-theme token source, `1200px` content width, standard spacing, `8px` compact controls, `12px` cards, `150ms` transform/opacity feedback, state colours, and official component behaviour | Mapped into scoped V3 CSS. Research exhibits use UED light surfaces and controls rather than the inherited editorial-card palette. |
| `BITwithslogan.svg` + UED logo assets | Original official BIT-with-slogan, black-wordmark and blue app-icon SVG assets | Original SVGs are deployed without redrawing. Black wordmark appears on white navigation; blue icon is used in the dark research spine. |
| `Matrixport字体包2025.12.03` + UED `fonts/` | Matrixport Pro Regular, Medium, SemiBold and Bold, including the supplied Chinese coverage | Local font files are deployed with `font-display: swap`; `system-ui` remains the documented device fallback. |
| `BIT-Visual-Asset-Handbook-v3_1_1-Complete.md` | High-key / dark campaign imagery, material allocation and composition rules | Read and retained for future approved hero or cover imagery. It is intentionally not applied to research cards, charts or data surfaces. |

## Official BIT materials intentionally not applied to this research page

| Requested material | Status | Required next step |
|---|---|---|
| Weekly Market Watch light skill | Available | Suitable for a future market-report cover or weekly KV, but excluded from a data-led daily research surface. |
| 3D glass / cobalt-chrome product imagery | Available through the Visual Asset Handbook | The handbook reserves it for brand KV, hero or marketing material. It would dilute analytical readability in a daily evidence page. |
| Long-document illustration skill | Available | Deferred unless a separate client-facing one-pager is commissioned. |

## Deliberate design limits

The release does not invent or approximate the official BIT logo. It uses the supplied Matrixport Pro files and the documented `system-ui` fallback for native Chinese rendering. It avoids marketing-heavy 3D/glass effects, animated tickers and decorative dashboards because the official handbook positions those treatments for visual campaigns rather than data-dense research. Any future UED component should be added without changing locked research content.
