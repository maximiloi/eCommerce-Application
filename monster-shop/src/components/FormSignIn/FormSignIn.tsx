import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, styled } from '@mui/material';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import validatePassword from '../../helper/validatePassword';
import './FormSignIn.scss';
import { login } from '../../api/AuthorizedUser/requests';

const ColorButton = styled(Button)(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
}));

export default function FormSignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<CustomerSignin>({ mode: 'onBlur' });

  const onSubmit = (data: CustomerSignin) => {
    console.log(data);
    login(data);
    navigate('/');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="email"
            label="E-mail"
            fullWidth
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
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="password"
            label="Password"
            fullWidth
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
