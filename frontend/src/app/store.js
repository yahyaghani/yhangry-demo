// app/store.js (Redux Store Configuration)
import { configureStore } from '@reduxjs/toolkit';
import menusReducer from '../features/menusSlice';

export const store = configureStore({
  reducer: {
    menus: menusReducer,
  },
});
