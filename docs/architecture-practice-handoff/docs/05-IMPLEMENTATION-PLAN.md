# Implementation plan for Claude Code or Codex

Version 1.0 · 21 September 2026 · Future implementation instructions

**No production implementation or deployment was performed for this handoff.** The HTML mockups are visual/behavioral references, not the finished Astro application. Read `START-HERE.md`, the PRD, design system, page specs, content decisions and acceptance checklist before building.

## 1. Resolve the sources

Use `content/site-content.json` for exact proposed copy and order, `design-tokens.json` and `02-DESIGN-SYSTEM.md` for reusable rules, and `04-PAGE-SPECS.md` plus the six mockups for composition. View phone and desktop layouts. Explicit accessibility requirements take precedence over small visual differences; record any adjustment.

The original repository documents describe an earlier treatment. Reconcile them with the selected design rather than leaving contradictory specifications equally current. Preserve later recorded decisions about `www`, Google Analytics and the private method. New copy remains proposed: make its migration inspectable and obtain editorial approval before launch.

## 2. Observed repository baseline

Inspected source: `/Users/willgodfrey/Development/personal-websites/willgodfrey.com`. Recheck at implementation time.

| Area | Observed state / consequence |
| --- | --- |
| Framework | Astro `7.3.3`, static directory output, no adapter. Continue this app; no replacement scaffold or speculative upgrade. |
| Runtime | `.nvmrc`: `22.12.0`; engine `>=22.12.0`. Reproduce with the pinned runtime and lockfile. |
| Dependencies | Sitemap `3.7.4`, markdown-remark `7.3.1`, Bricolage font package `5.2.7`. Replace the font treatment with supplied files; remove Bricolage only after checking remaining imports. |
| Routes/content | Five pages and 404 already exist. Markdown loads through `src/content.config.ts`; `src/lib/home.ts` parses named blocks/simple nodes. Adapt the existing structure. |
| Shell | `Base.astro` contains header, footer, metadata and GA; a separate Header also exists. Consolidate rather than duplicate. |
| Canonical | Astro `site` and content use `https://www.willgodfrey.com`, trailing slashes. Retain. |
| Checks | Build precheck runs copy lint. `check` currently means lint plus build; `lint:text` is separate and skips the Home hero. Neither proves full type/link/content coverage. |
| Analytics | Deferred Google loader plus `/ga.js`, ID `G-RQMR51RTHC`. Preserve the sanctioned production exception; disable in design/local review. |
| Hosting/assets | Cloudflare project settings affect all branches. Existing small portrait is also the legacy share image at `/images/will-godfrey.jpg`; preserve that path. |

These are inspected versions, not claims about latest releases. Verify official documentation only where needed; pin and justify any new dependency.

## 3. Artifact-to-repository map

| Package artifact | Future target or use |
| --- | --- |
| `design-tokens.json` | `src/styles/tokens.css`, with documented one-to-one token mapping. |
| `mockups/*.css` | Shared and page-specific visual references for base/component styles; do not import wholesale. |
| `mockups/home.html` | `src/pages/index.astro`. |
| Other five mockup HTML files | Matching existing Astro routes, including `404.astro`. |
| `content/site-content.json` | One-time migration source for the six existing `content/*.md` files. |
| `assets/fonts/*.woff2` | `public/fonts/`, referenced by local `@font-face`. Retain OFL/source records. |
| `assets/images/assembly-*.avif`, `.webp`, JPEG fallback | Responsive variants under `public/images/architecture-practice/`. Keep the PNG master outside shipped assets. |
| `assets/images/will-godfrey.jpg` | Reuse the authentic portrait, maintaining its existing public path. |
| `assets/diagrams/*.svg` | Same-origin figures or semantic inline SVG when state changes require it. |
| `assets/brand/` | Supplied brand sources/candidates. Keep the existing portrait as OG image unless later explicitly changed. |
| `docs/*.md`, mockup views | Store the selected specification and use matched browser captures during implementation review; never ship review material as page content. |

No external image search, new portrait generation, font purchase or additional artwork is needed to reproduce this design.

## 4. One content authority at build time

The JSON is canonical **inside the handoff**. Migrate it once into the repository's Markdown/front matter and render through Astro collections. Do not retain a second independently edited runtime copy or fetch the handoff JSON in the browser.

