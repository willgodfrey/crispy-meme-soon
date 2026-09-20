# Product requirements: willgodfrey.com

Owner: Will Godfrey. Builder: Claude Code. Status: ready to build.

## 1. Purpose

The site has one job. Someone hears "venture architect," looks Will up, and finishes the first screen knowing what the term means, that he is the senior version of it, and what to ask him for.

A venture architect is accountable for the design of a new business before it exists, and for the integrity of that design through its first build. Will's version is the architect of record: one per venture, working for the owner. The market knows the title only as a staff grade inside venture studios. The site exists to define the senior seat and put his name on it.

## 2. Audiences

| Visitor | What brings them | What they must conclude |
| --- | --- | --- |
| A private equity deal lead or operating partner | A partner firm or a portfolio CEO mentioned him | "This is the person who designs the new business and tells us when to stop." |
| A founder or CEO of a services firm | Pressure to do something with AI | "He works for the owner, and he will lay out my options before I commit." |
| A partner firm or a McKinsey alumnus | A referral | "I can put him in front of my client without worrying." |
| Someone with a full-time role in mind | LinkedIn | "He is selective, and the door is not closed." |

Most visits will be on a phone, from a link in an email or on LinkedIn. Design mobile first.

## 3. Message hierarchy

Three claims carry the site, in this order:

1. In an AI-native business, the architecture is the business model.
2. Someone has to be accountable for the design of the whole venture: one person, working for the owner.
3. Will has held that seat, wrote the method, and leaves on a date.

| Time on site | What must land | Where |
| --- | --- | --- |
| 5 seconds | Venture architect. Architect of record for new AI-native businesses. | Home hero |
| 30 seconds | One per venture, works for the owner, leaves on a date. When to call. | Home blocks 2 to 4 |
| 3 minutes | The full definition, why now, proof, his own ventures | Essay, work, about |

## 4. Scope

### In scope for version 1

Five pages, all static:

| Route | Page | Content file |
| --- | --- | --- |
| `/` | Home | `content/home.md` |
| `/venture-architect/` | Essay: What is a venture architect? (includes the FAQ) | `content/venture-architect.md` |
| `/work/` | Five case cards | `content/work.md` |
| `/about/` | About | `content/about.md` |
| `/contact/` | Start a conversation | `content/contact.md` |

Plus: a 404 page, `sitemap.xml`, `robots.txt`, social share image, favicon, structured data, security headers, redirects for any path that exists on the live site today.

### Out of scope for version 1

A blog or writing index, a CMS, a newsletter, comments, a contact form backend (see section 7), analytics beyond Cloudflare Web Analytics, any content about Sightline Geospatial or Miniature Systems beyond what is in `content/`, internationalization, a services or pricing page.

## 5. Functional requirements

| ID | Requirement |
| --- | --- |
| F1 | Every visible word, title tag and meta description comes from `content/`. No copy lives in components. |
| F2 | Primary navigation: Venture architecture, Work, About, Start a conversation. The site name "Will Godfrey" links home. The current page is marked with `aria-current`. |
| F3 | Every page ends with the same closing block: the short bio from `content/site.md` and a "Start a conversation" link. |
| F4 | The essay page shows the author, the published date and a "last revised" date, in text and in structured data. |
| F5 | The FAQ on the essay page is plain visible text: a question as a heading, the answer as paragraphs. No accordion. |
| F6 | The "two shapes" table on the home page becomes two stacked cards below 640px wide. No horizontal scrolling anywhere on the site. |
| F7 | Contact in version 1 is a `mailto:` link and the address in plain text. No form. |
| F8 | External links open in the same tab and carry `rel="noopener"` only where `target` is set. |
| F9 | The build fails if `content/` contains an em dash, a curly quote, a banned word, or, for production builds, a `[[TODO` marker. |
| F10 | A custom 404 page in the site's voice links to home and to the essay. |

## 6. Non-functional requirements

| ID | Requirement | Target |
| --- | --- | --- |
| N1 | Performance, mobile Lighthouse | 95 or higher in all four categories on every page |
| N2 | Page weight, excluding images | Under 150 KB transferred on home |
| N3 | Largest Contentful Paint on a mid-range phone over 4G | Under 2.0 seconds |
| N4 | Client-side JavaScript | None by default |
| N5 | Accessibility | WCAG 2.2 AA. Keyboard complete. Visible focus. Reduced motion respected. |
| N6 | Fonts | At most two families and four files, self-hosted WOFF2, `font-display: swap`, preloaded |
| N7 | Images | AVIF with WebP fallback, explicit width and height, lazy below the fold |
| N8 | Privacy | No cookies, no third-party requests at runtime |
| N9 | Resilience | Fully readable with CSS disabled and with images blocked |

## 7. Decisions already made

- Contact is a `mailto:` in version 1. A form can follow later as a Cloudflare Pages Function with Turnstile and a transactional email provider. Do not build it now.
- No blog until a second essay exists.
- No logos, no testimonials, no stock imagery, no emoji.
- The canonical host is the bare domain, `https://willgodfrey.com`, unless Will says otherwise in `docs/OPEN_ITEMS.md`. Today the bare domain redirects to `www` while the page declares the bare domain canonical. That mismatch must be resolved at launch.

## 8. Acceptance criteria for launch

1. All five pages render from `content/` with no copy differences. `npm run lint:copy` passes with zero findings.
2. No `[[TODO` markers remain in `content/`.
3. Every item in `docs/REMOVALS.md` is verifiably absent from the built output.
4. `docs/QA_CHECKLIST.md` passes in full, with results pasted into the pull request.
5. Will has reviewed the Cloudflare preview on a phone and approved it in writing in the pull request.

## 9. Success measures after launch

- People repeat one of three phrases back to Will: "architect of record," "one per venture," or "the architecture is the business model."
- Contact link clicks, read from Cloudflare Web Analytics.
- The essay page is returned by search engines and AI assistants for "what is a venture architect" with Will's definition.
