import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';

import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (error) {
    return <Navigate to='/404' replace />;
  }

  if (!ingredientData) {
    return <Navigate to='/404' replace />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
