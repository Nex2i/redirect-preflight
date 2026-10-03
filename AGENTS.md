# Idea-to-MVP agent contract

Ideation includes the billing TODO in `docs/pipeline.md`. Choose and document how customers pay (subscription, credits, pay per use, one-time purchase, or a justified hybrid) in `requirements/mvp.md` before implementation. Include the billable unit, pricing hypothesis, free limits, entitlements, applicable lifecycle/failure/refund rules, and observable tests. Do not assume every MVP uses subscriptions.

Read `requirements/idea.json` and `requirements/mvp.md` before changing the app. If the idea brief still contains placeholders, select the opportunity and complete the requirements from the research report before building domain features. Follow `docs/pipeline.md`: idea selection, the requirement brief, implementation, and demo deployment do not require founder approval. Record assumptions and decisions for review after deployment. If evidence does not support a build, choose and document the appropriate validation experiment or unresolved research gate without inventing demand.

Preserve the selected buyer, trigger, input, accepted output, and measurable acceptance criteria. Keep the first version to one narrow end-to-end task. Implement the domain flow in `apps/web` and `apps/api`, replace the demo waitlist, add only the tables needed, and keep `/health` working. Keep credentials in environment variables. Do not add paid services by default.

Run the requirements validator and build checks. Update `requirements/mvp.md` with the actual API contract, data model, test cases, deployment variables, and manual review steps. Record unresolved buyer or compliance assumptions; do not invent customer validation.

The research stage uses `prompts/commercial-opportunity-research.txt`. Do not run that long research automatically on every code change. Research and code generation require an authorized AI runtime; GitHub Actions CI only validates deterministic work.

Keep this checkout at `~/projects/mvp-ideas/idea-to-mvp-template`. Create each selected idea as a separate sibling checkout at `~/projects/mvp-ideas/<idea-slug>` from the public GitHub template. Do not implement an idea in this template checkout. Use a unique `<idea-slug>.nex2i.com` Netlify domain for each deployed MVP.
