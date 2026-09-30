import { test, expect } from '@playwright/test';

test('Men Tshirt product details are displayed correctly', async ({ page }) => {
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

  // Переходим в каталог
  const productsLink = page.getByRole('link', {
    name: /products/i,
  });

  await expect(productsLink).toBeVisible();
  await productsLink.click();

  await expect(page).toHaveURL(/\/products$/);

  // Открываем второй товар
  const firstViewProductLink = page
    .getByRole('link', {
      name: /view product/i,
    })
    .nth(1);

  await expect(firstViewProductLink).toBeVisible();
  await firstViewProductLink.click();

  // Проверяем переход в карточку первого товара
  await expect(page).toHaveURL(/\/product_details\/2$/);

  // Ограничиваем проверки контейнером информации о товаре
  const productInformation = page.locator('.product-information');

  const productName = productInformation.getByRole('heading', {
    name: 'Men Tshirt',
    exact: true,
  });

  await expect(productName).toBeVisible();
  await expect(productInformation).toContainText('Category: Men > Tshirts');
  await expect(productInformation).toContainText('Rs. 400');
  await expect(productInformation).toContainText('Availability: In Stock');
  await expect(productInformation).toContainText('Condition: New');
  await expect(productInformation).toContainText('Brand: H&M');
});