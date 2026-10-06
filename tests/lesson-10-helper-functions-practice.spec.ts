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

async function openRandomProductDetails(
  page: Page,
): Promise<string> {
  const productCards = page.locator(
    '.product-image-wrapper:visible',
  );

  const productCount = await productCards.count();

  expect(productCount).toBeGreaterThan(0);

  const randomIndex = Math.floor(
    Math.random() * productCount,
  );

  const selectedProductCard =
    productCards.nth(randomIndex);

  await expect(selectedProductCard).toBeVisible();

  // Запоминаем название случайно выбранного товара
  const expectedProductName = (
    await selectedProductCard
      .locator('.productinfo p')
      .innerText()
  ).trim();

  // Находим View Product внутри выбранной карточки
  const viewProductLink =
    selectedProductCard.getByRole('link', {
      name: /view product/i,
    });

  await expect(viewProductLink).toBeVisible();

  // Реальный пользовательский клик
  await viewProductLink.click();

  return expectedProductName;
}

test('A random product can be opened', async ({ page }) => {
  await page.goto(
    'https://www.automationexercise.com/products',
  );

  await closeCookieBanner(page);

  await expect(page).toHaveURL(
    /\/products(?:#google_vignette)?$/,
  );

  const expectedProductName =
    await openRandomProductDetails(page);

  await expect(page).toHaveURL(
    /\/product_details\/\d+(?:#google_vignette)?$/,
  );

  const productInformation = page.locator(
    '.product-information',
  );

  const actualProductName =
    productInformation.getByRole('heading', {
      name: expectedProductName,
      exact: true,
    });

  await expect(actualProductName).toBeVisible();
  await expect(productInformation).toContainText(
    'Category:',
  );
  await expect(productInformation).toContainText(
   /Rs\.\s*\d+/
  );
  await expect(productInformation).toContainText(
    'Availability:',
  );
  await expect(productInformation).toContainText(
    'Condition:',
  );
  await expect(productInformation).toContainText(
    'Brand:',
  );
});