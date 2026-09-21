# Page specifications

Use this document with the corresponding mockup, `design-tokens.json`, and `content/site-content.json`. Copy paths below refer to JSON keys. Public route names are production targets; the packaged `.html` files are local visual references.

## Route map

| Page | Production route | Visual reference |
| --- | --- | --- |
| Home | `/` | `mockups/home.html` |
| Venture architecture | `/venture-architect/` | `mockups/venture-architect.html` |
| Work | `/work/` | `mockups/work.html` |
| About | `/about/` | `mockups/about.html` |
| Contact | `/contact/` | `mockups/contact.html` |
| Not found | HTTP 404 response | `mockups/404.html` |

All five main routes use the same header. The site name links Home. The fourth navigation item is Start a conversation. Do not preserve the earlier homepage-only section navigation in the actual site.

## Home

**Job:** make the practice recognizable, explain the role without a long essay, and bring evidence into the first scroll.

```text
Name                                      Four page links
Short role + large two-line statement      Material assembly
Concise explanation + work/practice links  Material assembly
Quiet three-part credibility strip
Section title                             Short contextual line
Project controls
Large illustrative model                  Selected project + link
Engagement title + stage controls         Illustrative deliverable
Small portrait                            Personal quotation + About link
Wine invitation                           Email
```

1. **Hero:** `home.hero`. Retain A business. / By design. as the two main lines. Role label and body must make venture architecture and architect of record explicit. Primary link goes to `/work/`; secondary to `/venture-architect/`. The sculpture is conceptual brand art, with descriptive alt text and the supplied caption. Approximately 650px minimum desktop hero height. Phone places text first and assembly beneath; approximately 810px total, with a 430px image region.
2. **Proof strip:** `home.proof.items`, three equal fields with title and short supporting text. These are credentials, not client logos. Stack on mobile, with a compact label/value arrangement.
3. **Selected work:** `home.selectedWork` and its three `caseIds`, resolved from `work.cases`. In the enhanced view show one case at a time, with three controls. The illustration occupies about 57% of the spread. Each case includes role, title, summary, evidence sentence, and a link to `/work/#<id>`. Do not truncate on a phone. The secondary link goes to all five cases. Use three separate HTML panels, not text copied into JavaScript strings.
4. **Engagement:** `home.process` and `common.stages`. Left title and controls; right an illustrative document that changes with the selected phase. The document contains real deliverable labels from the content manifest, not skeleton bars. Its maximum rotation is -4deg; reserve space around rotated edges so no horizontal overflow appears. The explanation sits with the sheet. On phone, title, controls and link precede the sheet. The practice link goes to `/venture-architect/#engagement`.
5. **Personal note:** `home.personal`, real small portrait, Newsreader quotation, brief statement and `/about/` link. No large cropped headshot on this page.
6. **Invitation/footer:** `common.invitation` and shared footer. The contact question and email form the final composition.

The strip is part of the opening; the invitation is the close. The page should feel like five main scenes, not eleven explanatory sections. The original full definition, modes, standards and refusals move to the practice page.

## Venture architecture

**Job:** explain how the three layers form one business, then provide the engagement and full reading depth.

```text
Title + summary + jump links       Interactive layered model
                                  Layer controls + explanation
Wine band: decisions meet at the joints
Decisions before the build: spacious two-column list
Design / Prove / Hand over: complete static sequence
Two engagement modes side by side
Standards                          Boundaries
Definition title/byline             Full reading column
FAQ title                          Six visible questions/answers
Shared invitation
```

1. **Opening:** `practice.hero` and `practice.layers`. Use a 1.08:1 desktop split and approximately 6vw gap. Title is three deliberate lines, generally 48-82px; copy is 17px with a 36ch measure. The right side holds `venture-layers.svg`, not a second material photograph. Layer controls select Commercial, Technical or Institutional. Show the matching question, body and joint statement. The additional `decisions` array is available for semantic explanations; it is not a second required bullet list beneath each short panel.
2. **Relationship band:** layer title and introduction in a wine section. Keep the text short and the left/right relationship clear; stack on phone.
3. **Design decisions:** `practice.decisions`. Eight unnumbered choices, two columns desktop and one on phone. A thin separator groups each item. Do not create eight cards or icons.
4. **Engagement:** stable ID `engagement`; `practice.engagement` plus all three `common.stages`. This is a static three-column sequence, each with its actual output list. On mobile it becomes three complete sections. Home has the compact interactive version; this page provides all details without a second stage selector.
5. **Modes:** `practice.modes`, two adjacent panels with title, scope, duration and working pattern. These are engagement definitions, not pricing cards. There is no price, badge, recommended tier or sales comparison. Stack in source order below 620px.
6. **Standards/boundaries:** `practice.standards`, a wider primary column and narrower secondary column. Preserve the independence, evidence and end-date commitments.
7. **Definition:** stable ID `definition`; `practice.definition`. Left title/byline and Questions about the practice link; right Newsreader reading column. On desktop only, left title can stay sticky with a 30px offset; it becomes normal flow at 620px. All six definition sections are visible HTML. No collapsed full-essay drawer, modal or read-more truncation. Do not insert an invented publication date.
8. **FAQ:** stable ID `questions`; `practice.faq`, six visible sections. Questions are headings, answers paragraphs. Preserve the Work link in the relevant answer. FAQ is never an accordion.
9. **Close:** shared invitation.

