import { test, expect } from '@playwright/test';

test('verify refined layout', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v9_home.png', fullPage: true });

  await page.goto('http://localhost:3000/product/test');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v9_product.png', fullPage: true });
});

test('verify header mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v9_mobile_header.png' });
});