| JSON source | Repository content destination |
| --- | --- |
| `common` | `site.md`: identity, navigation, metadata, UI labels, captions, shared invitation and `stages`. |
| `home` | `home.md`: hero, proof, selected-case IDs, stage IDs, personal excerpt. |
| `work` | `work.md`: five structured case records and career foot line. Home resolves case references here. |
| `practice` | `venture-architect.md`: proposed essay/FAQ and typed layer, engagement, comparison and standards data. Do not reinsert every older paragraph. |
| `about`, `contact` | Matching Markdown files with typed presentation fields. |
| `notFound` | Global error-page fields in `site.md`. |
| `meta` | Internal provenance/status only; never public render data. |

Preserve cases `venture-build`, `production-ai`, `sightline`, `miniature`, `written-method`; stages `design`, `prove`, `hand-over`; layers `commercial`, `technical`, `institutional`. Home references the first three cases. Resolve invitation references to shared content. Preserve `#projects`, each case anchor, and Practice's `#engagement`, `#definition`, `#questions`.

Extend `src/content.config.ts` for required fields, unique IDs and valid references. Validate internal destinations and asset keys. Optional dates may be absent; never render undefined values, TODOs or fabricated fallbacks. Resolve `titleLines` as art direction without duplicate headings or forced phone line breaks.

All captions, controls, metadata and hidden-panel copy come from this source. Enhancement reads rendered content, not a duplicate JavaScript copy array. Keep conceptual/illustrative disclosures; remove package review chrome, editorial notes and implementation instructions from public output. Subsequent editorial changes happen only in canonical repository content.

## 5. Production components

| Component | Responsibility |
| --- | --- |
| `Base.astro` | Document shell, canonical/social metadata, skip link, shared components and approved production-only analytics. |
| `SiteHeader.astro` / `SiteFooter.astro` | Content-driven navigation, active route and consistent footer variants. Consolidate the existing Header. |
| `ContactBand.astro` | Wine invitation; avoid duplicating Contact's main email treatment. |
| `ArchitectureHero.astro` / `ProofStrip.astro` | Responsive sculpture composition and three factual proof statements. |
| `SelectedWork.astro` | Three fully rendered summaries/figures/links and optional selection controls. |
| `StageStudy.astro` / `IllustrativeSheet.astro` | Home phase selection and corresponding document. Share stage data with Practice's static sequence. |
| `PracticeLayers.astro` | Selectable SVG/CSS layer model with complete adjacent explanations. No 3D library. |
| `CaseStudy.astro` | Full, always-visible Work case with stable anchor and labeled details. |
| `EngagementComparison.astro` / `Faq.astro` | Comparable engagement shapes and always-open questions/answers. |
| `PortraitBlock.astro` | Authentic image, controlled crop and source-supported display size. |
| `StructuredData.astro` | Safely serialized content-backed metadata; no invented dates or affiliations. |
| `scripts/architecture-controls.ts` | Tiny isolated work/stage/layer enhancements; no fetching, tracking, storage or navigation interception. |

Route components compose these pieces. Use semantic headings, links for navigation and buttons for actions. Native Practice jumps are sufficient; no full section TOC or scrollspy is required. Do not reproduce the prototype's large inline stylesheet and duplicated script-data architecture.

## 6. Build sequence

### A. Baseline and scope

Read current project instructions; inspect branch and working tree before editing. Preserve user changes and the documented `venture-architect` branch context where applicable. Reproduce the baseline build with the lockfile and record unrelated failures. Do not reset/stash user work, change hosting settings or upgrade dependencies to begin the design.

Deliver a short file map and supersession note covering the new visual system, homepage order, proposed copy, conceptual imagery and small enhancements.

### B. Shared foundation

Translate tokens; install the two fonts with `font-display: swap`; build typography, widths, spacing, focus, header, invitation and footer. Verify contrast and HTML reading order. Establish all routes and metadata before special interactions. Keep the intentional light composition.

Deliver locally working routes with shared styling, correct navigation and no narrow-screen overflow.

### C. Content and static compositions

