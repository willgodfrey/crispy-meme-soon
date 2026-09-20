# Removals: what must not survive from the live site

Read off https://willgodfrey.com on September 20, 2026. After the build, grep `dist/` for the strings in the last column. Every one must return nothing.

| # | On the live site | Action | Strings that must be absent |
| --- | --- | --- | --- |
| 1 | "CTO & Co-Founder, Ex-McKinsey, Ga Tech MBA" under the name | Replaced by "Venture architect" | `Co-Founder`, `Ex-McKinsey` |
| 2 | "Building the next generation of enterprise AI" and its paragraph | Removed | `next generation of enterprise AI`, `LLMOps`, `revenue-system automation` |
| 3 | Three emoji cards: Strategic Vision, Technical Depth, Operator's Mindset | Removed | `Strategic Vision`, `Technical Depth`, `Operator's Mindset`, `Kubernetes` |
| 4 | Core competencies list | Replaced by the seven design decisions | `Core competencies`, `AI/ML Engineering`, `DevOps` |
| 5 | R Squared AI as a current role | Removed | `R Squared`, `R-Squared`, `rsquaredai` |
| 6 | ICBuild.ai in the about paragraph and as a career entry | Removed | `ICBuild`, `icbuild` |
| 7 | Miniature Systems described as a maker studio with a printer farm | Replaced by the copy in `content/work.md` | `Prusa`, `maker studio`, `Turing Pi`, `homelab` |
| 8 | No mention of Sightline Geospatial | Added on home, work and about | none |
| 9 | McKinsey entry with "multi-million-dollar revenue lifts" | Replaced by the copy in `content/about.md` | `multi-million`, `revenue lifts` |
| 10 | "Let's build something extraordinary" | Replaced by the contact copy | `something extraordinary`, `exceptional teams` |
| 11 | Meta description beginning "Serial entrepreneur and technologist" | Replaced from `content/site.md` | `Serial entrepreneur`, `AI infrastructure` |
| 12 | GitHub icon link beside LinkedIn | Removed. LinkedIn stays. | `github.com/willgodfrey` |
