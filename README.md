# abhishekgupta1.github.io

[![CI](https://github.com/abhishekgupta1/abhishekgupta1.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/abhishekgupta1/abhishekgupta1.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/abhishekgupta1/abhishekgupta1.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/abhishekgupta1/abhishekgupta1.github.io/actions/workflows/deploy.yml)

Personal portfolio + knowledge base built with [Docusaurus](https://docusaurus.io/).
Reference guides (`/docs`), quick-lookup cheat sheets (`/cheatsheets`), articles
(`/articles`), and learning tools (`/roadmap`, `/skills`, `/dashboard`).

## Develop

```bash
npm install
npm start          # dev server with hot reload
```

## Build & preview

```bash
npm run build      # static output in build/
npm run serve      # serve the built site locally
```

## Tests (CI gates)

```bash
npm run build
npm run test:e2e                 # Playwright smoke tests against the built site
npx linkinator ./build --recurse --silent --skip "^https?://"   # internal link check
```

`.github/workflows/ci.yml` runs build + link check + Playwright + Lighthouse on
every push and PR. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages on push to `main`.

## Configuration you own

Edit `src/data/site.js`:

| Setting | What to do |
| --- | --- |
| `GOATCOUNTER_CODE` | Create a site at [goatcounter.com](https://www.goatcounter.com/) and paste its code. Empty = no analytics script. Cookieless, so no consent banner. |
| `ADS_ENABLED` / `ADSENSE_CLIENT` | Leave `false` until AdSense approves the site. When enabling, also fill `static/ads.txt` and lower the `performance` budget in `lighthouserc.json` to ~0.8. |

Also replace `REPLACE_WITH_SEARCH_CONSOLE_TOKEN` in `docusaurus.config.js`
(`themeConfig.metadata`) with your Google Search Console verification token.

## Content model

Every guide / cheat sheet / article follows a shared structure (10-minute path,
learning path, interactive examples, interview questions, exercises, case study +
AI usage, knowledge map). See `src/pages/contributing.mdx` (published at
`/contributing`).
