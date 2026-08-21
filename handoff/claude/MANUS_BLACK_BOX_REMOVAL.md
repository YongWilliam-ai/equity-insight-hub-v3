# Manus Black-Box Removal Record

The following behavior was previously implicit in the Manus task context. It is now explicit and repository-portable.

| Previously implicit / platform-dependent behavior | Portable replacement |
|---|---|
| Agent knew to use current Hong Kong date rather than prompt dates. | `DAILY_WORKFLOW.md` and `CLAUDE_SCHEDULE_PROMPT.md`. |
| Agent remembered yesterday’s thesis and watch items. | Previous dated `thesis.json`, `run_manifest.json`, report, and `RESEARCH_LOG_TEMPLATE.md`. |
| Agent knew source priority and article-reading rules. | `RESEARCH_AND_VERIFICATION.md`. |
| Agent knew that HK intraday cannot be called close. | `DATA_SCHEMAS.md`, `DAILY_WORKFLOW.md`, and acceptance tests. |
| Agent knew U.S. and HK must not be mixed. | `WEBSITE_UPDATE_GUIDE.md` and `ACCEPTANCE_TESTS.md`. |
| Agent remembered the V3 visual system and heatmap exception. | `BRAND_MATERIAL_HANDOFF.md` and UED assets in the repository. |
| Agent knew how to build and publish the Pages site. | `BUILD_AND_DEPLOYMENT_RUNBOOK.md`. |
| Agent knew what to do after source, build, or deployment failure. | `FAILURE_FALLBACK_PLAYBOOK.md`. |
| Agent relied on hidden task outputs and sandbox files. | Date-versioned data, report, log, manifest, schemas, and explicit external-files list. |

The only unavoidable dependencies are company entitlements and secrets: approved premium-source access, data-provider keys where selected, and GitHub credentials. These are documented, not embedded in the repository.
