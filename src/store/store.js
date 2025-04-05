import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { StaffApi } from '../leads';

export const store = configureStore({
  reducer: {
    [StaffApi.reducerPath]: StaffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StaffApi.middleware),
});

setupListeners(store.dispatch);