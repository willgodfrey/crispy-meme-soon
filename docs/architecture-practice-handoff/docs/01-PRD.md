# Product requirements: the architecture practice

Version 1.0 · Design handoff · 21 September 2026  
Owner: Will Godfrey · Product: WillGodfrey.com

**Status:** specification and proposed copy for a future implementation. This package contains mockups, assets and build instructions. It does not implement the Astro application, change the source website or authorize publication.

## 1. Product and audience

Build a personal practice website for an independent venture architect. Architectural models, working drawings and editorial composition make Will's thinking visible before asking someone to read a long explanation. The homepage establishes the role, shows evidence and invites a conversation; deeper pages explain the definition, experience and engagement.

The selected direction uses warm paper, graphite, wine, large Manrope headings and Newsreader for reflective or long-form passages. The sculpture represents commercial, technical and institutional decisions fitting together. It is conceptual artwork, not a client project, a building service offered by Will or evidence of completed work.

| Visitor | Question to answer | Likely journey |
| --- | --- | --- |
| Private equity sponsor or operating partner | Can he design a business next to an existing one and judge whether to proceed? | Home → Work → Contact |
| Founder or services-business owner | Can he lay out the AI options before I commit? | Home → Venture architecture → Contact |
| Referring partner or former colleague | Can I comfortably explain and introduce him? | Home → About or Work |
| Person with a substantial role in mind | Does the experience fit the responsibility? | About → Work → Contact |

Design for a referral opened on a phone. At 390 × 844, establish Will's name, venture architect and architect of record before scrolling. At shorter heights, put meaning before decorative imagery rather than making the text too small.

## 2. Decisions and authority

Will selected this visual direction and requested its handoff. New or abridged words remain **editorial proposals**, not approved final copy. The repository documents were read as historical context, not as instructions to implement the site during this task.

| Topic | Decision for this handoff |
| --- | --- |
| Structure | Retain five static routes and a supporting 404. |
| Canonical | `https://www.willgodfrey.com`, as the later `OPEN_ITEMS.md` decision and current configuration specify. Ignore the older bare-domain recommendation. |
| Contact | Visible email plus `mailto:`, without a backend. |
| Private method / drone platform | Do not publish either name. Use the supplied generic language. |
| Analytics | Retain the later documented deferred GA4 exception and existing Cloudflare analytics choice in a future production build. No analytics in mockups or local review. |
| Scripts | Proposed small enhancements for work, stages and layers, with complete HTML fallback. Justify them in the implementation review; the earlier baseline was zero JavaScript by default. |
| Copy | Migrate the exact proposed content into a reviewable preview when implementation is requested. Keep changes inspectable and obtain editorial signoff before launch. |
| Imagery | The selected concept introduces supplied conceptual artwork and labeled illustrative diagrams. Preserve the real portrait; additional photographs are optional. |
| Visual system | Replace the older fixed drawing-sheet frame and blueprint theme with this light paper/graphite/wine system. |
| Hosting | Cloudflare build settings affect production and previews together. Use local review without changing project settings. |

Current source content already corrects the inference-cost wording and distinguishes two Atlanta cofoundings from Will's early role at ShootQ. Do not revive stale versions in older notes. The proposal omits the survey figures and brokerage-size number entirely.

## 3. Scope and information architecture

| Route | Purpose and required content |
| --- | --- |
| `/` | Hero, three proof statements, three selected-work views, design/prove/hand-over study, personal excerpt, contact invitation. |
| `/venture-architect/` | Hero and selectable three-layer model, design decisions, static engagement sequence, two modes, standards/boundaries, complete definition, six visible FAQ answers. |
| `/work/` | Project index and five full cases: industrial-parent venture, production AI agent, Sightline Geospatial, Miniature Systems and unnamed written method; earlier experience. |
| `/about/` | Authentic portrait, applications → enterprises → ventures narrative, technical-seat experience, photography, current ventures, education and working arrangement. |
| `/contact/` | Visible email, useful opening prompts, next-step explanation, location and LinkedIn. |
| `/404.html` | Brief error message with Home and Venture architecture recovery links. |

