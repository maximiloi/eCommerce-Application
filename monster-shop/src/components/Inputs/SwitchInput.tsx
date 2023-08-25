import { UseControllerProps, useController } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { FormValues } from '../../types/signupFormValues';

function SwitchInput(
  props: {
    label: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  } & UseControllerProps<FormValues>
) {
  const { field } = useController(props);
  const { label, handleChange } = props;

  return (
    <FormControlLabel
      {...field}
      control={<Switch onChange={(event) => handleChange(event)} />}
      label={label}
    />
  );
}

export default SwitchInput;
