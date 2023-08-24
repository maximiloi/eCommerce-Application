import { TextField, MenuItem } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from '../../types/signupFormValues';
import { SelectOption } from '../../types/inputProps';

function SelectInput(
  props: {
    label: string;
    options: Array<SelectOption>;
  } & UseControllerProps<FormValues>
) {
  const { field, fieldState } = useController(props);
  const { label, options } = props;

  return (
    <TextField
      {...field}
      margin="dense"
      size="small"
      select
      fullWidth
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
