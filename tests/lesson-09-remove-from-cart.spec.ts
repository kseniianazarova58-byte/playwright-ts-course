import { test, expect } from '@playwright/test';

test('Blue Top can be removed from cart', async ({ page }) => {
  await page.goto(
    'https://www.automationexercise.com/product_details/1',
  );

  const consentButton = page
    .getByRole('button', {
      name: /consent|accept all|allow all/i,
    })
    .first();

  if (await consentButton.isVisible()) {
    await consentButton.click();
  }

  await expect(page).toHaveURL(/\/product_details\/1$/);

  // Добавляем товар
  const addToCartButton = page.getByRole('button', {
    name: /add to cart/i,
  });

  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // Переходим в корзину через модальное окно
  const viewCartLink = page.getByRole('link', {
    name: 'View Cart',
    exact: true,
  });

  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  await expect(page).toHaveURL(/\/view_cart$/);

  // Проверяем добавленный товар
  const cartRow = page.locator('#product-1');

  await expect(cartRow).toBeVisible();
  await expect(cartRow).toContainText('Blue Top');
  await expect(cartRow).toContainText('Rs. 500');

  // Находим кнопку удаления внутри строки товара
  const deleteButton = cartRow.locator('.cart_quantity_delete');

  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Проверяем, что строка товара исчезла
  await expect(cartRow).toHaveCount(0);
});