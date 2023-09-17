import { configureStore } from '@reduxjs/toolkit';
import cartCountSlice from './cartCountSlice';
import promoCodeSlice from './promoCodeSlice';

export const store = configureStore({
  reducer: {
    cartCount: cartCountSlice,
    discount: promoCodeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
