# Web readiness implementation review

Implemented October 2, 2026, following Will's approval of the October 1 audit. Base commit: `c671dad85ca5592a9fa6f5cf82b6fd6c5bab5506`. Branch: `codex/cobalt-commissions`.

Preview branch: https://codex-cobalt-commissions.crispy-meme-soon.pages.dev/

## Changes

- Added explicit list roles to editorial lists whose markers are removed, and a site-wide footer landmark on invitation pages.
- Rendered an empty, persistent polite status region before interaction. Selectors now announce the approved selected-panel summary only when selection changes; initialization and repeated selection remain silent. Native buttons, retained focus, and script-free reading are preserved.
- Converted text sizes to relative units and responsive breakpoints to em units. Navigation, links, the illustrative document, and About's portrait caption now accommodate enlarged text. Compact sheets use an unrotated flowing layout so the seal and footer cannot crowd the content. Selected stages have an underline as well as color; forced-color rules use system colors and explicit outlines. Existing reduced-motion behavior remains.
- Connected Person, WebSite, and canonical page metadata with stable identifiers. Added six Service records on Commissions using existing visible names, summaries and scope boundaries. Added no claims, prices, ratings or availability promises.
- Added pinned development-only type-check tools, semantic/metadata regression checks, and seven selector behavior tests. `npm run check` runs the full suite. GitHub Actions runs the same suite on pushes and pull requests with read-only repository permissions and commit-pinned actions.

The canonical content JSON, approved image assets, Cobalt colors, production dependencies, analytics opt-in, and hosting configuration are unchanged. The existing first-party JavaScript is retained only to progressively enhance the three selectors; no new runtime dependency or third-party script was introduced.

## Completed validation

| Check | Result |
| --- | --- |
| Complete local check | Type checking: 23 files, zero errors, warnings or hints. Copy lint, static build, route/link/asset checks and semantic/metadata checks pass. All seven interaction tests pass. |
| Responsive and text stress | 112 browser cases: seven views at 320, 390, 768 and 1280 CSS pixels, each with default text, 200% root text, increased spacing, and both together. No document overflow or overflowing inspected text boxes in the final matrix. |
| Stress method | Temporary local response styles set root font size to 200%; spacing uses line-height 1.5, letter-spacing .12em, word-spacing .16em and paragraph margin-bottom 2em. Fonts were allowed to settle before measurements. These fixtures are not shipped and do not substitute for native browser zoom or font preferences. |
| Keyboard | All nine work/stage/layer choices operate with Enter or Space, retain focus and expose the correct selected panel. Changed selections populate the persistent status with the expected approved summary. Layer artwork follows selection; skip link focuses main. Spoken announcements were not evaluated with a native screen reader. |
| Resource failures | Seven views tested with scripts, images, fonts and stylesheets blocked separately using local CSP response headers (28 cases). Main text and email links remain available. Without scripts, all six Home panels and all three Practice layers are readable and selector controls are hidden. Without CSS, native reading order and controls remain; unconstrained images can require horizontal scrolling. |
| Visual review | Final default desktop Home and phone Commissions reviewed in the in-app browser. Mobile sheet and portrait adjustments intentionally permit additional vertical space. |
| Metadata | All graph references resolve. Services match approved visible copy and real section anchors. About, Contact, Practice and 404 have the expected page records. |
| Change hygiene | `git diff --check` passes; canonical content has no diff. Dependency installation reported zero known vulnerabilities. No new performance or complete accessibility score is claimed. |

The semantic checker deliberately enforces explicit list roles on the project's non-navigation lists. That is a project convention for the current unbulleted design, not a universal requirement for all HTML lists.

## Remaining manual verification

These changes complete the audit's recommended code work. They do not establish full WCAG conformance or support for every device.

- Test current Safari/macOS/iPhone/iPad, Firefox desktop and a physical Android phone; record versions, orientation and touch behavior.
- Test VoiceOver with Safari, NVDA with Firefox or Chrome, and TalkBack with Android Chrome. Verify landmarks, lists, reading order, every selector, spoken status and contact access.
- Test native 200% text enlargement, 400% browser zoom, larger default fonts, Windows forced colors, OS reduced motion, voice input and current print output. The CSS safeguards are implemented; native preference behavior and print were not re-certified in this pass.
- Perform representative human comprehension testing and slow-connection checks. Previous Lighthouse results remain historical lab evidence; new production real-user Core Web Vitals are not available.

## Production launch checks

Keep the preview excluded from indexing. Before a separately authorized production launch, verify production status codes, HTTPS/canonical redirects, sitemap and social-image access, and absence of an accidental noindex rule. Check Search Console ownership, sitemap submission, URL inspection and search/AI inclusion controls. Review real-domain Cloudflare bot/WAF/challenge behavior using relevant logs; robots.txt alone does not establish agent access. Confirm the intended analytics setting and obtain real-user performance evidence when traffic allows.

This pass does not change the production branch, custom domain, DNS, Cloudflare account settings or Search Console settings. Semantic HTML and content-backed metadata improve machine readability without guaranteeing search ranking or AI inclusion.
