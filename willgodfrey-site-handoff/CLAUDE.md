# Project instructions: willgodfrey.com

You are rebuilding the personal site of Will Godfrey, a venture architect. Read `docs/PRD.md`, `docs/DESIGN.md`, `docs/TECH_SPEC.md` and `docs/BUILD_PLAN.md` before any task. Work one phase at a time and stop where the build plan says to stop.

## The one rule that outranks the rest

If you do not know, do not guess. Ask Will, or state the assumption at the top of your reply and in the pull request. This applies to facts about him, to Cloudflare behavior, and to library versions. Check current documentation before relying on memory.

## Words

- `content/` is the source of truth for every visible word, every title tag and every meta description.
- You may restructure content files to fit the stack. You may not change, add, cut or reorder words without Will's approval. Propose copy changes in the pull request description, never in the diff.
- Never invent a claim, a number, a client name, a testimonial, a logo or a date.
- Never write any of these into the site: a McKinsey client name, McKinsey-internal figures, "leading global expert," R-Squared AI as a current role, ICBuild, "serial entrepreneur," "thought leader." The word "fractional" appears only where `content/` uses it on purpose, in the FAQ.
- Punctuation: no em dashes, no curly quotes, straight apostrophes only. En dashes are allowed only inside numeric or date ranges. `npm run lint:copy` enforces this and must pass.
- Headings are sentence case. No all-caps labels. No emoji anywhere.

## Code

- Static output only. No server rendering, no database, no CMS.
- Zero client-side JavaScript by default. Any script needs a one-line justification in the pull request.
- No third-party scripts, trackers, cookies, chat widgets, newsletter forms or embedded social feeds.
- Self-host fonts. No requests to font CDNs at runtime.
- Accessibility target is WCAG 2.2 AA. Semantic HTML first, ARIA only when HTML cannot express it.
- Pin exact dependency versions. Keep dependencies few. Justify each new one.

## Git and deploys

- Work on the `venture-architect` branch. Open a pull request into the production branch. Never push to the production branch and never force-push.
- Small commits with plain messages that say what changed and why.
- Do not change DNS, Cloudflare settings, domains, redirects at the zone level, or repository settings. Write down what Will needs to change and where.
- Every push should produce a Cloudflare Pages preview. Put the preview link in your report at each stop.

## Commands

Define these in `package.json` and keep them working:

- `npm run dev` starts local development
- `npm run build` runs the copy lint, then builds static output
- `npm run lint:copy` runs `scripts/lint-copy.mjs`
- `npm run check` runs type checks, the copy lint and the link check

## How to report at each stop

Lead with what is done and the preview link. Then list open questions, each answerable with a short reply. Then list risks. Keep it scannable: short lists, no long paragraphs.
