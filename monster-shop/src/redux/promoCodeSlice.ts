import { LineItem } from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DiscountState {
  promoCodeId: string;
  discountAmount: number;
  isPromo: boolean;
}

const initialState: DiscountState = {
  promoCodeId: '',
  discountAmount: 0,
  isPromo: false,
};

export const promoCodeSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    setPromoCodeId: (state, action: PayloadAction<string>) => {
      state.promoCodeId = action.payload;
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
    setIsPromo: (state, action: PayloadAction<boolean>) => {
      state.isPromo = action.payload;
    },
  },
});

export const { setPromoCodeId, getDiscountedAmount, setIsPromo } =
  promoCodeSlice.actions;

export default promoCodeSlice.reducer;
