# Redirect Preflight organic search setup

October 3, 2026. Founder constraint: **no ads**. Technical SEO is deployed; Google indexing and organic demand are unverified.

## Pages and search intent
- https://redirect-preflight.nex2i.com/ — free redirect map checker / redirect CSV validation. The actual tool and its limitations are visible in initial HTML.
- https://redirect-preflight.nex2i.com/redirect-map-checklist/ — website migration redirect map checklist / CSV template. Original practical guidance, a synthetic template, an official Google source, and a link to the checker.

No claimed keyword volumes, rankings, customer endorsements or conversion projections. Do not expand into crawling, automatic destination matching or guaranteed migration SEO outcomes.

## Deployed foundation
Build-time React prerendering, browser hydration, a single descriptive H1 per page, unique titles/descriptions, self-referencing canonical URLs, social metadata, identity JSON-LD on the checker, internal links, HTTPS, favicon, robots.txt and a sitemap containing two canonical public HTML pages. Default Netlify domain and index.html aliases redirect permanently; missing pages return404. API responses carry X-Robots-Tag:noindex at the Render origin, since Netlify static _headers do not apply to proxied responses. APIs are excluded in robots.txt. No advertising tags.

## Google Search Console owner steps — pending
1. In the Google account that owns Nex2i, open https://search.google.com/search-console/. Use an existing verified nex2i.com Domain property if available, or add the URL-prefix property https://redirect-preflight.nex2i.com/.
2. Complete the offered ownership verification. For an HTML tag, provide the exact verification token to add to the homepage; for an HTML file, provide the file to preserve across builds. No verification token has been configured in this run.
3. Submit https://redirect-preflight.nex2i.com/sitemap.xml in Sitemaps. Confirm successful retrieval and both listed URLs. Sitemap discovery is already advertised in robots.txt; manual submission has not occurred.
4. Inspect each page. Run Test Live URL; check crawl access, rendered content and canonical. Request indexing when eligible. Then record Google's indexing status and selected canonical after processing; a successful live fetch alone is not proof of indexing.
5. Track impressions, clicks and search queries over several weeks. Review Core Web Vitals when sufficient real-user data is available. There is currently no measured search baseline or field performance report.

## Organic validation
Start with the checker and one useful guide. Improve them using actual search queries and qualified agency feedback. Prioritize successful free reports and useful exported handoffs over raw visits. Live paid conversion remains gated by customer-release and billing work. Search Console is currently the intended source for search performance; optional consented product analytics are disabled pending a dedicated project. No paid acquisition budget or assumed CAC.

Google references: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap. Eligibility and sitemap submission do not guarantee indexing or rankings.
