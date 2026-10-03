# Reusable MVP template requirements

Status: architecture requirements, 2026-10-03. This checklist is the gate for calling a generated project an MVP. The current code is a scaffold and does **not** yet meet the authentication requirements.

## Decision and scope

- [ ] Each requested run follows `docs/pipeline.md`: autonomously select the idea, define requirements, build, verify, and deploy the demo, then inform the founder. No idea or requirements approval gate.
- [ ] The handoff names the selection rationale, assumptions, repo/domain, automated evidence, unresolved issues, and manual tests with expected results. Founder manual review is recorded separately from automated verification.

- [ ] An opportunity report records the research date, buyer, task, alternatives, evidence quality, operating fit, and a decision level. The supplied research prompt is the research contract.
- [ ] `idea.json` names one buyer, one trigger, required inputs, accepted output, purchase reason, geographic assumption, distribution hypothesis, acceptance criteria, kill conditions, and data sensitivity.
- [ ] The MVP implements one complete buyer task, including empty, loading, error, success, and review states. The landing page describes the actual buyer promise.
- [ ] Every requirement maps to an observable acceptance test. Unproven demand and proposed prices remain marked as hypotheses.
- [ ] A paid experiment can stop before a product build. Human review and support are included in the operating estimate.

## Billing decision during ideation

- [ ] Complete the billing TODO in `docs/pipeline.md` before implementation. Compare subscription, prepaid credits, pay per use, and one-time purchase; choose autonomously and record the rationale in `requirements/mvp.md`.
- [ ] Specify payer, billable unit, price hypothesis, purchase interval, unit economics, free limits, activation/upgrade trigger, payment timing, and paid entitlements.
- [ ] Define applicable renewal, credit, metering, cancellation, failure, and refund rules, including duplicate/retried work. Record payment configuration, authoritative records, and acceptance tests. Do not treat a subscription plugin as support for every billing model.
- [ ] Include the billing rationale and sandbox payment/entitlement/manual test cases in the founder handoff. Mark unvalidated pricing and untested behavior explicitly.

## Reusable stack

- [ ] One public Nex2i GitHub **template** repo; each MVP gets its own repo and environment.
- [ ] React/TypeScript frontend, API, PostgreSQL, migrations, environment examples, health endpoint, structured logs, and deterministic CI.
- [ ] The app can run behind one public origin with `/api` routed to its server. Authentication must work in Safari and browsers that block third-party cookies.
- [ ] Each public MVP uses a unique `<idea-slug>.nex2i.com` hostname added in Netlify. Set the matching auth base URL and allowed origin for that exact hostname; do not share session cookies across MVP subdomains.
- [ ] Netlify/Render and a single-VM Coolify path use the same app code and environment contract.
- [ ] No credentials, customer data, or research with confidential material are committed to a public repo.
- [ ] Free-tier deployment remains explicitly disposable. A durable launch requires persistent storage, off-server backups, restore testing, and monitoring.
- [ ] Deploys follow passing CI; a failed build leaves the previous version available. Smoke test the actual landing page, login, API, email flow, and core buyer task.

## Authentication, shared by every MVP

- [ ] Sign up with unique username, unique verified email, and password. Username may be used for login; email is the recovery identifier.
- [ ] Each MVP has its own auth database, signing secret, sender identity, and user population. Shared source code does not imply shared user accounts or cross-MVP login.
- [ ] Email confirmation before first authenticated session. A verified email is required for password reset.
- [ ] Forgot-password request returns the same response for existing and nonexistent accounts. Reset links are single use, expire, and work only over HTTPS. A successful reset revokes existing sessions and requires a fresh login.
- [ ] Passwords use a maintained library's hashing defaults; no application code stores plaintext or reversible passwords. Minimum length and breached-password screening are policy decisions before customer launch.
- [ ] Use server-side sessions in HttpOnly, Secure, SameSite cookies through a same-origin `/api` route. Protect state-changing requests against CSRF. Never keep session tokens in localStorage.
- [ ] Rate limit signup, login, forgot-password, reset, and email resend by IP and account identifier. Generic auth errors prevent account enumeration.
- [ ] Audit events record signup, verification, login success/failure, logout, reset request/completion, session revocation, and lockout with timestamp, pseudonymous user identifier, request ID, and coarse IP/device metadata. Never log passwords, reset tokens, full cookies, or email body.
- [ ] Provide self-service logout and an account deletion/export path if actual customer data is collected.
- [ ] Test signup, verification, username login, wrong password, logout, forgotten password, expired/reused token, revoked session, rate limiting, and cross-browser cookie behavior.
- [ ] Keep admin access separate from product user roles; turn on MFA for GitHub, hosting, and email-provider accounts.

## Email and operations

- [ ] PostHog telemetry is opt-in, scoped to one project per MVP, and limited to named, value-free task events. Verify consent and event delivery on the actual Nex2i subdomain. Keep autocapture and session replay disabled unless separately reviewed.

- [ ] Transactional email provider uses a verified sending domain and SPF/DKIM. Store its API key as a hosting secret.
- [ ] Email send failures have a visible retry path and an operational alert. Do not claim a reset worked merely because an API request succeeded.
- [ ] Structured API logs include request IDs and safe error codes. Set retention and alerting before customers use the MVP.
- [ ] Database backups are off-server and periodically restored into a disposable instance. Keep a documented recovery owner and maximum tolerable data loss.
- [ ] Cost budget covers VM/managed services, domains, email, backup storage, AI API usage, and founder operating time. Disable any optional paid automation until a spending cap is set.

## Gate

The template may be published as a public scaffold while these boxes are open. Do not describe a generated app as ready for real customer accounts until authentication, email, persistence, backup, and smoke tests are checked in the deployed environment.
