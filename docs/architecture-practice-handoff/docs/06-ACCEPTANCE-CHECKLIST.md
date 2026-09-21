# Acceptance checklist for the future implementation

These checks are requirements for the implementing agent. They have not been run against a production implementation in this design task. Use `HANDOFF-VALIDATION.md` for checks actually performed on the package.

Record pass/fail, the tested commit/build, browser or tool version, viewport, and evidence location. An untested box is not a pass. Do not substitute visual mockup approval for production testing.

## Content, scope and identity

- [ ] The five routes and custom 404 exist; Work cases are anchors, not additional pages.
- [ ] Header, typography, material artwork, wine accent and page compositions match this selected handoff rather than the older cream/ink or drawing-sheet designs.
- [ ] All visible copy, metadata, alternate text and control labels come from the migrated canonical content.
- [ ] Exact proposed copy changes are easy for Will to review. No claim of final editorial approval is made before review.
- [ ] Public output has no TODO markers, private method name, named drone platform, invented client results or undisclosed workflow.
- [ ] The venture CTO role does not imply CTO of McKinsey itself. Claims kept from source remain within the supplied wording.
- [ ] Contact, LinkedIn, location and canonical host match the content manifest.
- [ ] The genuine portrait is used within its resolution limits. No stock or fabricated project imagery appears.
- [ ] Conceptual/illustrative captions remain visible beside the corresponding diagrams and document study.
- [ ] Prototype noindex is removed from the five production pages; the 404 remains noindex. No `Design reference` link, comparison toolbar, internal notes or handoff metadata ships.

## Routes, links and metadata

- [ ] Every header/footer link works from every route, including 404 recovery.
- [ ] `/work/#venture-build`, `#production-ai`, `#sightline`, `#miniature`, `#written-method` and `#projects` land at the right content.
- [ ] Practice jumps `#engagement`, `#definition`, `#questions` work through direct URLs and navigation.
- [ ] The address is selectable text and the email link is `mailto:will@willgodfrey.com`; no contact form has been added.
- [ ] One canonical per page uses `https://www.willgodfrey.com` and the expected trailing slash.
- [ ] Titles/descriptions are route-specific. Sitemap includes only the five main routes; robots points at the correct sitemap.
- [ ] `/images/will-godfrey.jpg` continues to resolve and remains the selected share image unless Will changes that decision.
- [ ] Structured data matches visible facts and answers. Publication dates are absent when unknown; no handoff date is repurposed as a launch date.
- [ ] Real HTTP requests return correct main-route and 404 status codes. Legacy redirect decisions are based on an actual path audit.

## Responsive visual checks

Capture all six routes at 1440px and 390px; inspect 320, 768, 1024 and 1920px widths. Use the same viewport dimensions when comparing a production build with a mockup.

| Page | Key checks |
| --- | --- |
| Home | Name/role visible early; heading stays readable over the image; assembly crop intentional; proof strip reflows; every selected-work state fits; rotated sheet and seal do not overlap labels; quotation and portrait have balanced space. |
| Practice | Title and model remain distinct; all layer labels readable; no cut-off controls; modes stack; reading measure stays comfortable; sticky rail releases on phone; all FAQ answers visible. |
| Work | Index wraps; all five case anchors land cleanly; alternating desktop layout becomes consistent phone reading order; drawings/captions fit; details do not form tiny columns. |
| About | Portrait not stretched; career arc is understandable without dates; serif reading copy remains legible; charcoal photography field has sufficient contrast. |
| Contact | Address never clips; text remains legible over decorative image; email and explanation precede secondary prompts on phone; no repeated full contact invitation. |
| 404 | Message, Home and Practice recovery links visible; no giant inaccessible visual pushes navigation away. |

- [ ] No page-level horizontal overflow at any required width.
- [ ] Header shows all links with adequate touch areas; no content is hidden to force a desktop header onto a phone.
- [ ] At 200% text size and 400% browser zoom, content and controls reflow without loss of function.
- [ ] Manrope and Newsreader load locally with the correct weights. No font synthesizing a missing heavy serif or requesting a CDN.
- [ ] Body text and interactive labels have sufficient contrast; important diagram information also appears as text.
- [ ] There is no unrequested automatic dark scheme, entrance animation, scroll hijacking or pointer effect.

## Interaction tests

| Module | Required test |
| --- | --- |
| Selected work | Click all three choices and repeat with Tab/Space/Enter. Figure, title, role, summary, evidence, selected state and destination all match the same case. |
| Engagement | Activate Design, Prove and Hand over. Sheet title, all five rows, footer, seal and explanation update together. |
| Layer model | Activate all three layers. The correct plane changes and the corresponding question/body/connection text is shown. |

- [ ] Focus stays on the activated button, selected state is not color alone, and a concise polite status is announced.
- [ ] Selection neither navigates nor unexpectedly scrolls the page. No autoplay or hover-only information.
- [ ] Modules initialize independently; a missing target does not hide content or prevent another module working.
- [ ] With JavaScript disabled, all work summaries, stage content and layer explanations are present; nonfunctional controls are absent.
- [ ] Reduced-motion preference removes smooth scrolling and animated transitions.
- [ ] FAQ remains fully visible and static. Work's case detail is not hidden behind the Home selector.
- [ ] Print shows all meaningful panels and hides controls/review chrome. The definition prints in a clear reading order without clipped text.

## Accessibility and resilience

- [ ] Automated accessibility scan on all five pages and 404 has no unresolved serious/critical findings.
- [ ] Manual keyboard walk covers skip link, navigation, selectors, Work anchors, definition jumps, contact and 404 recovery.
- [ ] Each page has one H1, logical subheadings, landmarks and meaningful image alternatives. Decorative crops have empty alt.
- [ ] Skip link moves focus to `main` reliably. Focus rings remain visible against every surface.
- [ ] Screen-reader spot checks confirm control labels/selected states, hidden-panel behavior and complete long-form reading.
- [ ] Forced colors, images blocked and slow font loading do not remove essential information or contact access.

## Build, performance and release

- [ ] Pinned toolchain/lockfile reproduce the build; unrelated baseline failures are distinguished from new failures.
- [ ] Copy lint, schema validation, complete text comparison, type checks and built-link checks pass. `npm run check` actually covers its documented checks.
- [ ] Responsive image dimensions prevent layout shift; hero is eager and below-fold art lazy. Do not ship the PNG source master as a normal page asset.
- [ ] First-party JavaScript is at most 12 KB compressed and first-party Home transfer excluding images is under 150 KB compressed, including fonts. Report actual numbers.
- [ ] Mobile Lighthouse targets and LCP target are evaluated in a recorded production-build profile on each main route. Document failures honestly, including analytics impact.
- [ ] Only the sanctioned production analytics run. Local/private design review sends none; do not add duplicate Google or Cloudflare beacons.
- [ ] CSP and other security headers fit actual resources; no broad wildcard or inline-script exception is added without necessity and documentation.
- [ ] No source masters, reference documents, development pages or private content is accidentally included in public output.
- [ ] Will receives the complete preview, matched desktop/phone captures, actual test results, editorial change list and any justified deviations.
- [ ] Editorial approval and release authorization are recorded before publication. Repository/hosting/DNS settings are not changed merely to make a mockup preview work.
