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

<!-- truncate -->

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
