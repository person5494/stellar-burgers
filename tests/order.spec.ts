import { expect, test } from '@playwright/test';

test.describe('Оформление заказа', () => {
  test('оформляет заказ и очищает конструктор', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
      document.cookie = 'accessToken=test-access-token';
    });

    await page.routeFromHAR('./tests/fixtures/order.har', {
      url: '**/api/**',
      update: false,
      notFound: 'abort'
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
});
