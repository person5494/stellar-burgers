import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';

import {
  getUserOrders,
  selectUserOrders
} from '../../services/slices/feedSlice';

import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
