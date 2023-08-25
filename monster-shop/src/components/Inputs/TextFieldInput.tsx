import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputPropsType } from '../../types/inputProps';

function TextFieldInput({
  label,
  name,
  register,
  required,
  rules,
  error,
}: InputPropsType) {
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
      margin="dense"
      size="small"
      type={handleInputType()}
      fullWidth
      required={required}
      label={label}
      {...register(name, rules)}
      error={!!error}
      helperText={error || ''}
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
