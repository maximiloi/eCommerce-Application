import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, ButtonProps, styled } from '@mui/material';
import validatePassword from '../../helper/validatePassword';

import './FormSignIn.scss';

type FormValues = {
  eMail: string;
  password: string;
};

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
}));

export default function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="email"
            label="E-mail"
            fullWidth
            autoComplete="email"
            {...register('eMail', {
              required: 'Enter your e-mail, required field',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Enter valid e-mail',
              },
            })}
            error={errors?.eMail !== undefined}
            helperText={errors?.eMail?.message}
          />
        )}
        name="eMail"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="password"
            label="Password"
            fullWidth
            {...register('password', {
              required: 'Enter your password',
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
        name="password"
        control={control}
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
