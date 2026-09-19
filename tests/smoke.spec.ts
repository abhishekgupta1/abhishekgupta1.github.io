import {test, expect} from '@playwright/test';

test('home renders the hero heading', async ({page}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', {name: 'Abhishek Gupta', level: 1}),
  ).toBeVisible();
});

const ROUTES = [
  ['Docs', '/docs/intro'],
  ['Cheat Sheets', '/cheatsheets'],
  ['Articles', '/articles'],
  ['Projects', '/projects'],
  ['Resume', '/resume'],
  ['Certificates', '/certificates'],
  ['Dashboard', '/dashboard'],
  ['Start', '/start'],
  ['Roadmap', '/roadmap'],
  ['Skills', '/skills'],
  ['About', '/about'],
  ['Uses', '/uses'],
  ['Now', '/now'],
  ['Privacy', '/privacy'],
] as const;

for (const [name, path] of ROUTES) {
  test(`route resolves: ${name}`, async ({page}) => {
    const res = await page.goto(path);
    expect(res, `${path} returned no response`).not.toBeNull();
    expect(res!.status(), `${name} (${path})`).toBeLessThan(400);
    await expect(page.locator('main')).toBeVisible();
  });
}

test('cheatsheet shows the progress tracker', async ({page}) => {
  await page.goto('/cheatsheets/playwright');
  await expect(
    page.getByRole('group', {name: /mark your progress/i}),
  ).toBeVisible();
});

test('dashboard exposes an export control', async ({page}) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('button', {name: /export/i})).toBeVisible();
});

test('navbar search input is present and editable', async ({page}) => {
  await page.goto('/');
  const input = page.locator('input.navbar__search-input').first();
  await expect(input).toBeVisible();
  await input.click();
  await input.fill('playwright');
  await expect(input).toHaveValue('playwright');
});
