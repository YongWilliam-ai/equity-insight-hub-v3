# Build and Deployment Runbook

These commands are checked against the repository’s current `package.json` and `vite.config.ts`.

## Install and local development

```bash
git clone https://github.com/YongWilliam-ai/equity-insight-hub-v3.git
cd equity-insight-hub-v3
pnpm install --frozen-lockfile
pnpm dev
```

The Vite application uses the GitHub Pages base path `/equity-insight-hub-v3/`. For local checks, open:

```text
http://localhost:3000/equity-insight-hub-v3/?market=overview&lang=TW
```

## Required pre-deployment checks

```bash
pnpm validate:data data/2026-08-21
pnpm dry-run:claude
pnpm check
pnpm build
```

For a live U.S. sector-breadth refresh, use the **latest completed U.S. session date** rather than today’s calendar date:

```bash
pnpm fetch:breadth -- --as-of YYYY-MM-DD
pnpm analyse:breadth -- --as-of YYYY-MM-DD
pnpm validate:data data/YYYY-MM-DD
```

`pnpm build` emits the static site to `dist/public`. Do not deploy if any command fails.

## Git review and source commit

```bash
git status --short
git add data/YYYY-MM-DD reports/YYYY-MM-DD.md client/src handoff/claude scripts package.json pnpm-lock.yaml
git commit -m "Publish YYYY-MM-DD market intelligence"
git push origin main
```

Review before committing: no `.env`, source credentials, browser profiles, cookies, unapproved documents, or private customer data.

## GitHub Pages deployment

The Pages site is served from the `gh-pages` branch. Build first, then deploy the contents of `dist/public`.

```bash
rm -rf /tmp/equity-insight-hub-v3-pages
mkdir -p /tmp/equity-insight-hub-v3-pages
cp -R dist/public/. /tmp/equity-insight-hub-v3-pages/
cd /tmp/equity-insight-hub-v3-pages
git init
git config user.email "automation@local"
git config user.name "BIT Market Intelligence Automation"
git add .
git commit -m "Deploy YYYY-MM-DD market intelligence"
git branch -M gh-pages
git remote add origin https://github.com/YongWilliam-ai/equity-insight-hub-v3.git
git push -f origin gh-pages
```

Then validate the public page with a cache-busting revision query:

```text
https://yongwilliam-ai.github.io/equity-insight-hub-v3/?v=<main-commit-sha>&market=overview&lang=TW
```

Record `main` commit SHA, Pages deploy outcome, tests, and final URL in the run manifest. A failed Pages push means the site is **not updated**.
