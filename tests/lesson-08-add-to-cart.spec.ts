import { test, expect } from '@playwright/test';

test('Blue Top can be added to cart', async ({ page }) => {
  await page.goto(
    'https://www.automationexercise.com/product_details/1',
  );

  // Закрываем окно cookie, если оно появилось
  const consentButton = page
    .getByRole('button', {
      name: /consent|accept all|allow all/i,
    })
    .first();

  if (await consentButton.isVisible()) {
    await consentButton.click();
  }

  await expect(page).toHaveURL(/\/product_details\/1$/);

  // Добавляем товар в корзину
  const addToCartButton = page.getByRole('button', {
    name: /add to cart/i,
  });

  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // Проверяем модальное окно
  const addedHeading = page.getByRole('heading', {
    name: 'Added!',
    exact: true,
  });

  await expect(addedHeading).toBeVisible();

  const viewCartLink = page.getByRole('link', {
    name: 'View Cart',
    exact: true,
  });

  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  // Проверяем страницу корзины
  await expect(page).toHaveURL(/\/view_cart$/);

  const cartRow = page.locator('#product-1');

  await expect(cartRow).toBeVisible();

  const productLink = cartRow.getByRole('link', {
    name: 'Blue Top',
    exact: true,
  });

  const quantity = cartRow.getByRole('button', {
    name: '1',
    exact: true,
  });

  await expect(productLink).toBeVisible();
  await expect(cartRow).toContainText('Women > Tops');
  await expect(cartRow).toContainText('Rs. 500');
  await expect(quantity).toBeVisible();
});