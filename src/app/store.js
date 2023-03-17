import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptoApi } from '../services/cryptoApi';
import { exchangesApi } from '../services/exchangesApi';
import { newsApi } from '../services/newsApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [exchangesApi.reducerPath]: exchangesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, exchangesApi.middleware, newsApi.middleware),
});

setupListeners(store.dispatch);
