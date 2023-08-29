import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseControllerProps, useController } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { FormValues } from '../../types/signupFormValues';

function TextFieldInput(
  props: { label: string; required: boolean } & UseControllerProps<
    FormValues | CustomerSignin
  >
) {
  const { field, fieldState } = useController(props);
  const { name, label, required } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleInputType = () => {
    let type = 'text';
    if (name === 'password') {
      type = showPassword ? 'text' : 'password';
    }
    return type;
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...field}
      margin="dense"
      size="small"
      type={handleInputType()}
      fullWidth
      label={label}
      error={!!fieldState.error}
      helperText={fieldState.error?.message || ''}
      InputProps={
        name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}

export default TextFieldInput;
