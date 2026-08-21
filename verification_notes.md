# Verification Notes

## Desktop, 1440 × 1000

The redesigned desktop page renders with a persistent dark-green research book spine, visible Equity / Insight brand mark and wordmark, a brass data-cut marker in the hero, vertical filing-system signal tabs, an asymmetric signal-desk layout, and a more explicit audit-trail closing section. The desktop reading flow follows the intended conclusion-before-evidence sequence.

## Mobile, 390 × 844

The mobile layout removes the fixed spine in favour of a compact navigation trigger, keeps the research headline legible, stacks the market snapshot and research sections cleanly, converts the vertical signal tabs to compact index controls, and preserves the searchable signal list and detail drawer in a single-column flow.

## Technical checks

TypeScript check completed successfully after the final layout change. Generated asset URLs are referenced directly from persistent project storage. This is a static, source-backed presentation of the 2026-08-17 U.S. market brief and does not claim real-time market data.

## Full-page language integrity verification

Three discrete verification rounds were completed for the multilingual correction. The structural audit confirmed that navigation, hero content, signal cards, pre-market tables, source notes and footer disclosures are driven by the active language pack rather than residual hard-coded copy. The lexical audit confirmed that the Traditional Chinese pack contains no flagged simplified-only characters, the Simplified Chinese pack contains no flagged traditional-only characters, and the English pack contains no Chinese characters. The coverage audit confirmed that each language includes ten signal entries, four pre-market rows and all major page sections.

Visual verification was then captured for `?lang=TW`, `?lang=CN` and `?lang=EN`. The views show a fully Chinese Traditional interface, a fully Chinese Simplified interface and a fully English interface respectively, including the header research-edition label, navigation, hero, market sections, signal desk, pre-market area, source labels and footer. Language is also shareable through the `lang` URL parameter.

## Readability and breadth-chart refinement

The desktop screenshots for `?lang=TW` and `?lang=CN` confirm that the file-index controls now use normal horizontal text rather than rotated vertical glyphs. The categories remain visually similar to a research binder but are readable in their natural writing direction. The breadth module now presents a normalised stacked-participation chart for NYSE and Nasdaq, a gold/coral legend, average declining participation, volume participation versus the 20-day average, energy-sector confirmation, individual ratio readouts, and source/normalisation notes. Values are derived from the cited 17 August Reuters breadth ratios and volume figures.

## 19 August BIT Daily Market Intelligence

Desktop visual verification confirms that the new 19 August Simplified Chinese BIT page is the primary landing page, with a persistent EQUITY / INSIGHT research spine, dated section index, thesis-led hero, clearly separated fact and interpretation blocks, a source-and-limitations panel, and a visible link to the 18 August archive. The archive route retains the prior full research layout and now shares the EQUITY / INSIGHT identity. The new page presents only the 19 August verified data set; its limitation note explicitly states that the requested prior-day DOCX was not present and that the local Version 2 master is a disclosed temporary frame of reference.

The mobile BIT report was also captured in a 390 × 844 viewport. Its report hierarchy remains legible without the desktop spine, and the page maintains the thesis, 60-second brief, market dashboard, company notes, event watch and source limitations in a readable single column. The final TypeScript check completed successfully after the unified brand and archive changes.

## DOCX-backed 19 August revision and visual review

The uploaded prior-day DOCX is now the reference point for the 19 August page’s explicit thesis audit. The completed visual review confirmed that the 19 August landing page shows the audit result, verified U.S. and Hong Kong close data, source limits and the preserved 18 August archive. The subsequent brand pass applies a single ink-green / Ledger Brass double-line research mark across current and archive pages, adds a brass Ledger Rule to section headings, and converts summary and event blocks into numbered evidence clippings rather than generic cards.

The post-revision desktop capture confirms that no purple, pink or gradient brand mark remains on the 19 August landing page or the 18 August archive. Both pages present the same pure ink-green and Ledger Brass research mark, a visible left research spine, brass section markers and source-forward report structure. The 19 August page retains its explicit DOCX-backed audit, while the archive remains a separate historical record.
