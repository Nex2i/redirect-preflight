# Redirect Preflight

A validation MVP for small web agencies reviewing literal redirect maps before staging exists. Paste/upload old_url,new_url,status CSV and optional inventory, review row-specific conflicts, duplicates, cycles, chains and missing URLs, then export the reviewed map. It does not crawl URLs or certify HTTP/SEO correctness.

[App](https://redirect-preflight.nex2i.com) · [Decision report](docs/decision-report.md) · [Manual review checklist](docs/manual-test-checklist.md) · [Requirements](requirements/mvp.md) · [Verification](docs/verification.md)

Pricing hypothesis: free100mappings/run with full exports; one-time$19USD test project pass unlocks5000/run for30days in this browser. Stripe sandbox only. No real customer accounts, sensitive data, live charges or retained URL inputs. This is a disposable validation demo, not customer-ready.

Node22+: `npm ci`, `npm test`, `npm run build`, `npm run dev`. Set COOKIE_SECRET plus sandbox STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET server-side to test billing. APP_ORIGIN/CORS_ORIGIN match the exact frontend. Netlify build requires NETLIFY_PROXY_ORIGIN pointing at the isolated Render API. Without billing secrets free workflow works and checkout is visibly unavailable. No database needed.

See requirements for auth/customer release gaps and data boundaries. Template-origin pipeline files are retained as provenance; current behavior is in the project-specific documents.
