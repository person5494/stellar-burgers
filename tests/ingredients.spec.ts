import { expect, test } from '@playwright/test';

test('отображает ингредиенты из HAR-файла', async ({ page }) => {
  await page.routeFromHAR('./tests/fixtures/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/');

  await expect(
    page.getByText('Краторная булка N-200i', { exact: true })
  ).toBeVisible();
});

test('добавляет булку в конструктор', async ({ page }) => {
  await page.routeFromHAR('./tests/fixtures/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/');

  const bunCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Краторная булка N-200i' });

  await bunCard.getByRole('button', { name: 'Добавить' }).click();

  await expect(
    page.getByText('Краторная булка N-200i (верх)', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Краторная булка N-200i (низ)', { exact: true })
  ).toBeVisible();
});

test('добавляет соус в конструктор', async ({ page }) => {
  await page.routeFromHAR('./tests/fixtures/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.goto('/');

  const sauceCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Соус Spicy-X' });

  await sauceCard.getByRole('button', { name: 'Добавить' }).click();

  const constructor = page.getByTestId('burger-constructor');

  await expect(
    constructor.getByText('Соус Spicy-X', { exact: true })
  ).toBeVisible();
});
