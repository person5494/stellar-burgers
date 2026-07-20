import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

import type { RootState } from '../store';

type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TBurgerConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

type TMoveIngredientPayload = {
  fromIndex: number;
  toIndex: number;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },

      prepare: (ingredient: TIngredient) => {
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id: nanoid()
        };

        return {
          payload: constructorIngredient
        };
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },

    moveIngredient: (state, action: PayloadAction<TMoveIngredientPayload>) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;

      if (
        fromIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex < 0 ||
        toIndex >= ingredients.length ||
        fromIndex === toIndex
      ) {
        return;
      }

      const [movedIngredient] = ingredients.splice(fromIndex, 1);

      if (!movedIngredient) {
        return;
      }

      ingredients.splice(toIndex, 0, movedIngredient);
    }
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
