import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
  await page.goto('https://app.qa.discoveryeducation.com/learn/techbook/landing/science');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});