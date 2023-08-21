import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  styled,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../api/AuthorizedUser/requests';

import validatePassword from '../../helper/validatePassword';

import './FormSignIn.scss';

const ColorButton = styled(Button)(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
}));

export default function FormSignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<CustomerSignin>({ mode: 'onChange' });

  const onSubmit = (data: CustomerSignin) => {
    console.log(data);
    login(data);
    // TODO: тут надо дождаться ответа от сервера, если ошибка 400 вывести поп ап
    // "Incorrect e-mail or password"
    // Если все окей то сделать резет, и изменить название кнопки
    navigate('/');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            size="small"
            type="email"
            label="E-mail"
            fullWidth
            required
            autoComplete="email"
            {...register('email', {
              required: 'Enter your e-mail, required field',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Enter valid e-mail',
              },
            })}
            error={errors?.email !== undefined}
            helperText={errors?.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            label="Password"
            size="small"
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Enter your password, required field',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
              validate: validatePassword,
            })}
            error={errors?.password !== undefined}
            helperText={errors?.password?.message}
            {...register('password')}
            InputProps={{
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
            }}
          />
        )}
      />

      <ColorButton
        className="btn"
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isValid}
      >
        Log In Now
      </ColorButton>
    </form>
  );
}
