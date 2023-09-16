import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useCallback, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { PromoCodeProps, PromoInputType } from '../../types/inputProps';
import { cartPromoApply, cartPromoRemove } from '../../api/requests/cart';

function PromoCodeBar({ setDiscountAmount }: PromoCodeProps) {
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoCodeId, setPromoCodeId] = useState<string>('');
  const [isPromo, setIsPromo] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<PromoInputType>({
    defaultValues: {
      promoCode,
    },
    mode: 'onSubmit',
  });
  const handleAddPromoCode = useCallback(
    async (code: string) => {
      try {
        const responce = (await cartPromoApply(code)) as Cart;
        const discontValue: Array<number> = [];
        responce.lineItems.forEach((item) => {
          discontValue.push(
            (item.discountedPricePerQuantity[0].discountedPrice
              .includedDiscounts[0].discountedAmount.centAmount /
              10 ** 2) *
              item.discountedPricePerQuantity[0].quantity
          );
        });
        const amount = discontValue.reduce((acc, cur) => acc + cur);
        setPromoCode(code);
        setIsPromo(true);
        setPromoCodeId(responce.discountCodes[0].discountCode.id);
        setDiscountAmount(amount);
      } catch (error) {
        console.error(error);
      }
    },
    [setDiscountAmount]
  );
  const handleRemovePromoCode = useCallback(
    async (codeId: string) => {
      try {
        (await cartPromoRemove(codeId)) as Cart;
        setIsPromo(false);
        setPromoCode('');
        setPromoCodeId('');
        setDiscountAmount(0);
      } catch (error) {
        console.error(error);
      }
    },
    [setDiscountAmount]
  );

  const onSubmit: SubmitHandler<PromoInputType> = (data) => {
    if (data.promoCode) {
      handleAddPromoCode(data.promoCode);
      reset();
    } else if (promoCodeId) {
      handleRemovePromoCode(promoCodeId);
      reset();
    }
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
            placeholder="Promo Code"
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
