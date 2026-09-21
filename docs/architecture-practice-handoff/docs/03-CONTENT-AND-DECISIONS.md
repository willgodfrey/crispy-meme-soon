# Content and decisions

Status: proposed copy for the architecture practice design. This package is an implementation handoff and a set of reviewable mockups. It does not change the source website, approve publication or approve all proposed words by implication.

## The content source of truth

`../content/site-content.json` contains the complete proposed public copy for the five pages, the 404 page, shared navigation, invitations, accessibility labels, captions, page titles and descriptions. Use this file to build the mockups and to review the proposed language. Do not write alternate copy in components while implementing.

The source material was read from the existing repository at `/Users/willgodfrey/Development/personal-websites/willgodfrey.com`: `content/site.md`, `home.md`, `venture-architect.md`, `work.md`, `about.md`, `contact.md`, `docs/OPEN_ITEMS.md`, `docs/PRD.md`, `docs/TECH_SPEC.md` and `AGENTS.md`. The selected design study was `outputs/design-directions/architecture.html` in the handoff workspace.

The new language is editorial proposal, not additional factual evidence. The existing source copy is the evidence for Will's biography and work. There is no outside research, client verification or fabricated case-study evidence in this package.

## How to read the content model

| Key | Meaning |
| --- | --- |
| `meta` | Internal status and provenance. Never render as public content. |
| `common` | Shared identity, routes, accessible labels, invitations, footer, image text, structured-data fields and stages. |
| `home` | Hero, proof strip, selected work, engagement preview, personal note and invitation. |
| `practice` | The `/venture-architect/` page: hero, three layers, decisions, engagement, modes, standards, full definition, FAQ and invitation. |
| `work` | Project index, five complete project records, earlier experience and invitation. |
| `about` | Professional arc, venture CTO experience, photography, current practice and invitation. |
| `contact` | Email invitation, opening prompts, expectations and location. |
| `notFound` | Branded error page with recovery links. |

`route`, IDs, reference fields and asset references are data, not visible text. `title` is the semantic heading. `titleLines` is an optional art-direction hint for the desktop layout; it must never produce duplicate screen-reader headings, and it must not force the same line breaks on a narrow phone. Render arrays in their supplied order. Body paragraphs remain paragraphs, not a single dense block.

`common.stages` is the single source of stage copy. Resolve the IDs in `home.process.stageIds` and `practice.engagement.stageIds` against that array. Each stage has distinct deliverable text; changing the selected stage must change its title, body, list, footer and seal together.

`work.cases` is the single source of project copy. Resolve the three IDs in `home.selectedWork.caseIds` against that array. A home project link points to `/work/#` plus the case ID. The Work index uses those same IDs. Resolve `invitation.ref` to `common.invitation`; do not render the reference string.

`common.diagrams` is the exact text source for all six SVG assets, keyed by their semantic asset IDs. Each record captures the supplied SVG title, description, accessible label or ID references, and visible labels in display order. A null title or description means that element is absent; do not render the word null or invent a new title. Each label has semantic `text` and exact `lines` for multiline artwork. Repeated labels are retained as separate records. For example, the method diagram has three separate "Stop" labels, and "Proceed or stop" uses two visual lines. The AI diagram uses "Input", matching the case's existing label list. Work-case label lists describe the diagram topics; use `common.diagrams` when generating or editing actual SVG wording, and preserve page-level image alternatives from the case content. During content migration, these fields belong in `site.md` with the other shared copy. If an SVG is inlined, its accessible title/description must come from these fields; if used as an image, the surrounding page's `alt` remains the primary alternative. No project fact changes are implied by this text alignment.

The content data is a handoff format, not a requirement to fetch JSON in the browser. At implementation time, integrate the reviewed values into the existing content collection format and render them at build time. Extend the existing copy validator to cover the actual chosen source format; the current repository validator checks Markdown and does not automatically validate a new JSON file.

## Public page sequence and editorial intent

