import { getIngredients, ingredientsReducer } from './ingredientsSlice';
import type { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'ingredient-1',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    price: 100,
    image: 'image.png',
    image_large: 'image-large.png',
    image_mobile: 'image-mobile.png'
  }
];

describe('ingredientsReducer', () => {
  test('возвращает начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test('не изменяет состояние при неизвестном экшене', () => {
    const currentState = {
      ingredients: [],
      isLoading: true,
      error: 'Ошибка'
    };

    const state = ingredientsReducer(currentState, {
      type: 'unknown'
    });

    expect(state).toEqual(currentState);
  });

  test('устанавливает состояние загрузки при getIngredients.pending', () => {
    const currentState = {
      ingredients: [],
      isLoading: false,
      error: 'Предыдущая ошибка'
    };

    const action = getIngredients.pending('requestId', undefined);
    const state = ingredientsReducer(currentState, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('сохраняет ингредиенты при getIngredients.fulfilled', () => {
    const currentState = {
      ingredients: [],
      isLoading: true,
      error: null
    };

    const action = getIngredients.fulfilled(
      mockIngredients,
      'requestId',
      undefined
    );

    const state = ingredientsReducer(currentState, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('сохраняет ошибку при getIngredients.rejected', () => {
    const currentState = {
      ingredients: mockIngredients,
      isLoading: true,
      error: null
    };

    const action = getIngredients.rejected(
      new Error('Ошибка запроса'),
      'requestId',
      undefined
    );

    const state = ingredientsReducer(currentState, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: 'Ошибка запроса'
    });
  });
});
