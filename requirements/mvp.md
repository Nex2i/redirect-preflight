# MVP requirements

The agent fills this in after autonomously selecting an idea from the research report. Follow `docs/pipeline.md`; the founder reviews the deployed result rather than approving the idea or requirement brief beforehand.

## Outcome

Buyer, user, trigger, accepted output, and the smallest useful job:

## Screens and states

Landing page promise, input form, processing state, result/review state, error state:

## Billing model and pricing hypothesis

Complete during ideation using the TODO in `docs/pipeline.md`, before implementation:

- Selected model (subscription, prepaid credits, pay per use, one-time, or justified hybrid), payer, billable unit, purchase frequency, and rejected alternatives:
- Price hypothesis, currency, interval, estimated unit cost/margin, evidence, and commercial assumptions:
- Free/trial limits, activation event, upgrade trigger, paid entitlements, and timing of payment versus work:
- Applicable renewal/allowance reset, credit debit/expiry/rollover, usage metering/caps, cancellation, failed payment/work, and refund rules; mark unrelated rules not applicable:
- Payment-provider objects and configuration, authoritative usage/credit/entitlement records, idempotency, checkout/account UX, and sandbox test cases with expected outcomes:

## API contract

Endpoints, request/response examples, validation, rate limits:

## Data

Tables, retention, deletion, export, and whether real customer data is allowed:

## Acceptance tests

Map each criterion in `idea.json` to an observable test:

## Operations

Support, onboarding, review, exceptions, and a five-hour weekly workload estimate:

## Release

Use a unique `<idea-slug>.nex2i.com` Netlify custom domain. Record the final Netlify and Render URLs, `NETLIFY_PROXY_ORIGIN`, exact `CORS_ORIGIN`, and optional `VITE_POSTHOG_PROJECT_TOKEN` and `VITE_POSTHOG_HOST`. After deployment, smoke test the buyer task and, when enabled, confirm a consented event reaches the MVP's PostHog project while a declined visit sends no events:

## Decision record and founder handoff

Selected opportunity and decision level; evidence and alternatives; assumptions and reasons for scope, pricing hypothesis, stack, and hosting choices:

Repository and deployed URL; automatically verified behavior; incomplete implementation or access blockers:

Manual test checklist with prerequisites, steps, expected outcomes, and cleanup. Include the core task, applicable auth/email/billing flows, failure states, and telemetry consent. Mark founder review as pending until actual results are received:
