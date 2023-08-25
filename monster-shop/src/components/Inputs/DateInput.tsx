import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseControllerProps, useController } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { FormValues } from '../../types/signupFormValues';

function DateInput(
  props: {
    label: string;
    required: boolean;
  } & UseControllerProps<FormValues | CustomerSignin>
) {
  const { field, fieldState } = useController(props);
  const { label, required } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        {...field}
        margin="dense"
        size="small"
        format="DD/MM/YYYY"
        fullWidth
        required={required}
        label={label}
        slotProps={{
          textField: {
            error: !!fieldState.error,
            helperText: fieldState.error?.message || '',
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
