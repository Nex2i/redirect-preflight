# Actual verification — October3,2026

App: https://redirect-preflight.nex2i.com
Repo: https://github.com/Nex2i/redirect-preflight
API: https://redirect-preflight-api.onrender.com
Netlify project05f287bd-6257-4d62-8a8f-7b5d98fa49e9; successful Git build6ac189d8657adb6e9d74c5fa (commitdb7f3366cbea42d4df6affb0ef70df55a2485ce9).
Render free servicesrv-db0og49srm7s738gigo0; latest app deploydep-db0oikbtqb8s738lj5mg live at same commit.
[GitHub CI](https://github.com/Nex2i/redirect-preflight/actions/runs/37160404433) passed requirement validation, tests and builds. Local13API tests plus one frontend contract check passed; the frontend source check is not claimed as browser verification.

## Passed, actually exercised
-100catalog IDs/names unique;19deeper desk screens, five skeptical finalist comparisons. Full catalog private outside public repo.
-Requirement validator statusready, TypeScript API/web production builds, deterministic domain fixtures including5000rows; 5001rejected. Invalid CSV, self/cycle/conflict/chain/duplicate/unmapped inventory, duplicate cycle source, literal URL identity, physical inventory line numbers.
-API inject: real workflow, health, wrong/missing origin, unconfigured billing503, rate60/minute. Signed browser cookie forgery rejected; paid/unpaid/live/amount/currency/owner/expiry/refund/dispute rules; repeated fulfillment fixed expiry and same idempotency key; invalid webhook signature rejected.
-Actual HTTPS custom domain serves200; /api/health and /api/config200 through Netlify→Render proxy. Managed TLS issued; exact APP_ORIGIN/CORS_ORIGIN custom domain. Server secrets isolated, no URL data/database retained. Header policy delivered by frontend.
-Local and deployed Chromium: sample9mappings with5blocking/3review findings,3export sources; acknowledgment gate, actual CSV download, edits invalidate output, clean map,375px no horizontal overflow, no page errors. Screenshots visually inspected. Input changes disabled while processing to prevent stale report races.
-Deployed Playwright WebKit: sample core task and export gate pass; no PostHog requests. This is WebKit automation, not a claim that every Safari device passed. Deployed Chromium also sends zero PostHog requests while telemetry unconfigured.
-Isolated Stripe sandboxacct_1UMZA9K43XhvGeEO, SDK23.0.0/API2026-09-30.endive. Actual hosted$19test card payment succeeded; verified payment enabled101mapping browser run; expires30days after session creation. No real funds moved.
-Actual signed checkout webhook replay twice returned200 and unchanged expiry. Invalid signature400; signed livemode event400. Original Stripe checkout completion event exists; fulfillment metadata recorded. Browser receipt validated HttpOnly/Secure/SameSite=Lax/host-only.
-Actual full sandbox refund of browser-owned payment revoked entitlement;101mapping run denied400; free clean map still200. Test harness first refunded another paid test session; corrected to match browser receipt, then revocation passed. Both test payments refunded.
-Git-connected Netlify frontend and Render backend deployments enabled. Initial Netlify Git build failed after proxy env supplied in legacy repo configuration; setting NETLIFY_PROXY_ORIGIN via current build-scope environment API and retrying succeeded. Previous good deployment stayed live.

## Pending or deliberately absent
-Founder manual review pending. Firefox automation runtime failed to launch (“Could not find profile folder”); actual Firefox and Safari manual check pending.
-Actual declined sandbox card4000000000000002 was rejected; entitlement remained false. Repeated checkout reused the same open session. Navigating to the cancelled return showed the expected message without unlocking. Unused open test sessions expired during cleanup.
-Async payment settlement, real disputes, partial refund and30day passage are fixture-tested rules or manual-pending, not actual elapsed/real-payment scenarios.
-Auth/signup/verification/reset/email/customer backups are not implemented for this anonymous disposable demo. Template's customer-account release gate remains unmet. No live billing, sensitive data or customer outreach authorized.
-PostHog event delivery/consent routing unconfigured; no project token enabled. No email provider configured.
-Render direct creation tool does not expose HTTP healthCheckPath; /health is implemented and manually smoke tested, while Render uses its default service health behavior. YAML provides /health for future infrastructure application.
-Claimable sandbox expiresOctober10,2026 unless owner claims it. Claim link and isolated secrets retained privately; never committed.

## SEO follow-up — October 3, 2026
Founder confirmed no advertising. SEO changes at690b8a1; API-origin noindex correction atc408913. Requirements validator, all14tests and workspace builds passed; GitHub CI for690b8a1 passed. Live checks confirmed HTML headings/content with JavaScript disabled for checker and checklist, canonical/title/description, robots.txt and two-page sitemap with correct MIME types, synthetic template, default-domain and index.html301s, true404 for unknown paths. Chromium deployed core workflow, report invalidation, acknowledgment/export/download and375px viewport passed after prerendering. API-origin noindex, clean hydration console, live sample analysis, and mobile checker/checklist layout passed after Render deploy dep-db0orj5ckfvc73d2a0vg went live. GitHub CI37161473275 passed for c408913. Search Console ownership/submission, Google's selected canonical/indexing and field Core Web Vitals remain pending. See docs/seo-setup.md for owner steps.
