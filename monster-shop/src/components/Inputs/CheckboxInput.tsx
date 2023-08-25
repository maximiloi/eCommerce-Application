import { UseControllerProps, useController } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';
import { FormValues } from '../../types/signupFormValues';

function CheckboxInput(
  props: {
    label: string;
  } & UseControllerProps<FormValues>
) {
  const { field } = useController(props);
  const { label } = props;

  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
}

export default CheckboxInput;
