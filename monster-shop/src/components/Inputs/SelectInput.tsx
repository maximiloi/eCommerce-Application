import { TextField, MenuItem } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { FormValues } from '../../types/signupFormValues';
import { SelectOption } from '../../types/inputProps';

function SelectInput(
  props: {
    label: string;
    required: boolean;
    options: Array<SelectOption>;
  } & UseControllerProps<FormValues | CustomerSignin>
) {
  const { field, fieldState } = useController(props);
  const { label, required, options } = props;

  return (
    <TextField
      {...field}
      margin="dense"
      size="small"
      select
      fullWidth
      required={required}
      label={label}
      error={!!fieldState.error}
      helperText={fieldState.error?.message || ''}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SelectInput;
