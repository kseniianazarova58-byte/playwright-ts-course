import { test, expect } from '@playwright/test';

test('One of two products can be removed from cart', async ({ page }) => {
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

  // Открываем первый товар
  const secondViewProductLink = page
  .locator('a[href="/product_details/2"]:visible')
  .first();

await expect(secondViewProductLink).toBeVisible();
await secondViewProductLink.click();

await expect(page).toHaveURL(/\/product_details\/2$/, {
  timeout: 10_000,
});

  await expect(page).toHaveURL(/\/product_details\/2$/);

  // Проверяем карточку товара
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

  const continueShoppingButton = page.getByRole('button', {
    name: /continue shopping/i,
  });

  await expect(continueShoppingButton).toBeVisible();
  await continueShoppingButton.click();

// Возвращаемся в каталог напрямую,
// чтобы Google-реклама не блокировала клик по меню
await page.goto('https://www.automationexercise.com/products');

await expect(page).toHaveURL(
  /\/products(?:#google_vignette)?$/,
);


// Переходим в карточку другого товара — Blue Top
await page.goto(
  'https://www.automationexercise.com/product_details/1',
);

await expect(page).toHaveURL(/\/product_details\/1$/);

const blueTopInformation = page.locator('.product-information');

await expect(blueTopInformation).toContainText('Blue Top');
await expect(blueTopInformation).toContainText('Rs. 500');

// Добавляем Blue Top
const addBlueTopToCartButton = page.getByRole('button', {
  name: /add to cart/i,
});

await expect(addBlueTopToCartButton).toBeVisible();
await addBlueTopToCartButton.click();

  // Переходим в корзину через модальное окно
  const viewCartLink = page.getByRole('link', {
    name: 'View Cart',
    exact: true,
  });

  await expect(viewCartLink).toBeVisible();
  await viewCartLink.click();

  await expect(page).toHaveURL(/\/view_cart$/);

  // Проверяем добавленный товар
  const firstCartRow = page.locator('#product-1');

  await expect(firstCartRow).toBeVisible();
  await expect(firstCartRow).toContainText('Blue Top');
  await expect(firstCartRow).toContainText('Rs. 500');

  // Проверяем страницу корзины
  await expect(page).toHaveURL(/\/view_cart$/);

  const secondCartRow = page.locator('#product-2');

  await expect(secondCartRow).toBeVisible();

  const productLink = secondCartRow.getByRole('link', {
    name: 'Men Tshirt',
    exact: true,
  });

  const quantity = secondCartRow.getByRole('button', {
    name: '1',
    exact: true,
  });

  await expect(productLink).toBeVisible();
  await expect(secondCartRow).toContainText('Men > Tshirts');
  await expect(secondCartRow).toContainText('Rs. 400');
  await expect(quantity).toBeVisible();

  // Находим кнопку удаления внутри строки товара
  const deleteButton = secondCartRow.locator('.cart_quantity_delete');

  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Проверяем, что строка товара исчезла
  await expect(secondCartRow).toHaveCount(0);

await expect(firstCartRow).toBeVisible();
await expect(firstCartRow).toContainText('Blue Top');
});