import { test, expect } from '@playwright/test';

import userData from './fixtures/user.json';
import orderData from './fixtures/order.json';

test('оформляет заказ и очищает конструктор', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
    document.cookie = 'accessToken=test-access-token';
  });

  await page.routeFromHAR('./tests/fixtures/ingredients.har', {
    url: '**/ingredients',
    update: false
  });

  await page.route('**/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userData)
    });
  });

  await page.route('**/orders', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(orderData)
    });
  });

  await page.goto('/');

  const bunCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Краторная булка N-200i' });

  const sauceCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Соус Spicy-X' });

  const mainCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Биокотлета из марсианской Магнолии' });

  await bunCard.getByRole('button', { name: 'Добавить' }).click();
  await sauceCard.getByRole('button', { name: 'Добавить' }).click();
  await mainCard.getByRole('button', { name: 'Добавить' }).click();

  const constructor = page.getByTestId('burger-constructor');

  await expect(
    constructor.getByText('Краторная булка N-200i (верх)', { exact: true })
  ).toBeVisible();

  await expect(
    constructor.getByText('Соус Spicy-X', { exact: true })
  ).toBeVisible();

  await expect(
    constructor.getByText('Биокотлета из марсианской Магнолии', {
      exact: true
    })
  ).toBeVisible();

  await constructor.getByRole('button', { name: 'Оформить заказ' }).click();

  const modal = page.getByTestId('modal');

  await expect(modal).toBeVisible();
  await expect(modal.getByText('12345', { exact: true })).toBeVisible();
  await expect(
    modal.getByText('идентификатор заказа', { exact: true })
  ).toBeVisible();

  await expect(
    constructor.getByText('Выберите булки', { exact: true })
  ).toHaveCount(2);

  await expect(
    constructor.getByText('Выберите начинку', { exact: true })
  ).toBeVisible();

  await modal.getByRole('button', { name: 'Закрыть модальное окно' }).click();

  await expect(modal).not.toBeVisible();
});