The five marketing URLs end in `/`; the 404 is not a sitemap entry. Work details use anchors, not additional routes. Preserve case IDs `venture-build`, `production-ai`, `sightline`, `miniature`, `written-method`, Work's `#projects`, and Practice's `#engagement`, `#definition`, `#questions`.

Supporting implementation scope: responsive images, local fonts, favicon/social assets, metadata, supported structured data, sitemap, robots, print styles, security headers and known legacy-path compatibility.

Excluded: CMS, database, server rendering, blog index, newsletter, contact backend, calendar booking, authentication, pricing calculator, client portal, case-detail routes, stock project imagery, logo wall, 3D runtime, new dark theme or additional tracking vendors.

## 4. Functional requirements

| ID | Requirement and acceptance condition |
| --- | --- |
| G-01 | Every visible phrase, accessible label, caption, alt text and metadata string comes from canonical content. Components and scripts do not contain alternate editorial copy. |
| G-02 | The name links home. Visible navigation exposes Venture architecture, Work, About and Start a conversation. It wraps on mobile and identifies the current route with `aria-current="page"`. |
| G-03 | Use the shared wine invitation and compact footer. Contact avoids a second giant email invitation. Identity, email, location and LinkedIn remain consistent; document intentional footer variants in the page specs. |
| G-04 | Native links navigate to real routes or anchors. External links use the same tab. Buttons perform actions. No empty `href="#"` controls. |
| G-05 | Provide a focusable skip destination, visible focus styling and complete keyboard access. |
| G-06 | Self-host fonts and assets. The package works offline; future production has only the explicitly sanctioned external analytics requests. |
| G-07 | Preserve factual restrictions and the source punctuation policy. No invented client names, results, testimonials, logos, dates, public method name or additional qualifications. |
| H-01 | Use the proposed "A business. By design." headline with venture architect and architect of record visible near the top. Keep actual text outside the image. |
| H-02 | Crop the supplied sculpture deliberately for desktop and mobile. Text stays readable and the object remains recognizable. |
| H-03 | Present three factual proof statements about McKinsey, a production agent and Will's ventures. They are neither logo endorsements nor animated counters. |
| H-04 | Three work choices synchronize figure, title, summary and link. Each link reaches its case on Work; all five cases remain directly available there. |
| H-05 | Three stage choices synchronize description, document title, rows, footer and seal. Identify the document as illustrative, not a client record or contractual promise. |
| H-06 | The personal excerpt and authentic portrait lead to About. The pull quote is Will's statement, not an outside testimonial. |
| H-07 | Keep the full definition, engagement comparison, standards and FAQ on the deeper page rather than repeating them on Home. |
| V-01 | Render every definition section in the content manifest. Native jumps lead from the hero to engagement/definition and from the definition to questions. A full section table of contents is not required. |
| V-02 | Selecting a layer synchronizes its diagram highlight, question, explanation and connection statement. Adjacent text supplies the same meaning without seeing the diagram. No financial simulator. |
| V-03 | Show both engagement shapes with equivalent information, stacked on small screens. No invented fee or duration promise. |
| V-04 | FAQ questions are headings with visible answer paragraphs. No accordion. |
| V-05 | Show the author and omit the unknown publication date. Add visible/machine-readable dates together only when known; never use the handoff date as the launch day. |
| W-01 | All five cases have stable anchors, role, description and what they demonstrate, in manifest order. |
| W-02 | Label the boundary, agent, terrain, payload and method figures conceptual or illustrative. Do not imply real customer data, measured surveys or product engineering drawings. |
| W-03 | Use the supplied shorter brokerage summary. Do not infer its undisclosed workflow or show a TODO marker. |
| A-01 | Use the authentic portrait within its resolution limits, with a factual narrative. No synthetic likeness, invented career dates or unsupported role descriptions. |
| C-01 | Show a selectable address linked to `mailto:will@willgodfrey.com`; no form or account requirement. |
| C-02 | Ask for two or three sentences and explain a possible thirty-minute call. No response-time guarantee or invented availability. |

