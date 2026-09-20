# Open items: only Will can close these

The production build is blocked until every `[[TODO` in `content/` is filled. Preview builds are not blocked.

## Decisions (resolved 2026-09-20)

| # | Decision | Default | Will's decision |
| --- | --- | --- | --- |
| 1 | Publish "North America's first" in the CTO line | Keep it | Keep it. Agreed. |
| 2 | Name the Carve-forward method publicly | Keep it | **Do not name it.** Do not put the method's name or its label in public copy. Say only that he works from a written method of his own. Requires a copy change everywhere "Carve-forward" appears (site.md x4, venture-architect.md x2, work.md card title + body, about.md x1). Exact wording to be proposed in the PR. |
| 3 | Name Skydio on the Miniature Systems card | Do not name it | Do not name it. Use "a leading US drone platform." Agreed. |
| 4 | Canonical host | `https://willgodfrey.com`, `www` redirecting | Will is indifferent; Cloudflare currently serves the `www` subdomain. Decision: make `https://www.willgodfrey.com` canonical to match the live setup, so no Cloudflare/DNS change is needed. Update `canonicalHost` in `content/site.md` accordingly. |
| 5 | Enable Cloudflare Web Analytics | Yes | **Keep Google Analytics** (Will's decision 2026-09-20), loaded last / deferred. Cloudflare Web Analytics also on (cookieless). GA is the one sanctioned client-side script (justify in PR per N4). CSP in `public/_headers` allows `googletagmanager.com` + `google-analytics.com`. Accepted consequences: the site is no longer strictly cookieless (a cookie notice may be advisable) and N8 (no third-party runtime requests) is relaxed for GA only. Init is a self-hosted `/ga.js` plus Google's loader, placed at end of `<body>`. GA4 ID `G-RQMR51RTHC`. |

## Brackets to fill in `content/`

| File | Marker | Status |
| --- | --- | --- |
| `content/work.md` | `[[TODO: brokerage workflow]]` | Open. Will to supply one sentence on the workflow the agent runs in. |
| `content/work.md` | `[[TODO: Skydio naming]]` | Resolved. Replace with "a leading US drone platform" (decision 3). |
| `content/work.md` | `[[TODO: Atlanta startups]]` | Confirmed names: **ShootQ**, **Live & Breathing**, **Modern Furniture Collection**. Note: that is three names, but the Work foot line says "two startups I co-founded in Atlanta" and About names only a band-film media company and a furniture importer. Reconcile the count and confirm which were co-founded when proposing wording in the PR. |
| `content/venture-architect.md` | `[[TODO: launch date]]` | Resolved to "September 2026" for display. Set the exact ISO date on launch day for the Article JSON-LD `datePublished` / `dateModified`. |
| `content/site.md` | `[[TODO: ICONIQ figures verified]]` | Verified against the report by Claude 2026-09-20. Three of four figures correct; the inference figure needs a wording fix (23% is share of AI-product cost, not of revenue). See notes below. Delete marker once Will approves the fix. |

## ICONIQ verification (2026-09-20)

Source confirmed real: **ICONIQ Analytics, "2026 State of AI: Bi-Annual Snapshot"** (published ~January 2026), based on ICONIQ GenAI surveys of ~300 software-company executives run April 2025 and December 2025. The link already in `venture-architect.md` resolves to this 2.7 MB PDF.

- **41% gross margin in 2024** — correct. Report: aggregated gross margin on AI products, 41% (2024), 45% (2025), 52% (2026P), N=269.
- **52% projected for 2026** — correct. Report: "reaching a projected average gross margin of ~52% in 2026 on aggregate."
- **Inference at 23% of revenue at scale** — INCORRECT as written. The 23% is inference's share of the **cost of delivering AI products** at scale (the dominant cost driver as talent's share declines), not 23% of revenue. Reword to "23% of the cost to deliver" or similar.
- **More than a third change pricing within a year** — correct, and precise: the report says 37% "plan to change their AI pricing model in the next year," N=298.
- Minor: the essay calls it "ICONIQ's January 2026 State of AI survey." It is the January 2026 *report* built from April 2025 and December 2025 surveys. Consider tightening the phrasing.

## Delivery and hosting decisions (2026-09-20)

- **Share/OG image:** keep the existing `/images/will-godfrey.jpg` (Will's decision). In the Astro repo it lives at `public/images/will-godfrey.jpg` and is served at the identical URL `/images/will-godfrey.jpg`. All images (portrait, aerials) go in `public/images/`. Note: the current OG image is ~400x400 square; social cards prefer 1200x630 landscape. Optional later: generate a designed 1200x630 card. No redirect needed.
- **Canonical host:** `https://www.willgodfrey.com` (matches live; bare host already 301s to www at the Cloudflare zone). `site` in `astro.config.mjs`, `canonicalHost` in `content/site.md`, robots and sitemap all use www.
- **Cloudflare Pages build settings:** the repo is already connected and auto-builds every branch. But build config (command + output dir) is project-wide, so changing it affects production (`main`, the old site) too. Plan: keep the current settings during Phases 1-5 and review stops via local builds + screenshots; flip to build command `npm run build`, output dir `dist`, `NODE_VERSION` (pinned in `.nvmrc`) at the launch merge, when `main` also carries the Astro build. Exact values handed to Will at that point.
- **Toolchain pinned (verified against npm registry 2026-09-20):** Astro `7.3.3` (requires Node >=22.12.0), `@astrojs/sitemap` `3.7.4`, Fontsource `5.3.0` (Source Serif 4 Variable, Barlow, Barlow Semi Condensed). Node pinned at `22.12.0` via `.nvmrc`.

## Assets

| Asset | Spec | Where it goes |
| --- | --- | --- |
| Portrait | 4:5, at least 1600px on the long edge | About page, `Person` image, share image optional |
| Aerial photograph 1 | 3:2, at least 2400px wide | Home, architect of record block |
| Aerial photograph 2 | 3:2, at least 2400px wide | Work page opener |
| Captions and alt text for all three | One line each | `content/site.md` |
