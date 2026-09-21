# Observed repository context

This is an inspection record, not a copy of the production app or an instruction to change it during handoff preparation.

Source: `/Users/willgodfrey/Development/personal-websites/willgodfrey.com`. Inspected 21 September 2026.

- Existing Astro app with five page routes plus 404.
- package.json: Astro 7.3.3; sitemap 3.7.4; markdown-remark 7.3.1; Bricolage font 5.2.7.
- .nvmrc: 22.12.0. Existing lockfile controls future installation.
- Canonical site: https://www.willgodfrey.com, trailing slash directory output.
- Content: Markdown with front matter, already updated to omit the private method name and drone brand.
- Existing approved analytics exception: GA4 loader and /ga.js. Mockups include neither.
- Current portrait 400 x 400, same historical social-image URL.
- Old docs contain contradictory visual, privacy, content and hosting directions; docs/03-CONTENT-AND-DECISIONS.md resolves their relevance to this proposal.
- Public deployment settings were not inspected or changed. No repository branch, source code, lockfile or content file was modified to create this handoff.

Re-inspect the live repository before implementation. This package is portable; it does not require this absolute path to exist on another machine.
