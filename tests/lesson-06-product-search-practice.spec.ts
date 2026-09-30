import { test, expect } from '@playwright/test';

test('Automation Exercise searches for Men Tshirt', async ({ page }) => {
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
  
  page.getByRole('heading', {
  name: /searched products/i,
});
const searchProductInput = page.getByPlaceholder('Search Product');

await expect(featuresHeading).toBeVisible();
await expect(searchProductInput).toBeVisible();

// Вводим название товара
await searchProductInput.fill('Men Tshirt');

// Проверяем, что значение действительно введено
await expect(searchProductInput).toHaveValue('Men Tshirt');

const searchButton = page.locator('#submit_search');
await searchButton.click();

const searchedProductsHeading = page.getByRole('heading', {
  name: /searched products/i,
});

const blueTopProduct = page
  .getByText('Men Tshirt', {
    exact: true,
  })
  .first();

// Проверяем результат поиска
await expect(searchedProductsHeading).toBeVisible();
await expect(blueTopProduct).toBeVisible();

});