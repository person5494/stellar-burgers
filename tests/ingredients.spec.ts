import { expect, test } from '@playwright/test';

test.describe('Ингредиенты и модальное окно', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/fixtures/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await page.goto('/');
  });

  test('отображает ингредиенты из HAR-файла', async ({ page }) => {
    await expect(
      page.getByText('Краторная булка N-200i', { exact: true })
    ).toBeVisible();
  });

  test('добавляет булку в конструктор', async ({ page }) => {
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
    const sauceCard = page
      .getByRole('listitem')
      .filter({ hasText: 'Соус Spicy-X' });

    await sauceCard.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.getByTestId('burger-constructor');

    await expect(
      constructor.getByText('Соус Spicy-X', { exact: true })
    ).toBeVisible();
  });

  test('открывает и закрывает модальное окно ингредиента', async ({ page }) => {
    const bunCard = page
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200i' });

    await bunCard.getByRole('link').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await expect(
      modal.getByText('Краторная булка N-200i', { exact: true })
    ).toBeVisible();

    await expect(
      modal.getByText('Калории, ккал', { exact: true })
    ).toBeVisible();

    await expect(modal.getByText('420', { exact: true })).toBeVisible();

    await modal.getByRole('button', { name: 'Закрыть модальное окно' }).click();

    await expect(modal).not.toBeVisible();
  });

  test('закрывает модальное окно по клику на оверлей', async ({ page }) => {
    const bunCard = page
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200i' });

    await bunCard.getByRole('link').click();

    const modal = page.getByTestId('modal');
    const overlay = page.getByTestId('modal-overlay');

    await expect(modal).toBeVisible();

    await overlay.click({
      position: {
        x: 10,
        y: 10
      }
    });

    await expect(modal).not.toBeVisible();
  });
});
