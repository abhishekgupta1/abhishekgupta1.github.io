---
slug: playwright-cross-browser-testing-guide
title: "Building a Resilient Cross-Browser Test Suite with Playwright"
date: 2025-01-10
authors: [abhishek]
tags: [playwright, testing, automation, ci-cd]
description: "A practical walkthrough of structuring a Playwright test suite for reliable cross-browser coverage, parallel execution, and CI/CD integration."
image: "/img/og-image.png"
---

Cross-browser testing is one of those things that sounds straightforward until you actually try to maintain a stable suite across Chromium, Firefox, and WebKit. After spending months refining a Playwright framework that runs hundreds of tests across all three engines, here are the patterns that made the biggest difference.

<a class="topic-crosslink" href="/cheatsheets/playwright-cross-browser-testing">📋 Quick reference: Cross-Browser Playwright →</a>

<!-- truncate -->

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-cb-title mm-cb-desc">
<title id="mm-cb-title">One suite, three engines, one report</title>
<desc id="mm-cb-desc">A single test suite fans out to run unmodified against Chromium, Firefox, and WebKit as parallel projects, and the three results converge into one CI report.</desc>
<defs>
  <marker id="mm-cb-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="20" y="115" width="160" height="70" rx="10"/>
<text class="mm-node-title" x="100" y="145" text-anchor="middle">One test suite</text>
<text class="mm-node-sub" x="100" y="161" text-anchor="middle">same spec files,</text>
<text class="mm-node-sub" x="100" y="174" text-anchor="middle">no browser branches</text>

<path class="mm-arrow" d="M180,140 L296,60" marker-end="url(#mm-cb-arrow)"/>
<path class="mm-arrow" d="M180,150 L296,150" marker-end="url(#mm-cb-arrow)"/>
<path class="mm-arrow" d="M180,160 L296,240" marker-end="url(#mm-cb-arrow)"/>

<rect class="mm-n2" x="300" y="30" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="385" y="55" text-anchor="middle">Chromium</text>
<text class="mm-node-sub" x="385" y="71" text-anchor="middle">project config</text>

<rect class="mm-n4" x="300" y="120" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="385" y="145" text-anchor="middle">Firefox</text>
<text class="mm-node-sub" x="385" y="161" text-anchor="middle">project config</text>

<rect class="mm-n5" x="300" y="210" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="385" y="235" text-anchor="middle">WebKit</text>
<text class="mm-node-sub" x="385" y="251" text-anchor="middle">project config</text>

<path class="mm-arrow" d="M470,60 L586,140" marker-end="url(#mm-cb-arrow)"/>
<path class="mm-arrow" d="M470,150 L586,150" marker-end="url(#mm-cb-arrow)"/>
<path class="mm-arrow" d="M470,240 L586,160" marker-end="url(#mm-cb-arrow)"/>

<rect class="mm-n1" x="590" y="115" width="170" height="70" rx="10"/>
<text class="mm-node-title" x="675" y="145" text-anchor="middle">CI report</text>
<text class="mm-node-sub" x="675" y="161" text-anchor="middle">pass/fail per</text>
<text class="mm-node-sub" x="675" y="174" text-anchor="middle">engine, per shard</text>
</svg>

<p class="mental-model__caption">The suite itself never knows which engine it's running on — Playwright's <code>projects</code> config runs the same spec files three times in parallel, and the structure work (fixtures, page objects, retries) all lives upstream of that fan-out, so it only has to be written once.</p>
</div>

## Why Playwright Over Other Tools

Playwright ships with built-in support for all three major browser engines. Unlike Selenium, there's no separate driver management. Unlike Cypress, you're not locked into Chromium. The auto-wait mechanism alone eliminates a huge category of flaky tests — no more sprinkling `sleep()` calls everywhere.

But the real advantage is the unified API. The same test code runs identically across browsers without conditional logic or browser-specific workarounds (most of the time).

## Project Structure That Scales

A flat test directory works fine for 20 tests. At 200+, you need structure:

```
tests/
├── e2e/
│   ├── auth/
│   │   ├── login.spec.js
│   │   └── signup.spec.js
│   ├── dashboard/
│   │   ├── widgets.spec.js
│   │   └── navigation.spec.js
│   └── checkout/
│       ├── cart.spec.js
│       └── payment.spec.js
├── fixtures/
│   ├── auth.fixture.js
│   └── test-data.js
└── playwright.config.js
```

Group tests by feature, not by type. Keep fixtures and test data separate. This makes it easy to run a subset of tests when debugging a specific area.

## Configuration for Multi-Browser Runs

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
});
```

Key decisions here:
- `fullyParallel: true` runs tests across files and within files concurrently
- Retries only in CI — locally you want immediate failure feedback
- `trace: 'on-first-retry'` captures traces only when a test fails and retries, keeping artifacts small
- JUnit reporter for CI integration alongside the HTML report for local debugging

## Custom Fixtures for Auth State

Re-authenticating before every test is slow. Playwright's storage state feature lets you authenticate once and reuse the session:

```javascript
// fixtures/auth.fixture.js
const { test as base } = require('@playwright/test');

exports.test = base.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './tests/.auth/user.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});
```

Generate the storage state file in a global setup script that runs once before the entire suite. This alone cut our suite execution time by 40%.

## Handling Browser-Specific Quirks

Despite Playwright's unified API, browsers do behave differently. The three patterns I've found most useful:

1. **Test annotations for known issues**: Skip or mark tests as expected failures for specific browsers rather than writing conditional logic.

```javascript
test('file upload via drag and drop', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'WebKit drag-and-drop not supported in headless');
  // test body
});
```

2. **Viewport-aware assertions**: Mobile browsers render differently. Use project-specific viewport settings and write assertions that account for responsive layouts.

3. **Network timing tolerance**: Firefox and WebKit sometimes resolve network requests at different speeds. Use `waitForResponse` or `waitForLoadState('networkidle')` instead of fixed timeouts.

## CI/CD Integration with GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

Upload the HTML report as an artifact only on failure. This keeps your CI storage lean while still giving you full debugging capability when something breaks.

## Results

After applying these patterns to a real project:
- Regression suite runtime dropped from 45 minutes to 18 minutes (parallel execution + auth caching)
- Test stability improved from ~82% to 95% across all three browsers
- False positive rate dropped below 2%

The biggest lesson: invest time in your test infrastructure early. A well-structured framework pays dividends as the suite grows.
