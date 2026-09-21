# Architecture practice: design system

Version 1.0. Design specification for implementation. The HTML in `mockups/` is a visual reference, not the production application. `design-tokens.json` is the machine-readable companion.

## Visual intent and limits

The selected identity is an independent architecture practice for AI-native businesses. It has material presence, calm typography, and a clear relationship between decisions and evidence. Keep the bespoke assembly artwork, spacious compositions, chalk/graphite/wine palette, and direct writing.

Do not recreate the earlier cream-and-rust typographic concept. Do not add the old drawing-sheet frame, fixed revision block, blueprint dark mode, dashboard cards, a logo wall, stock images, floating decorative shapes, or an animation framework. The small wine square beside the name is the wordmark's only ornament. One lightly rotated document in the stage explorer is the only shadowed object.

The detailed venture diagram belongs on the practice page. Reuse its underlying geometry in the project illustrations. It is an explanation of the role, not a representation of a real client's system.

## Color

| Token | Value | Use |
| --- | --- | --- |
| paper | `#FAFAF7` | Main page canvas, document surface, text on wine |
| chalk | `#ECEDE9` | Quiet secondary sections |
| ink | `#252729` | Primary text, selected stage button |
| wine | `#622B3D` | Links where distinguished by color, focus, selected model plane, contact field |
| muted | `#5B6060` | Secondary text on paper or chalk |
| line | `#CDD0CA` | Structural separators; never body text |
| workSurface | `#E6E9E5` | Project model backgrounds |
| processSurface | `#E9EAE5` | Engagement field |

Text on wine uses paper or `#EADCE0`. Wine is not an accent applied to a single word in a headline. Use a consistent light palette independent of operating-system theme; an automatic dark treatment is outside this handoff. Let user agents handle forced-colors mode without removing focus or native controls.

## Typography and bundled font files

Manrope is used for display, navigation, short body copy, and annotations. Newsreader is used for the definition's reading column, About prose, and the short personal quotation. Keep the hierarchy within these two families.

| Role | Desktop | Phone | Weight / leading / tracking |
| --- | --- | --- | --- |
| Home hero | `clamp(72px,6.8vw,104px)` | `clamp(48px,16vw,64px)` | Manrope 500 / 1.01 / -0.065em |
| Inner-page title | Usually 64-108px; see page spec | 42-68px, page dependent | Manrope 500 / 1.01-1.03 / -0.055em |
| Section heading | `clamp(34px,4.2vw,62px)` | 34-36px | Manrope 500 / 1.1 / -0.055em |
| Case title | 33-51px | 30-36px | Manrope 500 / 1.12 / -0.045em |
| Body | 17px | 16-17px | Manrope 400 / 1.65 / normal |
| Long reading | 21px on practice; 24px on About | 20px on practice; 22px on About | Newsreader 400 / 1.5-1.55 / normal |
| UI | 13px | 12-13px | Manrope 600 / 1.6 / normal |
| Caption | 12px | 11-12px | Manrope 400 / 1.5 / normal |

Keep body measures at 35-60 characters; definition prose at no more than 62ch. Do not justify text. Use supplied `titleLines` for intentional display line breaks where the reference uses them. At 320px, a natural additional wrap is preferable to clipping or shrinking below the stated minimum.

Bundled files:

- `assets/fonts/manrope-latin-variable.woff2`: weights 200-800; use 400, 500, 600, 700.
- `assets/fonts/newsreader-latin-variable.woff2`: regular weight 400, variable optical size. Use `font-optical-sizing: auto`; do not declare a 200-800 weight range for this file.
- Separate OFL license files and `assets/fonts/sources.json` preserve provenance.

Self-host in production. Preload Manrope only on the first route; do not preload unused font weights or the below-fold reading face. Use `font-display: swap`. Do not request Google Fonts at runtime. The original families and license sources are [Google Fonts Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) and [Google Fonts Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader).

## Layout and spacing

Use a full-width canvas with outer padding `clamp(20px,5vw,96px)`. Do not force the artwork into a narrow 1120px site container. The effective layout grid is 12 columns, with approximately 32px desktop gaps and 24px phone gaps. Text and image measures, rather than one global max-width, constrain each section.

Breakpoints: phone through 620px; compact desktop/tablet through 900px; full desktop above 900px. At 1600px and up, selected image fields can gain height as shown in the references. Verify 320, 390, 768, 1024, 1440, and 1920px.

Standard section padding: approximately 104px desktop, 76px tablet, 60px phone. Page-specific transitions may be tighter. Use actual layout, not arbitrary empty spacer blocks. Secondary headings do not all need a rule. The main visual rhythm alternates a full image, a quiet strip, an asymmetric spread, a material field, and open reading space.

## Shared shell

Header: 94px tall on desktop, name at left, four real page links at right. The name is Manrope 700 at 22px with a 9px wine square. On phones the navigation wraps below the name; never hide a page link merely to preserve a one-line header. No hamburger is required. Give every navigation target at least 44px height. Mark the active page with `aria-current="page"` and an underline.

