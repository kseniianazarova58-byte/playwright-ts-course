import { test, expect } from '@playwright/test';

test('mySugr homepage opens successfully', async ({ page }) => {
  await page.goto('https://www.mysugr.com/');

  await expect(page).toHaveTitle(/mySugr/i);
});
test('main heading is visible', async ({ page }) => {
  await page.goto('https://www.mysugr.com/us');

  const mainHeading = page.getByRole('heading', {
    name: /Simplifying life/i,
  });

  await expect(mainHeading).toBeVisible();

  const devicesHeading = page.getByRole('heading', {
  name: /Welcome to mySugr/i,
});

await expect(devicesHeading).toBeVisible();
});

test('user can open the About us page', async ({ page }) => {
  await page.goto('https://www.mysugr.com/');

  const aboutUsLink = page.getByRole('link', {
    name: 'About us',
    exact: true,
  });

  await expect(aboutUsLink).toBeVisible();

  await aboutUsLink.click();

  await expect(page).toHaveURL(/\/about-us$/);

  const pageHeading = page.getByRole('heading', {
    name: 'The story of mySugr',
  });

  await expect(pageHeading).toBeVisible();
});

test('user can open the Research page', async ({ page }) => {
  await page.goto('https://www.mysugr.com/');

  const ResearchLink = page.getByRole('link', {
    name: 'Research',
    exact: true,
  })
  .first();

  await expect(ResearchLink).toBeVisible();

  await ResearchLink.click();

  await expect(page).toHaveURL(/\/science-and-research$/);

  const pageHeading = page.getByRole('heading', {
    name: 'Research',
  });

  await expect(pageHeading).toBeVisible();
});