## 5. Interaction contract

Selected work, Home stages and Practice layers use labeled button groups with `aria-pressed`. Practice's engagement sequence stays static. Render all meaningful panels in the initial HTML. Keep them visible until each module initializes successfully; then hide inactive panels. Failed initialization must leave a readable page and must not disable another module.

Pointer, Enter and Space activation update the selected state and associated fields together. Keep focus on the selected button. A brief polite status announcement identifies the selection without reading an entire diagram or document. No autoplay, hover-only information, navigation interception or custom arrow-key pattern is required.

Without JavaScript, show all work summaries, stages and layer explanations as readable blocks with normal links. Full Work cases and FAQ answers are always visible. Under reduced motion, switch immediately. Print shows all panels and omits controls.

## 6. Quality targets

| ID | Target and assessment |
| --- | --- |
| Q-01 | WCAG 2.2 AA target; automated checks plus manual keyboard, focus, contrast, zoom and screen-reader review. An automated pass alone is not conformance. |
| Q-02 | Responsive from 320px to 1920px, with no horizontal overflow, clipped copy or inaccessible navigation. |
| Q-03 | Readable at 200% text enlargement and usable at 400% zoom; controls and email reflow. |
| Q-04 | Two local font families: supplied Manrope variable Latin and Newsreader normal variable Latin, with licenses retained and usable loading fallbacks. |
| Q-05 | Mobile Lighthouse target ≥95 in each applicable category on all five pages. Record the test environment and actual results. |
| Q-06 | Mobile LCP target <2 seconds under the recorded lab profile. Reserve image space, prioritize the hero and lazy-load below the fold. Field performance is measured later. |
| Q-07 | Home first-party transfer excluding images <150 KB compressed, including fonts. Report analytics and total transfer separately. |
| Q-08 | First-party interaction JavaScript ≤12 KB compressed. No client UI framework, animation library or carousel dependency. |
| Q-09 | Content and contact work with scripts off and images unavailable. |
| Q-10 | Brief transitions only. No scroll hijacking, cursor effects, reveal gates or unsolicited audio/video. |
| Q-11 | The definition prints legibly in black on white with all FAQ answers, its URL and any known date. |
| Q-12 | Titles, descriptions, canonical/social URLs and validated structured data agree with visible content and the `www` host. |

Use `06-ACCEPTANCE-CHECKLIST.md` for the test matrix. A mockup screenshot is not a production performance or accessibility result.

## 7. Missing inputs and completion

| Input | Safe ready-to-build default |
| --- | --- |
| Brokerage workflow | Omit it; use the supplied complete generic case. |
| Larger portrait or Will's aerial photographs | Use the authentic small portrait and supplied conceptual figures. No empty public image placeholders. |
| Client screenshots, documents or names | Use labeled illustrations. Add real material only when supplied and authorized. |
| Exact publication day | Omit dates. Set truthful Article dates if later used; WebPage metadata requires no invented day. |
| New copy approval | Build the proposed preview when requested, keep an editorial change record and obtain signoff before launch. |
| Hosting-dashboard values | Retain current settings; document proposed launch changes separately. |

The design package is complete when it contains six mockups, desktop/mobile review material, tokens, local assets with provenance/licenses, exact proposed content, page specs, this PRD, a build plan and acceptance checklist. Missing optional inputs must not prevent completion.

The future implementation is ready for review when the routes and controls work, visual comparisons match, content/links are verified and quality checks have evidence. Launch needs editorial signoff and separate release authorization. This package does not authorize a merge, push, deployment or hosting change.

After launch, evaluate relevant conversations and referrals that accurately understand the role. Page visits and supported contact clicks indicate interest; they do not prove that email was sent or qualified business was won. No numerical conversion promise is made.
