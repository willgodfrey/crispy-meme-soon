# WillGodfrey.com: Architecture practice

Version 1.0 | Prepared for Will Godfrey | 21 September 2026

This is the complete design and implementation handoff for the selected Architecture practice direction. It contains visual mockups and specifications. The production website has not been implemented or changed.

## Start here

1. Open `index.html` in a browser. Explore all five pages and the 404; use Desktop and Phone to compare layouts. No build, account or network connection is required for the visual references.
2. Give this whole folder, or its ZIP, to the implementing agent along with access to the existing website repository.
3. Use the prompt in `START-HERE.md` when you are ready to request implementation. It directs the agent to the exact specifications, proposed copy, assets and review checks.

## What is included

| Location | What it provides |
| --- | --- |
| `mockups/` | Six responsive, linked visual references. Home includes work/stage interactions; Practice includes the layer explorer. |
| `docs/01-PRD.md` | Product scope, audiences, route and behavior requirements, quality targets and boundaries. |
| `docs/02-DESIGN-SYSTEM.md` | Colors, fonts, type scale, spacing, image treatment, responsive and interaction rules. |
| `docs/03-CONTENT-AND-DECISIONS.md` | Copy provenance, proposed changes, prior decisions, conflicts and safe defaults. |
| `docs/04-PAGE-SPECS.md` | Exact page composition, content mapping, states, links and mobile behavior. |
| `docs/05-IMPLEMENTATION-PLAN.md` | Existing Astro baseline, artifact mapping, content migration, components and build sequence. |
| `docs/06-ACCEPTANCE-CHECKLIST.md` | Meaningful checks the future implementation must pass. |
| `content/site-content.json` | Exact proposed copy and metadata, including all five cases and the full definition/FAQ. |
| `design-tokens.json` | Machine-readable design values. |
| `assets/` | Original/optimized artwork, genuine portrait, six editable diagrams, fonts with licenses, existing favicon assets. |
| `assets/asset-manifest.json` | Asset IDs, files, dimensions, use, source, alt text and rights/provenance notes. |
| `HANDOFF-VALIDATION.md` | Checks actually performed on this package, separated from future launch requirements. |
| `FILE-MANIFEST.json` | File paths, sizes and SHA-256 checksums for package integrity. |

## Authority and status

Will has selected the visual direction. Page copy is a complete editorial proposal derived from the current project content, not a claim of final copy approval. The new composition and token specifications replace the earlier visual direction for this proposed build. Later recorded business decisions about the `www` canonical host, unnamed method, generic drone-platform wording, and approved analytics are preserved.

For implementation: use the PRD and page specifications for requirements, the design system/tokens for shared values, the content JSON for exact proposed text, and mockups for visual intent. If a small mockup detail conflicts with accessibility requirements, implement the accessible behavior and explain the adjustment. Do not silently invent missing facts.

The source repository observed for this package was `/Users/willgodfrey/Development/personal-websites/willgodfrey.com`, already an Astro project. The documents describe adapting it. Nothing here requires a new framework, external design account, hosted mockup service, or production deployment to review.

## Assets and optional upgrades

Everything needed to reproduce these mockups is present. The sculpture is original generated concept artwork, and the project drawings are explicitly illustrative. The real portrait is the existing 400px image, used within its limits. No client screenshots, hidden workflow details or future photography are required to complete the specified design.

A later environmental portrait and approved artifacts from Will's own work can improve it further. They are optional replacements with defined fallbacks, not blank boxes in the current design. Preserve the existing portrait share-image URL unless Will chooses to change it.

## Reviewing offline

The package uses local fonts, images, styles and scripts. Open `index.html` directly after extracting the ZIP. Local navigation and selectors work without a server. Email/LinkedIn links naturally require the appropriate email application or network destination when deliberately followed. If a browser restricts local previews, serve this folder with `python3 -m http.server 8766` and open the local address; this is only a viewing aid.

The HTML/CSS mockups are not the production app. They intentionally omit production content integration, full structured data, redirects, security headers, analytics and deployment. Implement those through the documented Astro plan rather than copying the review gallery into the public site.