| Page | Exact H1 | Sequence |
| --- | --- | --- |
| Home | A business. By design. | Visible positioning, experience, selected work, three stages, personal note, invitation. |
| Venture architecture | The whole venture. One accountable architect. | Three connected layers, design decisions, engagement, two modes, standards, complete definition, six questions, invitation. |
| Work | The design has to survive reality. | Five-item project index, five substantive cases, earlier experience, invitation. |
| About | Same noun. Bigger object. | Portrait and opening, professional arc, technical seat, photography, present practice, invitation. |
| Contact | What are you weighing? | Email address, useful opening prompts, next-step expectations, location and LinkedIn. |
| 404 | This sheet is not in the set. | Plain explanation, Home link and practice link. |

The homepage intentionally carries less prose than the original. The substance is retained in the practice page, where the visitor has chosen to read more. A full definition is supplied, not a teaser or an instruction to write an essay later. The FAQ stays visible in ordinary document flow, as the existing PRD specifies. Its answers must not be hidden behind an accordion.

## Material source-to-proposal changes

The exact destination values are in the indicated JSON fields. This table records changes that affect meaning, hierarchy or review scope. Layout-only movement does not count as approval to publish rewritten words.

| Source | Proposal | Review significance |
| --- | --- | --- |
| `home.md` hero H1 "Will Godfrey" | `home.hero.title`: "A business. By design." | New display headline retained from the selected design direction. Will's name remains the brand in the header. |
| `home.md` hero describes "new AI-native businesses" | `home.hero.body`: "The architect of record for AI-native businesses. I design them, prove them in a working system, and hand over on a date." | Preserves the distinctive "architect of record" positioning immediately below the visual hero. Removes "new" for brevity only. |
| `home.md` is a long sequence of thesis, situations, decisions, stages, modes, standards, refusals and proof | Home now presents proof, work, process and a personal note; the substantive material sits on the practice page | Significant information-architecture change. This is deliberate and needs review as part of the new direction. |
| `home.md` three situations | No separate situations block | The main page now leads with the work. Contact prompts and the practice definition describe fit without duplicating a long audience list. This is an intentional cut, not accidental omission. |
| `home.md` proof names a "$6B insurance brokerage" | "AI agent for an insurance brokerage" across the proposal | Company-size number is omitted. This avoids making the homepage depend on an uncontextualized external numeric claim; it does not contradict the source. No replacement number is invented. |
| `home.md` "Design, prove, hand over" | `common.stages` plus illustrative deliverable sheets | Proposed display copy makes the output of each stage visible. The sheets are explanatory illustrations, not actual confidential documents or a contractual deliverable promise. |
| `venture-architect.md` main H1 "What is a venture architect?" | Practice H1 "The whole venture. One accountable architect."; original question becomes the full-definition heading | Changes the page's opening hierarchy while retaining the definition at `#definition`. |
| `venture-architect.md` long essay and market survey figures | New concise full definition in `practice.definition`, with no survey statistics or external source link | Material rewrite, not word-for-word migration. The conceptual argument remains. No forecast, margin, cost percentage or pricing statistic is repeated. |
| `venture-architect.md` comparative statements about studios and other firms | FAQ focuses on Will's own scope, independence and how he works with other teams | Avoids general claims about other firms' incentives, exact staffing arrangements or comparative quality. |
| `venture-architect.md` six FAQ questions | Six source-grounded questions, including "Can you work with the team we already have?" | The firm-specific title question is replaced with a practical scope question. The wording is a proposal, grounded in the two engagement modes and existing collaboration statements. |
| `work.md` five short cases | `work.cases` contains context, design and what each case shows | Adds presentation structure and explanatory phrasing. Does not add client names, revenue gains, savings, success metrics or fabricated outputs. |
| `work.md` AI case has an unfilled workflow marker | Case says the agent was designed and built for an insurance brokerage, uses the named SDK and is in production | Safe omission of the unknown workflow. The conceptual workflow drawing is explicitly not a client system diagram. A public workflow can be added only when Will supplies it. |
| `work.md` Sightline and Miniature factual descriptions | New proposed display titles: "The built environment, made measurable." and "A small component. A larger system." | Headlines are editorial; the project names and business descriptions remain separate exact text. No product photograph or device specification is invented. |
| `work.md` written method | "A practice you can read." / "The method I work from" | Does not reveal the method's name. The full guide is not promised as a public download. A short introduction is available by conversation, as the source states. |
| `about.md` "Same noun, bigger object" | "Same noun. Bigger object." | Punctuation and hierarchy change. |
| `about.md` continuous biography | Professional arc, technical-seat section, photography section and current-practice section | Same factual foundation with a more visual reading rhythm. New connecting phrases are proposed prose. |
| `about.md` media company filmed "more than a hundred" bands | "A media company that filmed independent bands" | Removes a numeric claim that is not necessary to the story. Does not change the company's role. |
| `about.md` "since 2021, before ChatGPT" | "since 2021" | Retains the supplied start year and removes an unnecessary product chronology comparison. |
| `contact.md` H1 "Start a conversation" | "What are you weighing?" | Retains the original conversational invitation as the display heading. Adds three optional prompts; does not create a form or require a brief. |
| `site.md` technical drawing title block, revision and date labels | Quiet shared footer and no displayed revision/date block | Removes decorative editorial metadata. No publication date is guessed. |
| `site.md` repeated long closing biography | Shared short invitation | Biography is available on About; the closing section asks for the next action. |
| Selected architecture mockup includes smart apostrophes, curly quotation marks and a design-study footer | Straight punctuation, semantic production links and proposed public footer | The packaged production copy follows the repository's editorial style rather than copying the study's punctuation or review-interface text. |

