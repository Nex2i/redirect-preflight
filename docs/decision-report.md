# Redirect Preflight decision report

Research date: October 3, 2026. Decision: **bounded validation MVP**, commercial confidence low. Research generated100 distinct buyer/task hypotheses, broadly screened all, deepened19 and challenged five finalists through an independent skeptic. A private full catalog and methods note are retained in the founder's research workspace. Desk research does not establish willingness to pay, accessible buyers, support burden or repeat purchase. No outreach occurred.

## Selected task and evidence
Small web agency project lead receives a proposed literal redirect CSV before staging is configured. Supply old_url/new_url/status and optional source inventory; receive row-specific conflicts, duplicates, cycles, chains, invalid records and missing inventory coverage, then a reviewed mapping export. No crawler, AI or integration needed. Input/output is a concrete accepted artifact, but small-agency purchasing is an inference.

[Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) separates URL mapping from implementation and verification. [WVSOM's 2026 website procurement](https://www.wvhepc.edu/wp-content/uploads/2026/03/Website-RFP-032026.pdf), section4.2.2.10.1, separately calls for a reviewed map and later staging/crawl deliverables. This supports task existence; the large procurement does not validate a small-agency tool budget. We only implement the map preflight.

Strong overlap: [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/tutorials/audit-redirects/) already audits live redirects, exports chains/loops, and offers free500URL crawling; [FAQ pricing](https://www.screamingfrog.co.uk/seo-spider/faq/) states £199/year, with region-specific currency conversions. Not all advanced reports/configuration are free. [Redirect Mapper](https://redirectmapper.com/generator) generates downloadable URL maps free100; its signed-in1000/1500 limit is inconsistent on the page. A spreadsheet plus local script is an inferred inexpensive substitute. No claim that competitors lack offline lint: that remains an evidence gate.

## Comparative decision
Weights frozen before research: pain20%, access20%, operating fit20%, differentiation15%, founder fit15%, repeat10%. Unknown distribution normalized to1/5 and preserved as unknown in the catalog. Scores are ordinal, not success probabilities. Orchestrator adopts conservative skeptic assessments for finalists rather than averaging enthusiasm:

|Finalist|Pain|Access|Operations|Difference|Fit|Repeat|Weighted|Why not selected|
|---|---:|---:|---:|---:|---:|---:|---:|---|
|Redirect preflight|3|1|4|2|4|2|2.70|Selected for bounded objective artifact; commercial tie with agency pack|
|Agency change-order pack|3|1|3|2|4|3|2.60|Scope and relationship judgment; template substitute|
|AP duplicate review|3|1|2|2|4|3|2.40|Accounting trust, CSV privacy, native duplicate checks|
|Keyed CSV reconciliation|2|1|3|1|4|3|2.25|Native joins, broad commoditized buyer segment|
|ICS calendar preflight|2|1|3|1|3|2|2.05|Free validator and complex recurrence/timezone interpretation|

[Teamwork](https://www.teamwork.com/pricing/) has free five-user/project tooling and annual Basics$9.99/user/month, strong upstream overlap with agency workflows. [Intuit duplicate checks](https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-receipts/find-duplicate-transaction-numbers/L6pADBBUJ_US_en_US) support native number review. [Power Query](https://learn.microsoft.com/en-us/power-query/merge-queries-overview) provides keyed joins and [Diffchecker](https://www.diffchecker.com/pricing/) offers free CSV comparison plus$15/user/month desktop tier. [iCalendar validator](https://icalendar.org/validator.html) handles file/text/URL syntax checks up to512KB. Features establish supply, not an opening.

Original four-candidate freeze was explicitly extended with CSV reconciliation when its deeper brief arrived; criteria stayed fixed. Independent domain researchers favored agency pack and redirect respectively. Skeptic finds redirect≈agency commercial tie. Narrow, testable implementation and lower interpretation burden separate this build decision. Increasing repeat weight or demonstrating agency-owner access can reverse it. A one-point operations downgrade makes the winner lose. No exact weighted precision should imply confidence.

## Billing decision
One-time **$19USD project pass /30days**, up to5000mapping records/run. Free100mapping runs include full results and exports. Test-mode only, no real charge. Project pass enables repeated correction without per-run charges. Subscription rejected for episodic purchase; credits rejected for extra accounting and unclear unit; per-run rejected because it discourages corrections; permanent license rejected because continuing maintenance lacks funding. Price and30-day period are hypotheses (skeptic proposed seven-day reruns; we extended to30days to accommodate migration iteration, no evidence of preference).

Confirmed Stripe payment is authoritative, not return URL. Signed browser cookie binds session/project. Verified webhooks and status polling share idempotent fulfillment. Unpaid, cancelled, expired, refunded/disputed or wrong-product/amount/currency/live sessions cannot unlock. Stripe metadata records entitlement expiration, independent of process restart. No app database, user account or stored URL input. Public/synthetic inputs only. One browser-bound pass is a disposable-demo compromise; recovery, multi-device accounts and real receipts are release gaps.

## Business loops and operating scenarios
Value: map draft → checks → user reviews explanations → corrected handoff → next migration project. Improvement: separately consented synthetic/redacted edge cases → deterministic fixtures → fewer errors; no model training or silent customer-data retention. Acquisition: useful public sample/checklist → qualified agency trial → paid project. This channel is unproven; referrals are not assumed.

Illustrative assumptions, not forecasts: variable payment allowance3%+$0.30=$0.87/pass; compute<$0.01/pass unmeasured; AI and paid labor$0; infrastructure planning allowance$15/month after durable launch (current disposable demo uses existing free-compatible capacity). Initial build time excluded from steady-state.

|Scenario|Passes/month|Gross|Cash remainder before tax/labor|Weekly work assumption|
|---|---:|---:|---:|---|
|Bad|2|$38|$21.26|5h selling/support yields poor labor return|
|Modest|20|$380|$347.60|0.5h maintenance+0.5support+0.25onboarding+2selling+0.5exceptions=3.75h|
|Higher|60|$1140|$1062.80 with$25hosting|15min support/project=3.46h +fixed3.25h=6.71h, fails allowance|

No CAC assumption invented; selling time is included and may grow. Five-hour fit is conditional, not measured. Founder labor must be valued separately; cash margin is not economic profit.

## Validation gates and kill conditions
Next authorized commercial experiment would recruit five qualified agencies with exact-match maps and inventories; offer$19/project, require three real paid projects, setup≤5minutes, median founder support≤15minutes, demonstrated useful exceptions versus their usual tools, and two later repeat buyers within60days. No contacts were made in this run. Stop if five suitable buyers decline, free tools are equally convenient, most value requires crawling/wildcards/custom normalization, or operations exceed5h/week. Buying intent, input compatibility, willingness to share public/redacted data and support time remain missing evidence.

## Architecture and release boundary
Separate React/TypeScript Netlify frontend and Fastify/TypeScript Render free API. No retained URL input, external URL fetching, AI API, shared database or employer resources. CSV parser and literal URL graph rules preserve query, path case and trailing slash semantics; wildcard/regex/live checks excluded. Server enforces free/paid limits and exact request origin. Checkout draft retention is opt-in sessionStorage; Clear removes it. Secret keys server-only. Optional PostHog disabled absent a dedicated project token.

The template's universal auth/email/customer persistence release gate is **not met**. This is an anonymous disposable validation demo, not ready for real customer accounts or live commerce. We deliberately avoid a second expiring free Postgres or shared template data because this task needs no stored inputs. Durable customer launch requires account/recovery decisions, monitoring, budget, any necessary persistence/backup, payment policy and buyer validation. The separate claimable Stripe sandbox expiresOctober10,2026 if unclaimed.

## Methods and verification
Two independent scopes produced50ideas each,19deeper screens, and one skeptic reviewed five finalists. Main verified critical Google/procurement/competitor pages and normalized scores.100IDs/names unique; buyer/task/output semantic deduplication reviewed. Most catalog rows are hypotheses with explicit manual/DIY substitutes, not100validated markets. Stripe Directory was tried first using current temporary CLI1.53.0/plugin0.3.5 and rejected the user agent; official-web fallback disclosed. Full commercial uncertainty remains.

Actual repository/deployment links, CI checks, browser/payment exercises and remaining gaps are recorded in docs/verification.md. Founder manual review remains pending until real feedback.