The shared invitation is a wine field: a large question at left and email at right; these stack on a phone. Keep the address selectable and use the actual `mailto:` link. The footer has identity, location, and LinkedIn. Contact and 404 use compact footer variants. The `Design reference` link in mockups is review chrome and must not ship.

## Images and diagrams

### Assembly hero

Use `assets/images/assembly-master.png` as the source. Its original dimensions are 1536 by 1024; do not claim it is a higher-resolution master. AVIF and WebP derivatives at 640, 960, and 1536px are included. They are the same artwork, resized and encoded without changing the composition.

Desktop: image fills the hero with `object-fit: cover`, centered around 50% vertically. It may crop the top and bottom of the assembly. Position text over the quiet left area. A left-to-right chalk scrim preserves text contrast; this is a readability device and should closely match the reference.

Phone: text occupies the top; a 430px image field sits at the bottom of an approximately 810px hero. Transition the upper chalk field into the image. Keep the structure legible rather than forcing a tiny full-image thumbnail. At all sizes, text is real HTML, never baked into the artwork.

Supply width and height. Hero is eager/high priority. All below-fold images are lazy. Use a responsive picture with AVIF, WebP, and the supplied JPEG as final compatibility fallback. Do not preload multiple format variants.

### Portrait

The supplied portrait is a genuine existing image of Will, 400 by 400. Display no larger than approximately 320px on About and 122px in the Home personal note. A grayscale treatment is a CSS presentation choice. It remains useful without a new photograph. A future environmental portrait is an optional upgrade, not a reason to block implementation or invent a photograph.

### Explanatory graphics

Six editable SVGs are included: parent/venture boundary, AI workflow, terrain, hardware payload study, decision gates, and three venture layers. Their file/semantic IDs and alt text are in `assets/asset-manifest.json`.

Retain the visible illustrative captions. Do not describe any graphic as a screenshot, measured result, client's diagram, or photograph of an actual product. Inline the venture-layer SVG when interactive styling is needed; `<img>` is appropriate for the other drawings. Standalone SVG labels use an explicit fallback font because external SVG images do not inherit the page's font context. Their labels can be set in Manrope when safely inlined.

## Interaction contracts

All content exists in server-rendered HTML. Enhancement hides inactive panels only after event handlers are ready. With JavaScript unavailable, all project, stage, and layer descriptions appear in a readable sequence; controls that cannot work are omitted. No autoplay, pointer-tracking, scroll-jacking, or remote requests.

| Module | Initial state | User action | Visible response |
| --- | --- | --- | --- |
| Home selected work | Venture build | Choose Production AI or Own venture | Replace illustration, role, title, summary, evidence and project link together |
| Home engagement | Design | Choose Prove or Hand over | Replace the illustrative sheet and the stage explanation together |
| Practice layers | Commercial | Choose Technical or Institutional | Highlight the matching SVG plane and replace question, explanation and connection statement |

Use a labeled group of ordinary buttons with `aria-pressed`, `aria-controls`, visible focus, and all controls in the Tab order. Space/Enter activates them. This is not an ARIA tabs interface, so do not introduce incompatible arrow-key/tablist behavior. Keep keyboard focus on the pressed button. A polite status announces only the selected control's label, not the entire page. Do not change URL or scroll position when a selection changes.

Reserve enough space for the tallest panel at each breakpoint, or allow normal flow without jumpy transitions. Buttons have at least 44 by 44px hit areas. A light divider and selected underline distinguish the work/layer state; dark fill distinguishes the stage state. Color is not the sole cue.

Within-page links are native anchors. Cross-page links use the real routes, and the Work project links include stable IDs. Do not attach smooth-scrolling JavaScript. If CSS smooth scrolling is retained, disable it for reduced motion.

## States and accessibility

Focus: 3px wine outline with 4px offset; use paper outline on wine. Body/link contrast must meet WCAG 2.2 AA. Decorative hairlines need not meet body-text contrast, but meaningful diagram controls and labels must. Test zoom at 200% and a 320px-wide reflow.

Links remain recognizable on hover and focus. State changes are functional even when transition durations are zero. Use native lists, headings and definition lists; diagrams need descriptive alternatives. The text is the accessible explanation of the image, so no critical claim exists only inside a diagram.

404 is the only error state required. Contact has no submission, loading, success, or validation state because there is no form. An unavailable email app does not hide the visible, copyable address. No custom loading spinner is required for a static page.

## Reference versus implementation

The mockups are deliberately simple HTML/CSS references. They do not implement production routing, the repository's content pipeline, complete metadata, analytics controls, security headers, or deployment. Do not copy the entire mockup folder into `public/` and call the work complete. Translate the compositions into the existing Astro structure using the plan, supplied content and assets.

The production quality targets and checks in the PRD/acceptance checklist are requirements for the future build, not claims that a production site has been built or audited here.