## Facts and identity rules to preserve

- The McKinsey credential is nine years at the firm and a venture CTO role during that period. Never describe Will as "CTO of McKinsey". When the longer case is shown, preserve the source distinction: CTO of North America's first large-scale digital business build, at McKinsey. `OPEN_ITEMS.md` explicitly records permission to keep the "North America's first" wording.
- The AI system is described as in production and Will's work on it as complete. No client name, specific brokerage workflow, revenue figure or operational result is supplied in this proposal.
- Sightline Geospatial and Miniature Systems are Will's own ventures. Their source descriptions supply the facts. Illustrations must not be mistaken for actual client capture, an existing product or an engineering specification.
- Keep "NDAA-compliant" attached to the supplied Miniature Systems business description. Do not turn it into a new legal assurance about every component or add certification badges.
- Do not name the method or the drone platform. Keep "a written method of my own" and "a leading US drone platform" as applicable.
- The current source already distinguishes the two co-founded Atlanta companies from being ShootQ's third employee. Preserve that distinction. Do not call all three co-founded companies.
- Will is based in Iowa City and works largely remote with scheduled blocks on site. Do not invent worldwide availability, an office address, response-time promise or current capacity count.
- The existing portrait is a real supplied asset. Its exact alt text is "Will Godfrey". Do not infer a setting or add a date to its caption.
- Do not add client logos, testimonials, awards, pricing, revenue, conversion lifts or performance results without supplied evidence and explicit editorial review.

## Resolved decisions and document conflicts

| Topic | Source situation | Handoff treatment |
| --- | --- | --- |
| Copy approval | Existing repository `AGENTS.md` prohibits changing, adding, cutting or reordering approved words without Will's approval, and asks for proposed changes in the PR description | The user requested design mockups and a precise package, so proposed copy is authorized here. The original repository remains untouched. When implementation is separately requested, state which proposed copy is being adopted and honor the then-current editorial approval rule. Do not present this package as already approved final copy. |
| Method name | Older materials may name it; `OPEN_ITEMS.md` says not to publish the name | Generic method language only, in every page, metadata field, share text and mockup. |
| Drone brand | Older draft marker; resolved direction says not to name the platform | "A leading US drone platform" where the platform is described. |
| Canonical host | An older technical specification discusses redirecting www to the bare domain; `OPEN_ITEMS.md` records the opposite current choice | Use `https://www.willgodfrey.com`. Canonical links, Open Graph URLs, structured data, sitemap and robots must agree. Do not change DNS or reverse the existing redirect as part of implementation. |
| Analytics | Older AGENTS and TECH_SPEC say remove GA and allow Cloudflare analytics only; the later recorded decision expressly keeps GA | Preserve sanctioned GA4 `G-RQMR51RTHC`, loaded last/deferred as recorded, and the existing Cloudflare analytics choice. Do not silently remove it or introduce another tracker. Have the implementation audit confirm actual current behavior and any required consent handling; this handoff does not invent a privacy policy or make legal assertions. |
| Share image | A designed wide social card could improve presentation, but `OPEN_ITEMS.md` explicitly says keep the existing portrait | Keep `/images/will-godfrey.jpg` as the share image. Its supplied small square size is a quality limitation, not permission to silently substitute a generated portrait or a new card. |
| Startup count | `OPEN_ITEMS.md` describes an old unresolved count; current `work.md` already identifies two co-founded companies and third employee at ShootQ | Current content is consistent. No blocker and no invented third co-founding role. |
| Survey wording | Open items records an old incorrect cost statistic; current essay already uses cost-to-deliver wording | No unresolved percentage correction in the current source. The new proposal omits all survey statistics, so none needs to be independently revalidated for this package. |
| Frontend typography | Existing implementation plan names older fonts; selected design direction uses a different pair | Apply the new design system for the proposed direction and self-host the chosen fonts at implementation. Typography is visual specification, not a reason to preserve an obsolete font choice. |
| Interactions | Existing PRD defaults to static HTML and says FAQ is visible; the selected direction has project and stage selectors | The mockups demonstrate progressive enhancements. The implementation must retain all meaningful text in HTML and explain each small interaction script. Keep FAQ answers visible without JavaScript. |

