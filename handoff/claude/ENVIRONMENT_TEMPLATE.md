# Environment Template

The deployment platform blocks committing or editing `.env` and `.env.example` from this workspace. This is intentional: no secret value belongs in the repository.

When Claude is moved to its execution environment, create a local untracked `.env.example` or configure the platform secret manager with **names only** below. The actual `.env` must remain ignored and local.

```dotenv
# Optional public-data fallback; use only a company-approved provider.
MARKET_DATA_API_KEY=

# Optional permitted company research / licensed-data integration.
COMPANY_RESEARCH_API_KEY=

# Required only for an environment that directly pushes repository / Pages changes.
GITHUB_TOKEN=
```

Do not include API keys, company logins, Browser profiles, cookies, Bloomberg credentials, or any other secret in prompts, logs, manifests, reports, JSON, or Git commits.
