import { useEffect } from 'react';
import type { FC } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import {
  getFeeds,
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='pt-10'>
        <p className='text text_type_main-medium'>
          Не удалось загрузить ленту заказов
        </p>
        <p className='text text_type_main-default text_color_inactive pt-2'>
          {error}
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
