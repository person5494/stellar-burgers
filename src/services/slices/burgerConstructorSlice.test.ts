import {
  addIngredient,
  burgerConstructorReducer,
  clearOrderModalData,
  createOrder,
  moveIngredient,
  removeIngredient
} from './burgerConstructorSlice';

import type { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
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
};

const mockIngredient: TIngredient = {
  _id: 'ingredient-1',
  name: 'Тестовая котлета',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 5,
  calories: 250,
  price: 200,
  image: 'ingredient.png',
  image_large: 'ingredient-large.png',
  image_mobile: 'ingredient-mobile.png'
};

const mockIngredientTwo: TIngredient = {
  _id: 'ingredient-2',
  name: 'Тестовый соус',
  type: 'sauce',
  proteins: 2,
  fat: 1,
  carbohydrates: 8,
  calories: 50,
  price: 80,
  image: 'sauce.png',
  image_large: 'sauce-large.png',
  image_mobile: 'sauce-mobile.png'
};

describe('burgerConstructorReducer', () => {
  test('возвращает начальное состояние', () => {
    const state = burgerConstructorReducer(undefined, {
      type: 'unknown'
    });

    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    });
  });

  test('не изменяет состояние при неизвестном экшене', () => {
    const currentState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: true,
      orderModalData: {
        number: 12345
      },
      orderError: 'Ошибка'
    };

    const state = burgerConstructorReducer(currentState, {
      type: 'unknown'
    });

    expect(state).toEqual(currentState);
  });

  test('добавляет булку в конструктор', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(mockBun));

    expect(state.constructorItems.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });

    expect(state.constructorItems.ingredients).toEqual([]);
  });

  test('добавляет обычный ингредиент в конструктор', () => {
    const state = burgerConstructorReducer(
      undefined,
      addIngredient(mockIngredient)
    );

    expect(state.constructorItems.ingredients).toEqual([
      {
        ...mockIngredient,
        id: expect.any(String)
      }
    ]);

    expect(state.constructorItems.bun).toBeNull();
  });

  test('удаляет ингредиент из конструктора по id', () => {
    const stateWithIngredient = burgerConstructorReducer(
      undefined,
      addIngredient(mockIngredient)
    );

    const ingredientId = stateWithIngredient.constructorItems.ingredients[0].id;

    const state = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient(ingredientId)
    );

    expect(state.constructorItems.ingredients).toEqual([]);
  });

  test('перемещает ингредиент внутри конструктора', () => {
    const stateWithFirstIngredient = burgerConstructorReducer(
      undefined,
      addIngredient(mockIngredient)
    );

    const stateWithTwoIngredients = burgerConstructorReducer(
      stateWithFirstIngredient,
      addIngredient(mockIngredientTwo)
    );

    const state = burgerConstructorReducer(
      stateWithTwoIngredients,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(state.constructorItems.ingredients[0]._id).toBe(
      mockIngredientTwo._id
    );

    expect(state.constructorItems.ingredients[1]._id).toBe(mockIngredient._id);
  });

  test('не перемещает ингредиенты при некорректных индексах', () => {
    const stateWithFirstIngredient = burgerConstructorReducer(
      undefined,
      addIngredient(mockIngredient)
    );

    const stateWithTwoIngredients = burgerConstructorReducer(
      stateWithFirstIngredient,
      addIngredient(mockIngredientTwo)
    );

    const state = burgerConstructorReducer(
      stateWithTwoIngredients,
      moveIngredient({
        fromIndex: -1,
        toIndex: 1
      })
    );

    expect(state.constructorItems.ingredients).toEqual(
      stateWithTwoIngredients.constructorItems.ingredients
    );
  });

  test('очищает данные модального окна заказа и ошибку', () => {
    const currentState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: {
        number: 12345
      },
      orderError: 'Ошибка заказа'
    };

    const state = burgerConstructorReducer(currentState, clearOrderModalData());

    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      orderError: null
    });
  });

  test('устанавливает состояние оформления заказа при createOrder.pending', () => {
    const currentState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: {
        number: 12345
      },
      orderError: 'Предыдущая ошибка'
    };

    const action = createOrder.pending('requestId', ['bun-1']);
    const state = burgerConstructorReducer(currentState, action);

    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: true,
      orderModalData: null,
      orderError: null
    });
  });

  test('сохраняет номер заказа и очищает конструктор при createOrder.fulfilled', () => {
    const currentState = {
      constructorItems: {
        bun: {
          ...mockBun,
          id: 'bun-constructor-id'
        },
        ingredients: [
          {
            ...mockIngredient,
            id: 'ingredient-constructor-id'
          }
        ]
      },
      orderRequest: true,
      orderModalData: null,
      orderError: null
    };

    const action = createOrder.fulfilled({ number: 12345 }, 'requestId', [
      'bun-1',
      'ingredient-1'
    ]);

    const state = burgerConstructorReducer(currentState, action);

    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: {
        number: 12345
      },
      orderError: null
    });
  });

  test('сохраняет ошибку при createOrder.rejected', () => {
    const currentState = {
      constructorItems: {
        bun: {
          ...mockBun,
          id: 'bun-constructor-id'
        },
        ingredients: [
          {
            ...mockIngredient,
            id: 'ingredient-constructor-id'
          }
        ]
      },
      orderRequest: true,
      orderModalData: null,
      orderError: null
    };

    const action = createOrder.rejected(
      new Error('Ошибка оформления заказа'),
      'requestId',
      ['bun-1', 'ingredient-1']
    );

    const state = burgerConstructorReducer(currentState, action);

    expect(state).toEqual({
      constructorItems: {
        bun: {
          ...mockBun,
          id: 'bun-constructor-id'
        },
        ingredients: [
          {
            ...mockIngredient,
            id: 'ingredient-constructor-id'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      orderError: 'Ошибка оформления заказа'
    });
  });
});
