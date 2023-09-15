import { configureStore } from '@reduxjs/toolkit';
import cartCountSlice from './cartCountSlice';

export const store = configureStore({
  reducer: {
    cartCount: cartCountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
