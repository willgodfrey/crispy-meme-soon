# Fresh-perspective audit fixes

Implemented on 2 October 2026 for the `codex/cobalt-commissions` preview branch.

## Changes

- Contact information now sits on an opaque chalk surface. Helper text is at least 14 CSS pixels at the default text size, and the email retains a visible keyboard focus indicator. The weakest contact text/background pair is 4.87:1; the email/focus pair is 6.49:1.
- Informative SVG connectors, outlines and contours use stronger contrast. The weakest revised informative pair is 3.36:1. Faint construction grids remain decorative.
- The margin illustration's text alternative now states the complete equation and cost categories.
- The service navigation landmark is named “Service details,” including on the homepage where its links go to another page.
- Services explains who the work is for and what needs to be in place, using the existing business scope. Visitors still do not need a finished brief or a chosen service before making contact.
- Work includes a readable, semantic decision-record template with six fields. It is explicitly illustrative, contains no client information and works without JavaScript.
- The unqualified “North America's first” wording has been removed consistently from Work, About and Approach pending a precise, supportable scope.
- A read-only deployment checker compares the six deployed pages against the intended local build, including copy, navigation targets, resource references, metadata and JSON-LD. It also checks discovery files, environment-appropriate indexing and a real 404 response.

## Verification

- `npm run check` passed: Astro/type checks (25 files, no errors/warnings/hints), copy lint, seven-page build, site and accessibility/metadata regression checks, and all seven interaction tests.
- Browser layout checks passed in 112 combinations: seven routes at 320, 390, 768 and 1280 CSS pixels, each at default text settings, 200% base text size, expanded text spacing, and both enlargements together. These are layout stress tests, not a substitute for native browser zoom or physical-device testing.
- Contact and the method template were visually reviewed at phone and desktop widths. Keyboard navigation reached the email and displayed a 3-pixel cobalt outline with a 4-pixel offset.
- The method template exposed all six fields and its contact link with page scripts blocked. The Services accessibility tree exposed the complete margin equation and updated landmark name.
- All eleven diagram SVGs parse; updated asset hashes match. The inline and public venture-layer drawings remain synchronized.
- The deployment checker was exercised against the previous preview and correctly reported the changed copy and assets. Parser mutation checks detect missing JSON-LD and altered link targets.

## Release verification

Build the intended release, then run:

```sh
npm run build
python3 scripts/check-deployment.py https://DEPLOYMENT.pages.dev --environment preview
```

After a separately authorized production release, verify the production domain:

```sh
python3 scripts/check-deployment.py https://www.willgodfrey.com --environment production
```

The script reads public responses only; it does not deploy, change DNS or alter Cloudflare settings. It requires Python 3 and curl, and uses normal TLS certificate validation. Preview pages must remain noindex; production pages must allow indexing. Production URLs still served the prior site at the time of the audit, so production verification remains a launch gate.

## Remaining factual and validation work

- Publishable outcomes are still needed for the insurance-agent and venture-build cases: what changed for the business, with only approved facts and metrics. No outcomes have been invented.
- Confirm whether AI is the primary focus of venture work or an exclusive requirement. The current wording preserves the established focus without making a new exclusivity claim.
- A narrower reference group would be needed before restoring any “first” claim.
- Native assistive-technology testing (such as VoiceOver and NVDA), physical-device coverage, native zoom, and fresh performance/field measurements remain unverified. The earlier PageSpeed API attempt returned a quota error. The checks above are evidence for the tested scenarios, not a certification of universal accessibility.

No production branch, DNS or Cloudflare account configuration is changed by this work.

## Second cold-visitor review

A second review of the published preview used two independent reviewers without project history. One read all six public pages; the other entered directly on Services and followed the Contact journey. Both identified the six services, primary engagement, client responsibilities, named deliverables and email next step correctly. No contradictory service promises or blocking comprehension issues were found. The service overview was also reviewed visually at desktop and phone widths.

One small deliverable ambiguity was corrected: the margin review now promises “Prioritized recommendations for changes, plus a plan for measuring cost and quality.” This makes clear that the review provides recommendations and that the client's team implements production changes.

The remaining content opportunities require real business details: publishable outcomes from the work, examples of what an agreed first-build milestone can mean, and representative engagement cadence if Will wishes to publish it. These have not been invented. This is a qualitative review, not evidence that every possible visitor will interpret all wording identically.
