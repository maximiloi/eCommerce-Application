import { LineItem } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  quantity: number;
  cartItems: LineItem[];
}

const initialState: CountState = {
  quantity: 0,
  cartItems: [],
};

export const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    getCartItems: (state, action: PayloadAction<LineItem[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setTotalQuantity, getCartItems } = cartCountSlice.actions;

export default cartCountSlice.reducer;
