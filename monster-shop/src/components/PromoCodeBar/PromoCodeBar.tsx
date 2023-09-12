import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { PromoCodeProps, PromoInputType } from '../../types/inputProps';

function PromoCodeBar({ setPromoCode }: PromoCodeProps) {
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

  const onSubmit: SubmitHandler<PromoInputType> = (data) => {
    if (data.promoCode) {
      setPromoCode(data.promoCode);
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
            InputProps={{
              endAdornment: (
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
      <ColoredBtn className="btn" type="submit" variant="contained">
        Apply
      </ColoredBtn>
    </form>
  );
}

export default PromoCodeBar;
