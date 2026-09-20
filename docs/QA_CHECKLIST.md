# QA checklist

Run all of this in Phase 5. Paste results into the pull request.

## Words

- [ ] `npm run lint:copy` passes with zero findings
- [ ] The text diff shows zero differences between `content/` and the built pages
- [ ] No `[[TODO` markers remain (production only)
- [ ] Every string in `docs/REMOVALS.md` is absent from `dist/`
- [ ] Headings are sentence case. No all-caps labels. No emoji.

## First screen, on a 390px wide phone

- [ ] "Will Godfrey," "Venture architect" and "architect of record" are all visible without scrolling on the home page
- [ ] No horizontal scroll on any page at 320px
- [ ] The two shapes table has become two stacked blocks

## Accessibility

- [ ] axe reports zero violations on all five pages
- [ ] Full keyboard walk: skip link, header, every link, in a sensible order, with a visible focus ring
- [ ] Every text and background pair meets AA contrast in both schemes
- [ ] One `h1` per page and no skipped heading levels
- [ ] Images have alt text from `content/`. Decorative elements are hidden from assistive technology.
- [ ] The load animation is absent under `prefers-reduced-motion`

## Performance

- [ ] Lighthouse mobile is 95 or higher in all four categories on all five pages
- [ ] Home transfers under 150 KB excluding images
- [ ] No client-side JavaScript ships, or each script is justified in the pull request
- [ ] Fonts are self-hosted, preloaded, four files at most
- [ ] Zero third-party requests at runtime

## Metadata

- [ ] Title tags and descriptions match `content/site.md` exactly
- [ ] Canonical links use the canonical host
- [ ] JSON-LD validates. `Article` dates match the visible dates. FAQ text matches the visible text.
- [ ] `sitemap.xml` lists exactly five URLs. `robots.txt` points to it.
- [ ] The share card renders correctly in LinkedIn's Post Inspector

## Delivery

- [ ] Security headers are present on the preview, checked with a headers scan
- [ ] Every path that resolved on the old site either resolves or redirects
- [ ] The 404 page renders for an unknown path and returns status 404
- [ ] Print styles: the essay prints cleanly in black on white with the URL and date
