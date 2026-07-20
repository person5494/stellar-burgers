import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';

import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';

import {
  getIngredients,
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/slices/ingredientsSlice';
import { useDispatch, useSelector } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectIngredientsError);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const constructorPage = isIngredientsLoading ? (
    <Preloader />
  ) : error ? (
    <div className={`${styles.error} text text_type_main-medium pt-4`}>
      {error}
    </div>
  ) : ingredients.length > 0 ? (
    <ConstructorPage />
  ) : (
    <div className={`${styles.title} text text_type_main-medium pt-4`}>
      Нет ингредиентов
    </div>
  );

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={constructorPage} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
