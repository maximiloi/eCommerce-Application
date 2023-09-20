import { useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Cart } from '@commercetools/platform-sdk';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { PromoInputType } from '../../types/inputProps';
import { cartPromoApply, cartPromoRemove } from '../../api/requests/cart';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  setPromoCode,
  setPromoCodeId,
  getDiscountedAmount,
  setIsPromo,
} from '../../redux/promoCodeSlice';

function PromoCodeBar() {
  const promoCode = useAppSelector((state) => state.discount.promoCode);
  const promoCodeId = useAppSelector((state) => state.discount.promoCodeId);
  const isPromo = useAppSelector((state) => state.discount.isPromo);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<PromoInputType>({
    defaultValues: {
      promoCode: '',
    },
    mode: 'onSubmit',
  });
  const handleAddPromoCode = useCallback(
    async (code: string) => {
      try {
        const responce = (await cartPromoApply(code)) as Cart;
        if (responce) dispatch(getDiscountedAmount(responce.lineItems));
        dispatch(setPromoCodeId(responce.discountCodes[0].discountCode.id));
        dispatch(setPromoCode(code));
        dispatch(setIsPromo(true));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );
  const handleRemovePromoCode = useCallback(
    async (codeId: string) => {
      try {
        (await cartPromoRemove(codeId)) as Cart;
        dispatch(setPromoCodeId(''));
        dispatch(setPromoCode(null));
        dispatch(setIsPromo(false));
        dispatch(getDiscountedAmount([]));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const onSubmit: SubmitHandler<PromoInputType> = (data) => {
    if (data.promoCode) {
      handleAddPromoCode(data.promoCode);
    } else if (promoCodeId) {
      handleRemovePromoCode(promoCodeId);
    }
    reset();
  };
  return (
    <form className="promo-input" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="promoCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            placeholder={promoCode || 'Promo Code'}
            size="small"
            color="warning"
            sx={{ width: [0.8, 0.6, 0.5] }}
            disabled={isPromo}
            InputProps={{
              endAdornment: !isPromo && (
                <InputAdornment
                  position="end"
                  style={{
                    display: isDirty ? 'flex' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    reset();
                  }}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <ColoredBtn
        className={isPromo ? '' : 'btn'}
        type="submit"
        variant="contained"
      >
        {isPromo ? 'Remove' : 'Apply'}
      </ColoredBtn>
    </form>
  );
}

export default PromoCodeBar;
