import { test, expect } from '@playwright/test';

test('catalog page loads and shows content', async ({ page }) => {
  await page.goto('http://localhost:3000/catalog');
  await expect(page.locator('h1')).toContainText('Katalog TWWW');
  await page.screenshot({ path: 'catalog_verification.png', fullPage: true });
});
