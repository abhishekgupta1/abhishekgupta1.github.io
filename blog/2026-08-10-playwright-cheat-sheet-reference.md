---
slug: playwright-cheat-sheet-reference
title: "The Playwright Reference I Keep Coming Back To"
date: 2026-08-10
authors: [abhishek]
tags: [playwright, testing, automation, ci-cd]
description: "A scannable, curated Playwright cheat sheet — CLI commands, locator strategies, assertions, and the framework practices worth building around."
image: "/img/og-image.png"
---

Every time I set up a new Playwright suite or review someone else's, I end up hunting for the same handful of things: the right locator strategy, the assertion that auto-retries instead of flaking, the CLI flag I always forget. So I put together a single reference — part command cheat sheet, part framework checklist — that I keep coming back to. This is that reference, cleaned up and organized so it's actually scannable.

There's also a [scannable cheat sheet page](/cheatsheets/playwright) with the same material in card form.

<!-- truncate -->

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 200" role="img" aria-labelledby="mm-ref-title mm-ref-desc">
<title id="mm-ref-title">The five phases every Playwright run passes through</title>
<desc id="mm-ref-desc">Setup and run the suite, locate an element, act on it, assert the result with an auto-retrying expectation, then read the report or CI trace.</desc>
<defs>
  <marker id="mm-ref-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="20" y="60" width="130" height="80" rx="10"/>
<text class="mm-node-title" x="85" y="92" text-anchor="middle">Setup</text>
<text class="mm-node-sub" x="85" y="109" text-anchor="middle">playwright test</text>

<path class="mm-arrow" d="M150,100 L166,100" marker-end="url(#mm-ref-arrow)"/>

<rect class="mm-n2" x="172" y="60" width="130" height="80" rx="10"/>
<text class="mm-node-title" x="237" y="92" text-anchor="middle">Locate</text>
<text class="mm-node-sub" x="237" y="109" text-anchor="middle">role / text / id</text>

<path class="mm-arrow" d="M302,100 L318,100" marker-end="url(#mm-ref-arrow)"/>

<rect class="mm-n4" x="324" y="60" width="130" height="80" rx="10"/>
<text class="mm-node-title" x="389" y="92" text-anchor="middle">Act</text>
<text class="mm-node-sub" x="389" y="109" text-anchor="middle">click, fill, hover</text>

<path class="mm-arrow" d="M454,100 L470,100" marker-end="url(#mm-ref-arrow)"/>

<rect class="mm-n5" x="476" y="60" width="130" height="80" rx="10"/>
<text class="mm-node-title" x="541" y="92" text-anchor="middle">Assert</text>
<text class="mm-node-sub" x="541" y="109" text-anchor="middle">auto-retrying expect</text>

<path class="mm-arrow" d="M606,100 L622,100" marker-end="url(#mm-ref-arrow)"/>

<rect class="mm-n1" x="628" y="60" width="132" height="80" rx="10"/>
<text class="mm-node-title" x="694" y="92" text-anchor="middle">Report / CI</text>
<text class="mm-node-sub" x="694" y="109" text-anchor="middle">trace viewer</text>
</svg>

<p class="mental-model__caption">Every section below hangs off one of these five phases — pick the phase you're stuck on and jump straight to it instead of reading top to bottom.</p>
</div>

## CLI & Setup Commands

These are the commands you reach for from init through debugging a failing run.

```bash
# Initialize a new Playwright project
npm init playwright@latest

# Run the full suite
npx playwright test

# Run a specific spec file
npx playwright test tests/login.spec.ts

# Run in interactive UI mode
npx playwright test --ui

# Run in headed mode (see the browser)
npx playwright test --headed

# Step through with the inspector
npx playwright test --debug

# Auto-generate test code by recording actions
npx playwright codegen https://example.com

# Open the last HTML test report
npx playwright show-report
```

## Locator Strategies

Playwright's built-in Locator API auto-waits for elements to become visible and interactive before acting on them — that's the foundation of most of the reliability gains over older tools. The order below is roughly the priority I'd reach for them in: semantic, user-facing locators first, CSS/XPath as a last resort.

| Strategy | Example | When to use it |
|---|---|---|
| ARIA role | `page.getByRole('button', { name: 'Submit' })` | Default choice — mirrors how users and assistive tech find elements |
| Placeholder text | `page.getByPlaceholder('Enter password')` | Form fields with no visible label |
| Visible text | `page.getByText('Welcome back')` | Static content, confirmation messages |
| Form label | `page.getByLabel('Email address')` | Labeled inputs |
| Test identifier | `page.getByTestId('submit-btn')` | Elements with no stable semantic hook |
| CSS/XPath | `page.locator('div.container > #username')` | Fallback only — brittle against markup changes |

## Common User Actions

Every browser operation is asynchronous, so every one of these needs `await`. Forgetting it is one of the most common sources of flaky-looking failures that are really just race conditions in the test code.

```javascript
// Navigate
await page.goto('https://example.com');

// Click
await page.getByRole('button').click();

// Fill a text field
await page.getByPlaceholder('Username').fill('myUser');

// Check/uncheck a box
await page.locator('#terms').check();

// Select a dropdown option
await page.locator('#dropdown').selectOption('value1');

// Hover
await page.locator('#menu').hover();

// Press a key
await page.keyboard.press('Enter');
```

## Smart Assertions (Auto-Retrying)

Playwright's web-first assertions retry automatically until the condition passes or the timeout is hit. That's a meaningful difference from asserting on a Boolean you evaluated once — use these instead of manual polling or `waitForTimeout` hacks.

