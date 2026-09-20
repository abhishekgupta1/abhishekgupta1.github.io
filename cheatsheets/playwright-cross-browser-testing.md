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

<TenMinute minutes={5}>

1. Begin with the **Why Playwright for this** card
2. Then the **Structure that scales** and **Multi-browser config essentials** cards
3. Treat the other 4 cards as lookups — scan by card title when you need one
4. Open the [full article](/articles/playwright-cross-browser-testing-guide) when a card isn't enough

</TenMinute>

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

---

<Exercises>
<Exercises.Task title="See one test become three" level="intermediate" stretch="After running npx playwright install, run only one engine with the project option.">

In a Playwright project, save this as `playwright.config.ts` and a one-line test beside it:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: { trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

```ts
import { test, expect } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.setContent('<h1>Welcome</h1>');
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
```

Run `npx playwright test --list`. This lists the tests without launching any browser.

**Done when:** the same test appears three times, once each under `[chromium]`, `[firefox]`, and `[webkit]`, and the summary says `Total: 3 tests in 1 file`.

</Exercises.Task>
<Exercises.Task title="Reuse a login with storage state" level="advanced">

Save the session from one browser context and load it into a fresh one, so the second context starts already signed in. The page is served by `page.route`, so no real site is needed:

```ts
import { test, expect } from '@playwright/test';

const html = '<p>app</p>';

test('storage state carries a login into a new context', async ({ browser }) => {
  const first = await browser.newContext();
  const p1 = await first.newPage();
  await p1.route('https://app.test/', r => r.fulfill({ contentType: 'text/html', body: html }));
  await p1.goto('https://app.test/');
  await p1.evaluate(() => localStorage.setItem('token', 'abc123'));
  await first.storageState({ path: 'auth.json' });
  await first.close();

  const second = await browser.newContext({ storageState: 'auth.json' });
  const p2 = await second.newPage();
  await p2.route('https://app.test/', r => r.fulfill({ contentType: 'text/html', body: html }));
  await p2.goto('https://app.test/');
  expect(await p2.evaluate(() => localStorage.getItem('token'))).toBe('abc123');
  await second.close();
});
```

**Done when:** the test passes, `auth.json` contains the saved `token`, and you can explain why generating this file once in a global setup, instead of logging in inside every test, shortens the suite. Also decide whether `auth.json` belongs in version control.

</Exercises.Task>
</Exercises>

<CaseStudy title="The pause that only failed in one browser">
<CaseStudy.Context>

*Illustrative scenario.* A suite waits two seconds with a fixed timeout after each action, and it passes reliably in Chromium. Once Firefox and WebKit projects are added, a handful of tests start failing intermittently in just one engine.

</CaseStudy.Context>
<CaseStudy.WhatHappened>

Each engine resolves network timing a little differently, so a fixed pause that was long enough in one browser was sometimes too short in another. The team added browser-specific conditionals to work around it, and the suite grew harder to read.

</CaseStudy.WhatHappened>
<CaseStudy.Lesson>

Wait on a specific response or a visible state instead of a fixed delay, and annotate known per-browser issues instead of writing conditional logic. The same test then behaves the same way in every engine.

</CaseStudy.Lesson>
</CaseStudy>

<AISpark>

- Ask an assistant to review a Playwright config for missing projects, retry rules, and trace settings, then run `--list` to confirm each test appears once per browser.
- Have it turn a login helper into a storage-state fixture, and check that the saved auth file is kept out of version control because it holds session data.
- Ask it to explain a failure that appears in only one browser, and reproduce it with the `--project` option before you believe the explanation.

</AISpark>
