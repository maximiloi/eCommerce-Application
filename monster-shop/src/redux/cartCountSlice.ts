import { LineItem } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  quantity: number;
  cartItems: LineItem[];
  discountAmount: number;
}

const initialState: CountState = {
  quantity: 0,
  cartItems: [],
  discountAmount: 0,
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
    getDiscountedAmount: (state, action: PayloadAction<LineItem[]>) => {
      if (action.payload.length) {
        const discontValue: Array<number> = [];
        action.payload.forEach((item) => {
          if (item.discountedPricePerQuantity.length) {
            discontValue.push(
              (item.discountedPricePerQuantity[0].discountedPrice
                .includedDiscounts[0].discountedAmount.centAmount /
                10 ** 2) *
                item.discountedPricePerQuantity[0].quantity
            );
          }
        });
        state.discountAmount = discontValue.length
          ? discontValue.reduce((acc, cur) => acc + cur)
          : 0;
      } else {
        state.discountAmount = 0;
      }
    },
  },
});

export const { setTotalQuantity, getCartItems, getDiscountedAmount } =
  cartCountSlice.actions;

export default cartCountSlice.reducer;