Migrate the content and schemas. Build Home and Work first, then Practice, About, Contact and 404. Follow page-spec order, ratios, crops and mobile stacking. Render every interactive panel before adding controls. Use the supplied illustrations where optional real photography is absent.

Deliver a complete readable no-script site. Case anchors work and all factual text is present without placeholders.

### D. Progressive enhancement and loading

Enhance Home work/stages and Practice layers independently. Validate each module's controls and target panels before hiding anything; failure leaves its static content readable. Reveal controls only after initialization. Use native `hidden` for inactive panels, `aria-pressed` for buttons, retained focus and one concise polite selection announcement. Synchronize every related field. Practice engagement stays static.

Use supplied AVIF/WebP variants with accurate `sizes`, dimensions and crop positions. Prioritize the likely LCP hero only; lazy-load below the fold. Do not ship the PNG master or preload every image. Avoid duplicate SVG IDs. Under reduced motion switch immediately; print reveals all panels.

Deliver working keyboard/pointer states without layout jumps or redundant client copy.

### E. Metadata and compatibility

Keep one `www` host, five-page sitemap, trailing slashes and proper 404 handling. Generate only content-supported Person, WebSite, ProfilePage, WebPage and optional Article/FAQ data. No publication date is guessed; FAQ schema must match visible answers. Preserve the legacy share-image path and current selected OG image.

Audit known old URLs before adding redirects. Existing Home fragments can map to sensible sections; server redirects cannot inspect fragments. Do not invent redirects.

Retain production GA4 and the existing Cloudflare analytics choice without adding duplicate beacons or new vendors. Mockups/local review send no analytics. Preserve security headers, adjusting CSP only for verified necessary sources; never broaden it to `*` to silence failures.

Deliver production-like local output and a separate launch-configuration note. No settings change is needed to review the design.

### F. Verify and present

Run the checks below and the acceptance checklist, correct failures, then compare matched desktop/phone captures with the mockups. Provide the preview location, screenshots, actual results, proposed-copy changes and justified deviations. Optional photographs and the undisclosed brokerage workflow do not block completion; use the defined fallbacks.

## 7. Verification that proves the result

**Content and build:** preserve copy lint before build. Validate all migrated front matter and public strings; production rejects unresolved TODOs and banned language. Extend `lint:text` to cover hero, captions, metadata, UI and every interactive state. Compare explicit source fields to parsed HTML; do not add broad skip regions to hide mismatches. Excerpts require their own source field. Keep internal review metadata out of output.

**Links and types:** check built internal routes, anchors and assets. Verify actual HTTP route/404 behavior separately from file existence. Make `npm run check` cover its documented scope: the observed script does not yet include explicit type/link checks. If Astro's documented type checker needs new development dependencies, verify compatible versions, pin them and explain why.

**Behavior:** activate every work, stage and layer choice. Check selected state, diagram, title, associated rows/explanation and destination together. Verify focus, concise announcement, independent initialization, script-off fallback, reduced motion and print. These are meaningful interaction tests; avoid tests that merely repeat static token values.

**Visual/accessibility:** compare all six routes at 390px and 1440px; inspect 320px, 768px, 1920px and short landscape layouts. Check email wrapping, 200% text enlargement and 400% zoom. Run automated accessibility checks plus manual keyboard/landmark/heading/focus review and screen-reader spot checks. Test failed images and disabled scripts. Print Practice to inspect pagination and complete content.

**Performance/facts:** use the production build and one recorded mobile Lighthouse profile for all five pages. Record LCP, CLS, scores and transferred bytes, distinguishing first-party budgets from analytics and total requests. Scan output for repository removals, private method names, TODOs, editorial notes and unnecessary source assets. Confirm claims, conceptual captions and dates. Do not describe a polished mockup as a tested production build.

## 8. Release boundary

A completed preview is the concrete artifact for editorial and release review. Report unmet requirements honestly; no automatic merge, push, deployment, DNS change or monitor follows from this package.

The repository records a coordinated launch change to Cloudflare: `npm run build`, output `dist`, Node matching `.nvmrc`. Re-verify then and present exact settings; these notes do not authorize changing them. Preserve `www` canonical. After a separately authorized launch, verify public routes, headers, redirects, share assets, metadata and analytics against the reviewed build.
