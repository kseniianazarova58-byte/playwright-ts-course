import { test, expect } from '@playwright/test';

test('Automation Exercise homepage opens successfully', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');

  await expect(page).toHaveTitle(/Automation Exercise/i);

  const homeLink = page.getByRole('link', {
    name: /Home/i,
  });

  await expect(homeLink).toBeVisible();

  const featuresHeading = page.getByRole('heading', {
    name: /Features Items/i,
  });

  await expect(featuresHeading).toBeVisible();
});

test('Automation Exercise Products opens successfully', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  // Закрываем окно cookie, если оно появилось
  const consentButton = page
    .getByRole('button', {
      name: /consent|accept all|allow all/i,
    })
    .first();

  if (await consentButton.isVisible()) {
    await consentButton.click();
  }

  await expect(page).toHaveTitle(/Automation Exercise/i);

  const productsLink = page.getByRole('link', {
    name: /products/i,
  });

  await expect(productsLink).toBeVisible();

  await productsLink.click();

  const featuresHeading = page.getByRole('heading', {
    name: /ALL PRODUCTS/i,
  });
  const searchProductInput = page.getByPlaceholder('Search Product');


  await expect(featuresHeading).toBeVisible();
  await expect(searchProductInput).toBeVisible();
});