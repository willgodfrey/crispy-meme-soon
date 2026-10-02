# Cobalt commissions review

Implemented for Will on October 1, 2026. Local preview: http://127.0.0.1:4323/commissions/

The implementation is ready for local design and editorial review. No push, deployment, merge, domain change or Cloudflare change was performed. This worktree started clean at `483ec8b`, the existing architecture implementation. Its detached checkout and the original source checkout were preserved.

## What changed

- Added the complete Commissions page: full venture commission first, four focused reviews, secondary Portfolio sessions, conversation steps and visible questions.
- Added Home's four situation links after the full venture process. Updated Practice responsibilities, navigation, shared invitation and Contact's broader conversation copy.
- Integrated the exact handoff JSON into the existing canonical source. Work, About and 404 content objects are unchanged from the starting revision. No independent editorial arrays were introduced.
- Applied supplied Cobalt images and all eleven drawings, including the interactive inline layer model. Preserved the authentic portrait, local fonts, font licenses, share image and existing analytics opt-in. Regenerated the favicon fallbacks from the supplied SVG, retaining 16, 32 and 48 pixel ICO sizes.
- Added build-time content checks and a built-output checker for routes, anchors, metadata, copy, headings, diagrams, asset checksums and sitemap. `npm run check` now includes this check; the separate type-check result below is not implied by that command.
- Corrected inherited issues exposed by this review: the 404 canonical, duplicate Contact footer, script controls appearing before their own module initializes, and the obsolete public `llms.txt`. That route now generates a static file from approved canonical content instead of publishing superseded claims.

Production dependencies and `package-lock.json` are unchanged. The existing first-party script remains solely for progressive enhancement of work, stage and layer selectors; Commissions adds no client-side JavaScript.

## Checks completed

| Check | Actual result |
| --- | --- |
| Baseline | Original copy lint and static build passed before editing. |
| Final build | `npm run check` passes: copy lint, static build and the new built-output checker. |
| Types | `@astrojs/check` 0.9.10 with TypeScript 6.0.3: 22 files, zero errors, warnings or hints. Tools were installed outside the project. |
| Copy | Canonical JSON matches the supplied handoff exactly. Rendered text and accessible labels are checked against canonical strings. Every Commissions phrase, new entry point and responsibility passage is checked for presence. Diagram titles, descriptions and labels are checked too. |
| Routes | Six marketing routes plus 404 render. Navigation, old Work/Practice anchors, new offer anchors and referenced assets resolve. The sitemap has exactly six marketing routes. |
| Metadata | Supplied titles/descriptions, `www` canonicals, unchanged share-image path, Commissions WebPage data and noindexed 404 verified. |
| HTTP | A genuinely missing URL returns HTTP 404 in the local preview. Explicitly requesting the static `/404.html` file returns HTTP 200 in Astro's preview server. Hosting behavior was not changed or tested. |
| Responsive | All seven views checked at 320, 390, 768, 1280, 1440 and 1920 CSS pixels, plus 667 by 375 landscape. No horizontal document overflow or missing loaded images. Matched reference/site captures reviewed at 1440 by 1000 and 390 by 844. |
| Keyboard | Skip link moves focus to main. All three work, three stage and three layer choices tested with native Enter/Space activation. Pressed state, associated panel, layer artwork, retained focus and polite announcements verified. Cobalt focus outline is visible. |
| Scripts blocked | Browser test using a temporary local Content Security Policy. Home exposes all six panels, Practice all three layers and six FAQ answers, and Commissions all four focused offers and three FAQ answers. Nonfunctional selector controls remain hidden. |
| Images blocked | Browser test confirms commission explanations, alternative text, captions and conversation links remain available without images. |
| Print | Practice and Commissions rendered with Chrome headless shell 150 and visually reviewed after PDF rasterization. Both are nine pages. Print exposes all layer panels; text is black on white, diagrams retain useful color, and no text is clipped. Faint portfolio text, oversized print headings and a detached footer were corrected. |
| Assets/privacy | Responsive local AVIF/WebP/JPEG derivatives, dimensions, lazy loading and hero priority verified. No editing master is shipped. Lighthouse observed no third-party runtime requests. |
| Change hygiene | `git diff --check` passes. No dependency or lockfile change, added tracker, analytics enablement or production-setting change. |

The intentionally larger mobile header preserves a 44px brand target. Contact's heading can use the available width, and responsive links wrap naturally at the narrowest sizes. The reference viewer and its review controls are excluded from production.

## Mobile performance evidence

Lighthouse 13.5.0, Chrome 150, local production build, simulated mobile profile: 412 by 823 CSS pixels, device scale 1.75, 150ms RTT, 1638.4 Kbps throughput and 4x CPU slowdown. These are single-run lab measurements, not field data.

| Page | Performance | Accessibility | Best practices | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| Home | 99 | 100 | 100 | 100 | 1.73s |
| Practice | 99 | 100 | 100 | 100 | 1.65s |
| Commissions | 100 | 100 | 100 | 100 | 1.35s |
| Work | 100 | 100 | 100 | 100 | 1.35s |
| About | 100 | 100 | 100 | 100 | 1.65s |
| Contact | 100 | 100 | 100 | 100 | 1.35s |
| 404 | 100 | 100 | 100 | 69 | 1.35s |

404's SEO score reflects deliberate exclusion from indexing. All six marketing pages meet the supplied score and LCP targets. Home's measured first-party non-image transfer is 98,739 bytes, including fonts; first-party JavaScript transfer is 1,314 bytes. The interaction bundles total 709 bytes gzip, below the 12 KB budget.

## Review files

Generated evidence is kept in `qa/cobalt/`, ignored by Git and absent from the public build:

- `{home,venture-architect,commissions,work,about,contact,404}-{1440,390}.png`: site captures. Matching files prefixed `reference-` show the supplied references.
- `commission-flagship-390.png` and `commission-margin-390.png`: phone details showing flagship and focused-offer hierarchy.
- `lighthouse-*.report.html` and `.json`: full audit results and measurement profiles.
- `browser-checks.json`, `keyboard-checks.json`, `fallback-checks.json`: recorded browser checks.
- `print-commissions.pdf`, `print-venture-architect.pdf` and `print-review-final.png`: print review evidence.

The existing Astro implementation and current [Astro static route documentation](https://docs.astro.build/en/reference/routing-reference/) informed the static text endpoint. The supplied Cobalt handoff remains the design and copy reference.

## Remaining review

No implementation question needs an answer to run this preview. Will should review the proposed public copy and the local pages before any publication decision.

- Native screen-reader testing, Safari/Firefox and physical-phone checks were not performed. Lighthouse accessibility checks and the keyboard/semantic review are evidence, not a claim of complete WCAG conformance.
- Native 200% text enlargement and 400% browser zoom were not exercised in the in-app browser. The 320px reflow check covers the equivalent narrow layout, but does not substitute for both tests.
- Reduced-motion rules were inspected and cover scrolling, transitions and animation. An operating-system reduced-motion preference was not toggled during this review.
- Cloudflare headers, redirects, live-domain behavior and deployed compression remain outside this local implementation task. Analytics stays at its existing opt-in setting; this review enabled none.

The local preview is served by `npm run preview -- --host 127.0.0.1 --port 4323`. Its Commissions URL returned HTTP 200 at handoff. The temporary reference and fallback-test servers were stopped; the main preview remains running. If it is later stopped, the same command restarts it.
