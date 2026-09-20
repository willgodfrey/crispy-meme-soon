# Design: willgodfrey.com

## 1. The idea

The site should look like it came from an architecture practice, and nothing like a developer portfolio or a consultant's landing page.

The subject's own vernacular is the construction drawing: a sheet with a ruled border, a title block in the lower right corner, a disciplined grid, thin lines, technical lettering for annotations, and a serif for anything meant to be read at length. Will also makes aerial photographs of the built environment, which is the literal version of the same idea. Those two things, the drawing sheet and his photographs, are the whole visual language. Nothing else is needed.

What it must not look like: dark mode with glowing accent cards, gradient text, emoji bullets, icon grids, a logo wall, a hero with a big number and a small label, fade-and-slide-up entrances on every section.

## 2. Principles

1. Structure carries information. A rule, a number or a label appears only when it tells the reader something true.
2. Type does the work. One serif for reading, one technical sans for structure. No third family.
3. One accent color, used for links, focus and the revision mark. Nowhere else.
4. Quiet by default. One orchestrated moment on page load at most.
5. The words are senior, so the layout gives them room: large type, short measure, generous margins.

## 3. The sheet

On viewports 1024px and wider, each page is framed like a drawing sheet:

- A 1px rule inset 24px from the viewport edges, fixed in place while the page scrolls inside it.
- A title block pinned to the lower right corner of that frame.

Below 1024px the frame is dropped and the title block becomes the page footer.

### The title block

This is the signature element. It encodes real information and replaces a conventional footer.

| Cell | Content |
| --- | --- |
| Practice | Will Godfrey, venture architect |
| Sheet | The page name: Home, Venture architecture, Work, About, Contact |
| Date | The page's last revised date, from front matter |
| Revision | The page's revision number, from front matter, shown in the accent color |
| Contact | will@willgodfrey.com |
| Elsewhere | LinkedIn |

Set it in the technical sans at small size, in a ruled grid of cells, like the block on a real sheet. Sentence case. No all-caps.

## 4. Color

Two schemes. The light scheme is paper. The dark scheme is a blueprint, used when the visitor's system asks for dark.

| Token | Paper (light) | Blueprint (dark) | Use |
| --- | --- | --- | --- |
| `--paper` | `#F6F4EE` | `#0E2A47` | Page background |
| `--ink` | `#15181C` | `#EAF1F8` | Text |
| `--ink-soft` | `#4A4F57` | `#B7C7D8` | Secondary text, annotations |
| `--rule` | `#C8C3B8` | `#3E5C7C` | Hairlines, frame, table rules |
| `--accent` | `#B5361C` | `#FFB38A` | Links, focus ring, revision mark |
| `--wash` | `#ECE8DF` | `#143656` | Table header cells, card fill |

Check every text and background pair for AA contrast in both schemes before shipping, and adjust the hex values if any pair fails. The accent is a redline, the color an architect marks a drawing with. Use it sparingly enough that it still reads as a mark.

## 5. Type

| Role | Family | Notes |
| --- | --- | --- |
| Reading: body copy, the essay, the hero statement | Source Serif 4 (variable, OFL) | Use optical sizing. Body at 19px on mobile and 20px on desktop, line height 1.6, measure 60 to 68 characters. |
| Structure: navigation, headings inside components, tables, the title block, captions | Barlow and Barlow Semi Condensed (OFL) | The DIN-like shapes echo drawing annotations. Weights 400 and 600 only. |

If you believe a different pairing serves the idea better, propose it at the Phase 0 stop. Constraints: a serif for reading and a technical sans for structure, both open license, self-hosted, four files at most.

Scale, based on a 1.25 ratio from the body size: 16, 20, 25, 31, 39, 49, 61px. The home hero statement sits at 39px on mobile and 61px on desktop, in the serif, regular weight, tight leading of 1.1. Page titles at 39 to 49px. Do not bold or color a single word inside a headline.

Long-form rules for the essay: left aligned, never justified, no hyphenation, paragraphs separated by space and not by indents, no italics for more than a phrase. Some visitors read with dyslexia. Size, spacing and measure matter more than any special font.

## 6. Layout

- A 12-column grid, 1120px maximum content width, 24px gutters. Long-form text sits in a single column 66 characters wide, offset to the left third on desktop so the right margin can carry annotations.
- Vertical rhythm on an 8px base. Sections are separated by a full-width hairline and 96px of space on desktop, 64px on mobile.
- Header: "Will Godfrey" at the left in the serif, navigation at the right in the technical sans. No logo, no hamburger menu. On mobile the four links wrap to a second row.
- No cards with shadows. Where a container is needed, use a hairline border and the wash fill.

## 7. Imagery

- One portrait, on the about page only.
- Two aerial photographs by Will. One sits in the home page's architect of record block. One opens the work page.
- Treat photographs as drawings: square corners, a hairline border, and a caption in the technical sans at the lower left, like a figure label on a sheet. Captions come from `content/`.
- Until Will supplies files, use a neutral placeholder in the wash color at the correct aspect ratio with the caption in place. Never use stock or generated images.
- Aspect ratios: aerials at 3:2, portrait at 4:5.

## 8. Motion

One moment only. On first load of the home page, at 1024px and wider, the sheet frame draws itself in over about 900ms, then the title block appears. Implement it with CSS only. Skip it entirely under `prefers-reduced-motion`. No other entrance animation on the site. Links and buttons may have a 120ms color transition.

## 9. Components

| Component | Notes |
| --- | --- |
| Hero | Name, title, then the statement at display size. Two text links styled as buttons with hairline borders. No image. |
| Thesis | The thesis line at large size in the serif, the supporting paragraph beneath at body size |
| Architect of record | Two columns on desktop: text at left, aerial photograph at right |
| Situations | Three items separated by hairlines. No icons. |
| Decisions | A plain list set in two columns on desktop. No numbering, because the items are not a sequence. |
| Two shapes | A ruled table on desktop, two stacked bordered blocks on mobile |
| Standards and refusals | Plain lists. Refusals may use a short rule before each item in place of a bullet. |
| Stages | Design, prove, hand over. This is the one place numbering is correct, because it is a real sequence: 1, 2, 3 in the technical sans. |
| Proof | Four lines, set as a ruled list |
| Case card | Title, then labeled rows: the seat, what I designed, what it shows. Labels in the technical sans, values in the serif. |
| FAQ | Question as a heading, answer as paragraphs. Always open. |
| Closing block | Short bio and the "Start a conversation" link, on every page |
| Title block | See section 3 |

Do not add decorative eyebrow labels above sections. A heading is enough.

## 10. Page templates

- Home: the blocks in `content/home.md`, in that order.
- Essay: title, byline with dates, then the long-form column. An "On this page" list of section links sits in the right margin at 1024px and wider, and is omitted below that.
- Work: opening photograph, page headline, five case cards in one column, the foot line.
- About: headline and subhead, portrait at right on desktop and above the text on mobile, the long version, then the notes are not rendered.
- Contact: headline, three short paragraphs, the email address as a large text link.

## 11. Critique before you stop

At the Phase 3 stop, review your own work against this list and report what you changed as a result:

- Could this page be mistaken for a template or for any other person's site? If yes, what makes it Will's?
- Is every rule, number and label carrying information?
- Does the first screen on a phone say "venture architect" and "architect of record" without scrolling?
- Is there any element that exists only because it is common on personal sites?
