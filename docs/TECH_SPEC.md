# Technical specification: willgodfrey.com

## 1. Hosting and deploy

- Source: the existing GitHub repository connected to Cloudflare Pages.
- Every push to a non-production branch produces a preview deployment. Merges to the production branch deploy to `willgodfrey.com`.
- Claude Code does not change Cloudflare or DNS settings. Where a setting must change, write the exact change into the pull request for Will to make.

## 2. Stack

Phase 0 decides this. The default recommendation is below. If the repository already uses a static setup that can meet `docs/PRD.md` with less churn, say so at the Phase 0 stop and wait.

Default: Astro, static output, no adapter, no UI framework, no client-side JavaScript.

| Why | Detail |
| --- | --- |
| Content lives in Markdown with typed front matter | Content collections validate the copy files at build time |
| Components without shipping JavaScript | Header, title block, case card and the rest render to plain HTML |
| Cloudflare Pages builds it without special handling | Build command `npm run build`, output directory `dist` |

Use the current stable Astro release and pin exact versions in `package.json`. Pin the Node version with `.nvmrc` and tell Will to set the matching `NODE_VERSION` variable in the Pages project if the build image default differs. Verify all of this against current Astro and Cloudflare documentation. Do not rely on memory for version numbers.

## 3. Repository layout

```
/
  CLAUDE.md
  README.md
  docs/                 specs from this package
  content/              source of truth for all copy
  scripts/lint-copy.mjs copy lint
  public/
    _headers
    _redirects
    robots.txt
    fonts/              self-hosted WOFF2
    images/             portrait, aerials, share image, favicon set
  src/
    content.config.*    collection schemas for content/
    layouts/            Base, Page, Essay
    components/         one file per component in docs/DESIGN.md
    pages/              index, venture-architect, work, about, contact, 404
    styles/             tokens.css, base.css
```

You may move `content/` under `src/` if the framework requires it. Keep the file names.

## 4. Content model

Each content file has YAML front matter and a Markdown body. Front matter carries `title`, `description`, `sheet`, `revised`, `revision`, and page-specific structured fields. Validate it with a schema. A missing field fails the build.

The home page is block structured. Keep the block order and the block names from `content/home.md`.

## 5. Copy lint

`scripts/lint-copy.mjs` is included and working. Wire it as a `prebuild` step.

- It always fails on em dashes, curly quotes, and the banned word list.
- It fails on `[[TODO` markers only when `CF_PAGES_BRANCH` equals the production branch name, or when `STRICT_TODOS=1`. Preview builds pass with TODOs so Will can review early.
- Confirm the production branch name in Phase 0 and set `PRODUCTION_BRANCH` in the script's configuration accordingly.

## 6. SEO and metadata

- Title tags and meta descriptions come from front matter. The exact strings are in `content/site.md`.
- One canonical link per page, on the canonical host.
- Open Graph and Twitter card tags on every page. One share image, 1200 by 630, built from the design language: paper background, the sheet frame, "Will Godfrey, venture architect" in the serif. Keep the old share image path working or redirect it, so previously shared links do not break. The live site uses `/images/will-godfrey.jpg`.
- `sitemap.xml` listing the five pages. `robots.txt` allowing all and pointing to the sitemap.
- No `noindex` anywhere except the 404 page.

## 7. Structured data

JSON-LD, built from `content/site.md` so it cannot drift from the visible copy.

| Page | Types |
| --- | --- |
| Home | `WebSite`, `Person` |
| About | `ProfilePage` with the same `Person` |
| Essay | `Article` with author, `datePublished`, `dateModified`; `FAQPage` with the six questions and answers exactly as displayed |
| Work, Contact | `WebPage` |

`Person` fields: name, `jobTitle` "Venture architect", url, image, `sameAs` with the LinkedIn profile, `alumniOf` Georgia Institute of Technology, `knowsAbout` from `content/site.md`. Do not add employers, clients or awards.

The FAQ markup is for machine readability. Google shows FAQ rich results only for a narrow set of sites, so do not expect one. Validate all JSON-LD with the Schema.org validator and paste the result into the pull request.

## 8. Headers

Ship `public/_headers` with:

- A Content Security Policy that allows only same-origin resources. If Will enables Cloudflare Web Analytics, add its script and beacon hosts and name them in the pull request.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`, and `X-Frame-Options: DENY`.
- Long cache lifetimes with `immutable` for hashed assets and fonts. Short lifetimes for HTML.

## 9. Redirects

- In Phase 0, crawl the live site and the repository for every path that resolves today. Any path that will not exist after the rebuild gets a rule in `public/_redirects`.
- The `www` to bare-domain redirect is a zone-level setting in the Cloudflare dashboard, not a `_redirects` rule. Write the instruction for Will. Verify the current recommended method in Cloudflare's documentation.
- The old site used in-page anchors: `#about`, `#experience`, `#contact`. Fragments cannot be redirected. Give the home page elements with those ids only if it costs nothing. Otherwise ignore them.

## 10. Analytics

Cloudflare Web Analytics, enabled by Will in the dashboard. No other analytics. To count contact intent without JavaScript, make the contact link a normal `mailto:` and rely on page views of `/contact/`.

## 11. Contact, version 2, not now

If Will later asks for a form: a Pages Function at `/api/contact`, Cloudflare Turnstile, server-side validation, and a transactional email provider whose key is stored as a Pages secret. The form must degrade to the `mailto:` link. Do not build this in version 1.

## 12. Testing

- `npm run check` runs type checks, the copy lint and a link checker against the built output.
- Lighthouse, mobile profile, on all five pages, results pasted into the pull request.
- An automated accessibility pass with axe on all five pages, plus a manual keyboard walk.
- A text diff proving the built HTML's visible text matches `content/`. A simple script that strips tags and compares normalized text is enough.
- A grep of `dist/` for every banned string in `docs/REMOVALS.md`.