## Unknowns and safe defaults

| Unknown or optional improvement | Ready-to-build default | What changes only with new input |
| --- | --- | --- |
| Brokerage workflow | Omit the workflow; use the complete supplied generic case | Add one approved nonconfidential workflow sentence to the case and corresponding diagram. |
| Exact publication day | Show no publication date; do not generate a pretend publication timestamp from this handoff | Set real `datePublished` and `dateModified` when actually publishing an Article, if Article structured data is used. Page-level WebPage data can launch without them. |
| High-resolution portrait | Use supplied portrait at a modest display size, with alt text provided | Replace only with Will's selected portrait. Do not AI-generate or invent a likeness. |
| Original photographic work | Use the actual portrait and clearly illustrative supplied visual studies | Replace selected conceptual assets with Will's selected photographs only when files, rights, place/date if captioned and alt text are available. The absence of photography must not produce an empty public placeholder. |
| Client permission and detailed work artifacts | Use anonymous cases and illustrative diagrams | Add client identity, project screenshots, documents or metrics only when Will supplies and authorizes them. |
| Exact fees, availability and response time | No fee range, booking calendar, slots remaining or response-time promise | Add only supplied current terms. |
| Full method download | Link to Contact for the introduction | Publish a document only when Will supplies the actual public version. |
| New About photography gallery | No gallery or invented portfolio in the five-page scope | Add later using actual selected images and their captions. |

These defaults let an implementer complete a production-quality preview without putting questions, bracketed markers or invented content on the public pages. The source repository may still contain old markers until approved editorial migration occurs; the handoff is not a claim that its original production build has been unblocked.

## Editorial acceptance checks

1. Check the implementation's visible copy against the reviewed content file, including captions, buttons, menu labels, image alternatives and metadata.
2. Preserve `https://www.willgodfrey.com`, the email address, LinkedIn URL and all five routes. Check Work deep links and the practice `#engagement` and `#definition` links.
3. No em dashes, curly quotes or curly apostrophes in public content. Headings are sentence case; decorative labels do not need all-capital source text.
4. No unfilled markers. No method name, unnamed-client identity, prohibited personal-role claims, invented numeric result or fabricated date.
5. Read the complete page without JavaScript. Content and routes still make sense. Read a project or stage after changing selections; all associated fields agree.
6. Check the mobile layout with the actual supplied words. Do not abbreviate or silently cut copy to make a screenshot fit.
7. Treat the Personal quotation as Will's first-person statement derived from his supplied biography, never as an outside testimonial.
8. Check diagrams and caption placement. They explain concepts and must not be presented as real client deliverables, measured maps, product drawings or signed commitments.
9. Confirm the full practice definition and all six FAQ answers are present. A link titled "Read the full definition" must land on the complete definition in this package.
10. Mark editorial approval separately from technical acceptance and publication. The package supplies the design and precise proposal needed for that review.
