import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, ButtonProps, styled } from '@mui/material';
import validatePassword from '../../helper/validatePassword';

import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  password: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  TextField: string;
};

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
}));

export default function FormSignUp() {
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
        name="TextField"
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
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="First Name"
            fullWidth
            autoComplete="given-name"
            {...register('firstName', {
              required: 'Enter your First Name, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
                message: 'Enter valid First Name',
              },
            })}
            error={errors?.firstName !== undefined}
            helperText={errors?.firstName?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="Last Name"
            fullWidth
            autoComplete="family-name"
            {...register('lastName', {
              required: 'Enter your Last Name, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
                message: 'Enter valid Last Name',
              },
            })}
            error={errors?.firstName !== undefined}
            helperText={errors?.firstName?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="Street"
            fullWidth
            autoComplete="address-line1"
            {...register('street', {
              required: 'Enter your Street, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
                message: 'Enter valid Street',
              },
            })}
            error={errors?.street !== undefined}
            helperText={errors?.street?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="City"
            fullWidth
            autoComplete="address-level2"
            {...register('city', {
              required: 'Enter your City, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[a-zA-Z]+$/u,
                message: 'Enter valid City',
              },
            })}
            error={errors?.city !== undefined}
            helperText={errors?.city?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="Postal code"
            fullWidth
            autoComplete="postal-code"
            {...register('postalCode', {
              required: 'Enter your Postal code, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[0-9]+$/u,
                message: 'Enter valid Postal code',
              },
            })}
            error={errors?.postalCode !== undefined}
            helperText={errors?.postalCode?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="dense"
            type="text"
            label="Country"
            fullWidth
            autoComplete="country-name"
            {...register('country', {
              required: 'Enter your Country, required field',
              minLength: { value: 1, message: 'Minimum 1 symbols' },
              pattern: {
                value: /^[a-zA-Z]+$/u,
                message: 'Enter valid Country',
              },
            })}
            error={errors?.country !== undefined}
            helperText={errors?.country?.message}
          />
        )}
        name="TextField"
        control={control}
      />

      <ColorButton
        className="btn"
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isValid}
      >
        Sign Up
      </ColorButton>
    </form>
  );
}
