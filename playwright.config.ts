import {defineConfig} from '@playwright/test';

/**
 * Smoke tests run against the *built* static site (npm run build first),
 * served locally by `docusaurus serve`. Keep this fast — it's a CI gate,
 * not a full E2E suite.
 */
const PORT = 3210;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {timeout: 10_000},
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `npm run serve -- --port ${PORT} --no-open`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
