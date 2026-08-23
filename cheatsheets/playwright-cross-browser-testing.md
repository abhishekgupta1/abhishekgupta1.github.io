---
title: "Cross-Browser Playwright Cheat Sheet"
description: "Key takeaways for building a resilient cross-browser Playwright suite — structure, config, fixtures, and CI."
tags: [playwright, sdet, cheat-sheet]
hide_table_of_contents: true
---

# Cross-browser Playwright — key takeaways

Highlights from the article, condensed. For the full walkthrough and
reasoning, read [the article](/articles/playwright-cross-browser-testing-guide).

<a class="topic-crosslink" href="/articles/playwright-cross-browser-testing-guide">📖 Full article: Cross-Browser Playwright →</a>

<div class="cheat-sheet cheat-sheet--sdet">

<div class="cheat-card">

#### Why Playwright for this

One unified API drives Chromium, Firefox, and WebKit — no separate driver
management (unlike Selenium), no lock-in to one engine (unlike Cypress).
Auto-wait removes most of the flakiness `sleep()` calls were papering over.

</div>

<div class="cheat-card">

#### Structure that scales

```
tests/
├── e2e/<feature>/*.spec.js   # group by feature, not by type
├── fixtures/
└── playwright.config.js
```

A flat directory is fine at 20 tests; group by feature once you pass ~50.

</div>

<div class="cheat-card">

#### Multi-browser config essentials

```js
fullyParallel: true,
retries: process.env.CI ? 2 : 0,   // fail fast locally
use: { trace: 'on-first-retry', screenshot: 'only-on-failure' },
projects: [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox',  use: devices['Desktop Firefox'] },
  { name: 'webkit',   use: devices['Desktop Safari'] },
],
```

</div>

<div class="cheat-card">

#### Reuse auth via storage state

```js
authenticatedPage: async ({ browser }, use) => {
  const ctx = await browser.newContext({ storageState: './tests/.auth/user.json' });
  await use(await ctx.newPage());
},
```

Generate the storage state once in global setup — cut this suite's runtime by 40%.

</div>

<div class="cheat-card">

#### Handling browser-specific quirks

- Skip/annotate known per-browser issues instead of writing conditional logic
- Viewport-aware assertions for mobile projects
- Prefer `waitForResponse`/`waitForLoadState('networkidle')` over fixed
  timeouts — engines resolve network timing differently

</div>

<div class="cheat-card">

#### CI: upload reports only on failure

```yaml
- uses: actions/upload-artifact@v4
  if: failure()
  with: { name: playwright-report, path: playwright-report/ }
```

Keeps CI storage lean while preserving full debugging capability when
something breaks.

</div>

<div class="cheat-card">

#### Results after applying these patterns

- Regression runtime: 45 min → 18 min (parallelism + auth caching)
- Stability: ~82% → 95% across all three engines
- False positive rate: below 2%

</div>

</div>
