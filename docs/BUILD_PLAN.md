# Build plan

Six phases. Three of them end with a required stop where Will reviews before you continue. Do not run ahead of a stop.

| Phase | Name | Ends with a stop |
| --- | --- | --- |
| 0 | Audit and plan | Yes |
| 1 | Scaffold | No |
| 2 | Content wiring | No |
| 3 | Design pass | Yes |
| 4 | Metadata, structured data, headers, redirects | No |
| 5 | QA and preview | Yes |
| 6 | Launch | Will merges |

## Phase 0: audit and plan. No code.

1. Read every file in `docs/` and `content/`.
2. Inspect the repository: framework, build command, output directory, Node version, dependencies, assets worth keeping.
3. Fetch the live site at https://willgodfrey.com. List every path, image and external link that resolves today.
4. Confirm the production branch name and how Cloudflare Pages is configured, from what the repository shows. Ask Will for anything only the dashboard shows.
5. Recommend keeping the current stack or moving to the default in `docs/TECH_SPEC.md`, with reasons.
6. Name anything in the docs you think is wrong, risky or underspecified.

Done when: Will has a one-page report with the stack recommendation, the redirect list, your questions, and the risks. Stop.

## Phase 1: scaffold

1. Create the `venture-architect` branch.
2. Set up the stack, the repository layout, the scripts in `CLAUDE.md`, and the copy lint as a prebuild step.
3. Add design tokens, base styles, self-hosted fonts, and the Base layout with header, closing block and title block.
4. Add placeholder pages for all five routes and the 404.

Done when: `npm run build` passes, a preview deploys, and all five routes return 200 with the shared layout.

## Phase 2: content wiring

1. Define content schemas. Load all copy from `content/`.
2. Render every page from its content file. No copy in components.
3. Add the text diff script from `docs/TECH_SPEC.md` section 12.

Done when: the text diff reports zero differences on all five pages.

## Phase 3: design pass

1. Build each component in `docs/DESIGN.md` section 9.
2. Build the sheet frame and the title block. Build the blueprint scheme.
3. Make every page work from 320px to 1920px wide.
4. Place image placeholders at the correct aspect ratios with captions.
5. Run the self-critique in `docs/DESIGN.md` section 11.

Done when: Will has the preview link, phone and desktop screenshots of all five pages in both schemes, and your critique notes. Stop.

## Phase 4: metadata, structured data, headers, redirects

1. Title tags, descriptions, canonical links, Open Graph and Twitter tags from `content/site.md`.
2. The share image and the favicon set.
3. JSON-LD per `docs/TECH_SPEC.md` section 7, validated.
4. `sitemap.xml`, `robots.txt`, `_headers`, `_redirects`.

Done when: validators pass and results are in the pull request.

## Phase 5: QA and preview

Run `docs/QA_CHECKLIST.md` in full. Fix what fails. Paste results into the pull request.

Done when: every box is ticked or has a written reason, and Will has the final preview link. Stop.

## Phase 6: launch

Will's steps, which you prepare but do not perform:

1. Fill every `[[TODO` in `content/` and supply the three images.
2. Set the canonical host redirect in the Cloudflare dashboard.
3. Enable Cloudflare Web Analytics if he wants it.
4. Approve and merge the pull request.

Your steps after the merge:

1. Verify production: all five routes, redirects, headers, structured data, share card.
2. Confirm every item in `docs/REMOVALS.md` is absent from production.
3. Report anything that differs from the preview.
