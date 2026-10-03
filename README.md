# Nex2i Idea-to-MVP Template

This repository is a reusable, free-tier **demo** stack for taking a researched opportunity toward a working MVP. It combines a research contract, an idea brief, a requirements gate, a React landing page/app on Netlify, a Node API on Render, and Render Postgres. GitHub Actions runs checks in the cloud on each change. See the [template requirements](requirements/template-requirements.md), [hosting comparison](docs/hosting-decision.md), [authentication design](docs/auth-design.md), and [telemetry setup](docs/telemetry.md).

## Flow

The default is autonomous execution for each requested run: select, define, build, verify, and deploy, then inform the founder and provide manual tests. Idea selection and requirements do not need founder approval. See [the pipeline contract](docs/pipeline.md).

1. Run the research stage using [the supplied prompt](prompts/commercial-opportunity-research.txt). Save its report and catalog outside this public repository if they contain private research or customer material.
2. Select the strongest supported opportunity and record the decision level, evidence, alternatives, and assumptions. Complete the pipeline's ideation billing TODO: compare subscriptions, credits, pay per use, and one-time purchase, then select the model and pricing hypothesis. Do not request idea approval.
3. Create a new public Nex2i repository from this template and clone it as `~/projects/mvp-ideas/<idea-slug>`. Fill in its [requirements/idea.json](requirements/idea.json) and [requirements/mvp.md](requirements/mvp.md) with the actual buyer, task, acceptance criteria, and data rules. Do not request requirements approval.
4. Implement the idea-specific behavior in the new checkout using [the implementation prompt](prompts/implement-mvp.md), [AGENTS.md](AGENTS.md), and the requirements. An AI coding run requires an authorized AI service entitlement or API key; hosting free tiers do not include unlimited AI research/code generation.
5. Run `npm test` and `npm run build`, then connect and deploy the new repo using the checked-in hosting configuration and authorized account access. Record the deployed checks and any incomplete requirements.
6. Inform the founder of the decisions, deployed URL, repo, check results, and exact manual test steps. Founder review happens after implementation and demo deployment, before customer use. The free Render database is disposable and expires after 30 days without backups.

The default app is a small working example: a public landing page, a React form, an API health endpoint, and a Postgres-backed waitlist endpoint. Replace the waitlist with the selected opportunity's narrow workflow. **Authentication is specified but not implemented yet**, so do not collect real customer accounts with this scaffold.

## Local run

Use Node 22 or later and a local Postgres database. Set `DATABASE_URL` and `CORS_ORIGIN` for the API (see `apps/api/.env.example`). Vite proxies `/api` to the API locally. From the repo root:

```sh
npm install
npm run dev
```

The web app runs on port 5173, the API on port 10000. The API creates the demo waitlist table on startup.

## Free-tier deployment

1. Publish this repository as a **public** template in Nex2i. Netlify's Free plan does not include private organization repositories.
2. In Render, connect the GitHub repository and create a Blueprint from `render.yaml`. It provisions a Free web service and one Free Postgres database. Set `CORS_ORIGIN` to the final Netlify URL. Render Free allows only one active Free Postgres database per workspace, so a second MVP may need another disposable database arrangement or a paid datastore.
3. In Netlify, import the same public repository. The root `netlify.toml` builds `apps/web`. Set `NETLIFY_PROXY_ORIGIN` to the Render service HTTPS origin **before** the production build, then redeploy. The build generates a same-origin `/api` proxy rule.
4. Add a unique `<idea-slug>.nex2i.com` custom domain to the Netlify site. Use its exact HTTPS origin for `CORS_ORIGIN`, and later for auth configuration. Keep each MVP's auth cookies host-only.
5. Optionally set `VITE_POSTHOG_PROJECT_TOKEN` and `VITE_POSTHOG_HOST` for consent-based PostHog events. These are browser-visible build variables. See [telemetry setup](docs/telemetry.md).
6. Visit the Nex2i subdomain, submit a test email, and check Render logs. Delete test data before inviting real users.

Each new MVP is a separate repository and deployment. The cloud CI is free within [GitHub Actions allowances](https://docs.github.com/en/billing/concepts/product-billing/github-actions); pushing to `main` can trigger automatic Netlify and Render deploys after the two Git connections exist.

## Boundaries

- This is a demo stack, not a durable production data service. Do not put private customer documents or regulated data into the free demo database.
- The research prompt is preserved exactly, but running 100-idea research is a separate agent task. The deterministic GitHub Actions workflow validates/builds code; it does not pretend to perform market research.
- Netlify and Render account authorization, GitHub organization permissions, and any AI API billing must be configured in the respective accounts. No credentials belong in this repository.

## Platform references

- [Netlify pricing](https://www.netlify.com/pricing/) and [monorepo setup](https://docs.netlify.com/build/configure-builds/monorepos/)
- [Render Free limits](https://render.com/docs/free) and [Blueprint configuration](https://render.com/docs/infrastructure-as-code)
- [GitHub repository templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
