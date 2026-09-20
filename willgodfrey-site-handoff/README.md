# willgodfrey.com rebuild: handoff package for Claude Code

This folder is everything Claude Code needs to rebuild willgodfrey.com around the venture architect positioning. Drop it into the root of the existing GitHub repo that Cloudflare Pages deploys from.

## What is in here

| Path | What it is |
| --- | --- |
| `CLAUDE.md` | Standing rules for Claude Code. It belongs at the repo root so it loads as project instructions. |
| `docs/PRD.md` | What the site has to do, for whom, scope, requirements, acceptance criteria |
| `docs/DESIGN.md` | Visual direction, tokens, type, layout, components, page templates |
| `docs/TECH_SPEC.md` | Stack, repo layout, Cloudflare Pages settings, SEO, structured data, headers, redirects |
| `docs/BUILD_PLAN.md` | Six phases with a "done when" for each, and three required stops for Will's review |
| `docs/QA_CHECKLIST.md` | The checks that must pass before a production merge |
| `docs/REMOVALS.md` | Twelve things on the live site that must not survive the rebuild |
| `docs/OPEN_ITEMS.md` | Decisions, brackets and assets only Will can supply |
| `content/*.md` | Final copy for all five pages plus global strings. This is the source of truth for every word on the site. |
| `scripts/lint-copy.mjs` | Copy lint that fails the build on em dashes, curly quotes, banned words and unfilled TODOs |

## How to start

1. Copy this folder's contents into the repo root on a new branch named `venture-architect`. If a `CLAUDE.md` already exists, merge the two.
2. Open Claude Code in the repo and paste the kickoff prompt below.
3. Claude Code stops after Phase 0 with an audit and a plan. Read it, answer its questions, and tell it to continue.

## Kickoff prompt

```
Read CLAUDE.md, then every file in docs/ and content/. Do not write code yet.

Run Phase 0 from docs/BUILD_PLAN.md: audit this repository and the live site
at https://willgodfrey.com, then report back with (1) the current stack and
how Cloudflare Pages builds it, (2) whether you recommend keeping that stack
or moving to the default in docs/TECH_SPEC.md, and why, (3) any requirement
in the docs you think is wrong, risky or underspecified, and (4) the questions
you need me to answer. Then stop and wait for me.
```

## Ground rules in one paragraph

The words in `content/` are final and belong to Will. Claude Code may restructure the files to suit the stack, and may not change, add or cut a word without asking. Production deploys are blocked while any `[[TODO` marker remains in `content/`. Preview deploys are not.

For Claude Code behavior and configuration questions, the documentation map is at https://docs.anthropic.com/en/docs/claude-code/claude_code_docs_map.md
