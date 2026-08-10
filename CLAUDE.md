# abhishekgupta1.github.io — Project Context

Personal portfolio + knowledge base built with Docusaurus. This file describes
how the owner actually uses the site's sections day to day, so future work adds
content in the right place instead of guessing. It does not change any core
component, config, or build behavior.

## How this project is used

The site has five working areas the owner actively maintains, mapped to the
existing structure — no new pages/routes are implied by this list unless asked:

1. **Projects** (`src/pages/projects.js`, `ProjectCard.js`)
   Whatever gets learned (a new tool, pattern, or concept) becomes a small
   project that demonstrates it. This is the "prove it by building it" area.

2. **Articles** (`blog/`, served at `/articles`)
   Write-ups adapted from ideas seen on LinkedIn, social media, Medium-style
   posts, and internal/office articles — not raw reposts, but the owner's own
   take or notes on those ideas.

3. **Docs / Cheat Sheets** (`docs/`, organized into topic categories via
   `sidebars.js`: SRE Runbooks, Observability, Playwright Automation, AI in
   Testing, etc.)
   Reference material and cheat sheets grouped by topic. New topics get their
   own category folder following the existing pattern.

4. **Resume** (`src/pages/resume.js`, `static/resume.pdf`)
   Intended to hold **multiple resume variants** (e.g. role-specific versions),
   not just the single PDF currently wired up. Note this as the direction of
   intent — restructuring it into a proper multi-resume list is a deliberate
   future change, not something to do incidentally.

5. **Certifications** (`src/pages/certificates.js`, `CertificateGrid.js`,
   `static/img/certs/`)
   Acts as a backup/showcase for certifications earned, plus any project or
   doc created while studying for them.

6. **Portfolio promotion strategy**
   Notes/strategy for growing the portfolio's reach (sharing articles,
   cross-posting, LinkedIn presence, etc.). Not yet represented as a page —
   treat as planning content, not a site feature to build.

## Working agreement

- Default to adding/organizing **content** (docs, blog posts, project
  entries, cert entries) inside the existing structure above.
- Do not refactor or restructure core components (`src/components/*`,
  `docusaurus.config.js`, `sidebars.js`, page files) unless explicitly asked —
  content changes should not turn into architecture changes.
