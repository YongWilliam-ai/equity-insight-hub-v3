# Acceptance Tests

The Claude Cowork handoff is accepted only when every relevant item passes.

## Repository and build

- [ ] Repository clones cleanly.
- [ ] `pnpm install --frozen-lockfile` succeeds.
- [ ] `pnpm validate:data data/YYYY-MM-DD` passes for current data.
- [ ] `pnpm dry-run:claude` passes for the 2026-08-21 fixture.
- [ ] `pnpm check` passes.
- [ ] `pnpm build` passes.
- [ ] Static GitHub Pages build deploys reproducibly from `dist/public`.

## Product paths and language

- [ ] TW, CN, and EN show translated visible labels and content.
- [ ] Overview, U.S., HK, Cross-Market, and Sources routes all render.
- [ ] `market` and `lang` are independent and shareable URL state.
- [ ] U.S. path contains completed U.S. data and U.S.-only exhibits.
- [ ] HK path separates completed close from timestamped intraday snapshot.
- [ ] Cross-Market contains only evidenced transmission and marked uncertainty.
- [ ] Source page preserves grouped provenance, confidence, and limitations.

## Data and research integrity

- [ ] No U.S. / HK session mixing.
- [ ] Prior thesis statuses can be loaded and audited.
- [ ] Every daily core schema validates.
- [ ] A run manifest can be created.
- [ ] A scheduled prompt uses the runtime date, not a hard-coded report date.
- [ ] Missing source data produces an unresolved / lower-confidence state rather than fabrication.
- [ ] Research log distinguishes fact, reported context, William’s View, assumption, and unresolved item.

## Visual and interaction integrity

- [ ] Positive heatmap cells are green / teal.
- [ ] Negative heatmap cells are red.
- [ ] Near-zero cells are neutral grey.
- [ ] BIT Blue is used for UI / brand structure, not positive return semantics.
- [ ] PNG export remains functional for U.S. analytical exhibits.
- [ ] Official logo and local font assets load in the Pages build.

## Security and handoff integrity

- [ ] No credentials, cookies, tokens, or private keys are committed.
- [ ] External files manifest is current.
- [ ] Failure / fallback procedure is present.
- [ ] Build / deployment procedure is present and commands are repository-specific.
- [ ] Brand material status and heatmap exception are documented.
