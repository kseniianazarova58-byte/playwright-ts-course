import { test, expect, type Page } from '@playwright/test';

async function closeCookieBanner(page: Page) {
  const consentButton = page
    .getByRole('button', {
      name: /consent|accept all|allow all/i,
    })
    .first();

  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
}

test('Products page opens using a helper function', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  // Вызываем функцию вместо повторения всего кода
  await closeCookieBanner(page);

  await expect(page).toHaveURL(
    /\/products(?:#google_vignette)?$/,
  );

  const allProductsHeading = page.getByRole('heading', {
    name: /all products/i,
  });

  const searchProductInput =
    page.getByPlaceholder('Search Product');

  await expect(allProductsHeading).toBeVisible();
  await expect(searchProductInput).toBeVisible();
});