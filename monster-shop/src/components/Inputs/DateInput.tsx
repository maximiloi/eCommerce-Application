import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from '../../types/signupFormValues';

function DateInput(
  props: {
    label: string;
  } & UseControllerProps<FormValues>
) {
  const { field, fieldState } = useController(props);
  const { label } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        {...field}
        margin="dense"
        size="small"
        format="DD/MM/YYYY"
        fullWidth
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