| Expected state | Code |
|---|---|
| Element is visible | `await expect(locator).toBeVisible();` |
| Element contains text | `await expect(locator).toHaveText('Success');` |
| Input has a value | `await expect(inputLocator).toHaveValue('admin');` |
| Element is enabled | `await expect(buttonLocator).toBeEnabled();` |
| Element is disabled | `await expect(buttonLocator).toBeDisabled();` |
| URL matches | `await expect(page).toHaveURL(/.*dashboard/);` |

## Advanced Scenarios

The bread-and-butter actions cover most flows, but real applications need network control, iframes, and file handling.

```javascript
// Intercept network requests
await page.route('**/api/data', route => route.continue());

// Mock an API response
await page.route('**/api/user', route =>
  route.fulfill({ status: 200, body: JSON.stringify({ name: 'Test' }) })
);

// Target elements inside an iframe
const frame = page.frameLocator('#iframe-id');
await frame.locator('#btn').click();

// Upload a local file
await page.setInputFiles('input[type=file]', 'fixtures/file.pdf');
```

A few more patterns worth having on hand for less common but recurring scenarios:

- **Multiple tabs/windows**: handle multi-page flows by waiting for the `popup` event on the browser context rather than assuming a single `page` object.
- **File downloads**: pair `setInputFiles()` for uploads with `page.waitForEvent('download')` to track downloads.
- **Visual regression**: `expect(page).toHaveScreenshot()` catches unintended layout drift automatically.

## Framework Architecture

Commands and locators get individual tests passing. What keeps a suite maintainable as it grows is the structure around them.

| Practice | What it means |
|---|---|
| Page Object Model (POM) | Separate class files per page, isolating selectors and action methods from test logic |
| Base test setup | Extend the base `test` fixture to inject custom pages, properties, or setup hooks automatically |
| Component-driven structure | Break complex pages into reusable sub-components — headers, footers, sidebars |
| Strict TypeScript config | A local `tsconfig.json` with strict type-checking catches selector and data errors early |
| Strict independent tests | Tests don't depend on each other's state, so they can run in parallel safely |
| Environment configuration | Multi-environment base URLs (Dev/QA/Staging) managed via environment variables, not hardcoded |

## Test Design & Scripting Practices

- **Semantic, user-facing locators first** — prefer `getByRole`, `getByText`, `getByLabel` over brittle CSS/XPath strings.
- **Dedicated test IDs** where semantics fall short — ask developers to add `data-testid` attributes to critical elements that don't have a natural ARIA role or label.
- **Lean on auto-waiting** — Playwright's native waiting mechanics handle most timing issues; hardcoded timeouts are a smell, not a fix.
- **Await everything** — every browser action and every assertion, explicitly.
- **Use web-first, auto-retrying assertions** — `expect(locator).toBeVisible()` instead of evaluating a Boolean and asserting on it.
- **Soft assertions for non-critical checks** — `expect.soft()` lets a test keep running and report multiple failures instead of stopping at the first one.

## State & Data Management

| Practice | Why it matters |
|---|---|
| Global authentication reuse | Authenticate once in a setup project, save browser storage state to a JSON file, reuse it across tests instead of logging in every time |
| Dynamic test data | Drive parameterized test loops from external JSON, CSV, or database fixtures |
| Independent data creation | Use API requests inside `beforeAll` hooks to generate unique test records per run |
| Environment teardown | Clean up mutated or created state in `afterAll` blocks or global teardown scripts |
| Isolated browser contexts | Confirm each test starts with a fresh context — no cookie or session pollution carried over from a previous test |

## Execution, CI/CD & Reporting

| Practice | Why it matters |
|---|---|
| Matrix cross-browser testing | Run against Chromium, Firefox, and WebKit to catch engine-specific regressions |
| Retries on CI only | A single retry (`retries: 1`) filters out minor network blips without masking real failures |
| Worker limits matched to CI capacity | Over-provisioning workers past what the runner's CPU can handle just slows everything down |
| Conditional pipeline triggers | Full regression on `main` merges, targeted smoke suites on pull requests |
| Failure-only artifact collection | Attach videos, trace files, and screenshots only for failing tests to keep CI storage lean |
| Trace viewer for local debugging | `npx playwright show-trace` replays a failing CI step frame-by-frame |

```bash
# Open a trace file captured from a CI failure
npx playwright show-trace trace.zip
```

## Summary

- Prefer semantic, user-facing locators (`getByRole`, `getByLabel`, `getByText`) over CSS/XPath — they're more resilient to markup changes and closer to how users actually find elements.
- Auto-retrying, web-first assertions (`expect(locator).toBeVisible()`) exist specifically to remove the need for manual waits — use them instead of polling or fixed timeouts.
- A good framework isn't just passing tests — it's POM structure, isolated contexts, reused auth state, and CI configuration that keeps the suite fast and debuggable as it scales.
- Trace files and failure-only artifacts are the difference between guessing why a CI test failed and actually seeing it happen.

## Common Mistakes

- Reaching for CSS/XPath selectors first instead of semantic locators, then rewriting the whole suite when the markup changes.
- Skipping `await` on an action or assertion — the test appears to run but isn't actually waiting for the operation to complete.
- Adding `waitForTimeout()` calls to "fix" flakiness instead of trusting Playwright's auto-waiting or fixing the underlying race condition.
- Sharing browser context or storage state across tests that should be independent, causing failures that only show up when tests run in a certain order.
- Collecting full trace/video/screenshot artifacts on every run instead of failure-only, which quietly eats CI storage and slows pipelines down.
