import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import type { TOrder } from '@utils-types';
import type { RootState } from '../store';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;

  orderData: TOrder | null;
  orderDataLoading: boolean;
  orderDataError: string | null;

  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,

  orderData: null,
  orderDataLoading: false,
  orderDataError: null,

  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const getUserOrders = createAsyncThunk('feed/getUserOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'feed/getOrderByNumber',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    const order = response.orders[0];

    if (!order) {
      throw new Error('Заказ не найден');
    }

    return order;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      })

      .addCase(getUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = [...action.payload].reverse();
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError =
          action.error.message || 'Ошибка загрузки истории заказов';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.orderDataLoading = true;
        state.orderDataError = null;
        state.orderData = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderDataLoading = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderDataLoading = false;
        state.orderDataError = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectFeedTotal = (state: RootState) => state.feed.total;

export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectFeedError = (state: RootState) => state.feed.error;

export const selectOrderData = (state: RootState) => state.feed.orderData;

export const selectOrderDataLoading = (state: RootState) =>
  state.feed.orderDataLoading;

export const selectOrderDataError = (state: RootState) =>
  state.feed.orderDataError;

export const selectUserOrders = (state: RootState) => state.feed.userOrders;

export const selectUserOrdersLoading = (state: RootState) =>
  state.feed.userOrdersLoading;

export const selectUserOrdersError = (state: RootState) =>
  state.feed.userOrdersError;

export const feedReducer = feedSlice.reducer;