The two hero jumps go to `#engagement` and `#definition`. The definition rail jumps to `#questions`. A full section-by-section TOC is not required and is not shown in the mockup.

## Work

**Job:** show the breadth of the work and the specific responsibility taken in each context.

```text
Large page title                    Brief introduction
Five project anchor links
Case title, role and situation      Large explanatory figure
What I designed                    What it shows
Next case: alternate figure/text placement
... five complete cases ...
Earlier experience
Shared invitation
```

Use `work.hero`, `work.index`, `work.cases`, and `work.earlier`. The five required IDs are `venture-build`, `production-ai`, `sightline`, `miniature`, `written-method`. Each index link scrolls to its complete case. Do not create five additional case-detail routes in this scope.

Desktop hero has approximately a 1.7:.8 split. Cases use a 1:1.18 main split with 7vw gap; each has approximately 88px upper and 90px lower padding. The role is 12px, case title 33-51px, summary 17px and secondary copy 14px. Model figures are roughly 340px high minimum with generous inner breathing room. A second two-column row contains design and evidence text.

Below 900px, cases stack with text before the figure even when their desktop visual placement alternates. Below 620px, design and evidence also stack. Avoid image-text alternation that changes the reading order on a phone.

| Case | Asset | Essential content |
| --- | --- | --- |
| Venture build | `parent-and-venture.svg` | Venture CTO role during McKinsey work; new company and parent boundary |
| Production AI | `agent-workflow.svg` | Independent design/build responsibility; production state; model decision |
| Sightline | `terrain-study.svg` | Founder/operator, reality capture and business-design responsibility |
| Miniature Systems | `payload-study.svg` | Founder, regulated buyer and platform relationship; no named drone brand |
| Written method | `method-study.svg` | Gated approach and written stop conditions; no public method name |

Use the supplied captions and alt text. These graphics are conceptual models. They must not imply client permission or claim to document the actual system/hardware. The written-method CTA offers an introduction, not access to the full private guide.

The long earlier-experience line is exact supplied proposed copy. Do not infer dates, cofounder counts, client names, revenues or outcomes from an illustration.

## About

**Job:** establish the person, the professional arc and a way of seeing.

```text
Same noun. Bigger object.           Existing portrait + caption
Applications       Enterprises       Ventures
Section heading                    Considered reading column
Photographer's statement in a graphite field
Today's practice                   Facts / working pattern
Shared invitation
```

Source keys: `about.hero`, `about.opening`, `about.arc`, `about.technicalSeat`, `about.photographer`, `about.today`. Render all substantive fields. Use the actual portrait asset with the supplied alt/caption.

Desktop opening is 1fr / 320px with approximately 11vw gap; portrait is 320 by 360px using a crop of the real 400px original. Tablet portrait is 280 by 315px. Phone places the portrait after the title and introduction, with a compact adjacent caption where it fits. Do not stretch the photograph across a desktop viewport.

The three-part career arc is a progression, not a fabricated dated timeline. No invented employment start/end dates. The long narrative uses Newsreader at 24px desktop and 22px phone; section titles remain Manrope. Reading sections use approximately 1:1.6 columns with 12vw gap, then stack below 900px.

The photographer section is a graphite field with a large personal statement, rather than stock photography standing in for Will's archive. Additional photographs are optional future assets. Today's facts include location, remote/on-site pattern, and the existing education fact, with no availability calendar or invented booking limits.

## Contact

**Job:** make the first message easy and set honest expectations.

```text
Large invitation                   Selectable email on quiet sculpture detail
Brief personal statement           What happens next
Three prompts                      Location / working pattern / LinkedIn
Compact footer
```

Source keys: `contact.hero`, `contact.prompts`, `contact.expectations`, `contact.details`, and common email/footer values. Email is always visible, selectable, and a native `mailto:` link. Do not create a form, calendar embed, send button, newsletter signup, clipboard dependency or invented response-time promise.

Desktop canvas is roughly 1.22:1 and at least 660px high. The right uses the same sculpture as a subdued crop; it is decorative and receives empty alt. The address is 21-37px, wine, underlined, and wraps safely when necessary. Ensure the scrim makes the address and explanation readable on top of the artwork.

Below 620px the invitation precedes the contact details. Keep the image treatment secondary. The lower prompt row becomes one column. Contact ends with a compact footer rather than repeating its own large invitation.

## 404

Use `notFound.hero` and `notFound.seo`. Show the supplied clear page-not-found message, Home and Venture architecture links, and a restrained decorative crop. One H1. Return a real 404 status in production; the local mockup is just a file. Keep noindex on the production 404 while removing prototype-wide noindex from the five live pages.

## Shared responsive and state checks

- At 320px, keep every navigation item reachable and prevent page-level horizontal scrolling.
- At 390px, headings and email may reflow but must not clip. Do not shrink all copy to fit the desktop composition.
- At 768px, check About's portrait/title split and Work's stacked cases.
- At 1440px, preserve generous artwork and asymmetry; do not expand prose beyond its measure.
- At 1920px, outer padding caps at 96px and text measures remain constrained.
- Phone and desktop controls in the handoff viewer are review tools. They do not belong in the public site.
- Publication dates, newly approved client artifacts and replacement portrait photography are content updates, not prerequisites for rendering these complete layouts.
