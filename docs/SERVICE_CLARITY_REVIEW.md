# Service clarity review

Date: 2026-10-02

## Problem and resulting behavior

A first-time visitor had to pass the full venture engagement before discovering the other services. The main headings described situations without clearly naming the services being offered.

Services now opens with a compact introduction and a complete six-service overview. Venture design & leadership remains the featured engagement, beside four focused assessments and reviews, with AI portfolio workshops immediately below. Home uses the same content-backed overview before the selected work and detailed process. Visitors can still start a conversation without choosing a service.

Navigation uses Services and Approach. The public routes remain `/commissions/` and `/venture-architect/`; existing service anchors and metadata identifiers are preserved.

| Visible service | Existing detail anchor |
| --- | --- |
| Venture design & leadership | `#venture-commission` |
| AI opportunity assessment | `#options-brief` |
| AI acquisition diligence | `#ai-diligence` |
| AI cost & margin review | `#ai-margin-review` |
| Venture progress & funding review | `#gate-review` |
| AI portfolio workshops | `#portfolio-sessions` |

Each service detail names the service first, followed by when it helps, what Will does, what the client receives, and the client participation or scope required. Services and Approach distinguish design and build oversight from agreed interim technical leadership. The existing requirement that the client provides the build team is stated more directly. No prices, durations, new capabilities, case outcomes or commercial guarantees were invented.

The Cobalt palette, fonts and artwork remain. The overview adds no runtime JavaScript or dependencies. Home and Services use one shared component and the same canonical content. Page metadata, linked Service data and llms.txt continue to derive from that content. The mobile homepage image is positioned below the text, and the Approach headline is sized for its new wording.

## Validation

- `npm run check`: type checks, copy lint, seven-page static build, site integrity, accessibility/metadata regression checks, and all seven interaction tests passed.
- Added regression coverage for the six service names, summaries, headings, destination links and overview position on Home and Services.
- Browser layout matrix: all seven routes at widths 320, 390, 768 and 1280 CSS pixels, with default styles, 200% root text size, increased text spacing, and both text modifications together. All 112 combinations passed the document-width and text-overflow checks.
- Visual inspection: desktop and phone Services overview, desktop and phone Home, desktop Approach and a focused service detail. At 1280 x 720 all six service names are visible in the first Services screen. At 390 x 844 the overview starts in the first screen and the remaining services follow within a short scroll.
- All six overview links on Services reached their existing detail anchors. A Home service link reached the corresponding Services detail. The focused detail landing was inspected visually after scrolling settled.
- Keyboard check: Skip to content is visibly focused and moves focus to main; the flagship overview link has a visible focus outline.
- With scripts blocked, Home and Services retain all six overview links, and the Home and Approach content panels remain readable.
- Independent read-only review found no material content inconsistencies or implementation regressions.
- `git diff --check` passed.

These checks are browser and source checks, not a human usability study, native screen-reader test, native browser-zoom test or full accessibility conformance certification. The broader native-device and assistive-technology follow-up in WEB_READINESS_REVIEW.md remains applicable.

## Release scope

Commit and push only the existing `codex/cobalt-commissions` preview branch. Do not merge to main or change the production domain, DNS, hosting configuration, analytics or account permissions.
