import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, ButtonProps, styled } from '@mui/material';

import validatePassword from '../../helper/validatePassword';

import './FormSignUp.scss';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
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
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Email is required',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter valid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          validate: validatePassword,
        }}
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...field}
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{
          required: 'First name is required',
          pattern: {
            value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
            message: 'Invalid first name',
          },
        }}
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
            {...field}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{
          required: 'Last name is required',
          pattern: {
            value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
            message: 'Invalid last name',
          },
        }}
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
            {...field}
          />
        )}
      />

      <details>
        <summary>Address field</summary>
        <div>
          <Controller
            name="street"
            control={control}
            defaultValue=""
            rules={{
              required: 'Street is required',
              minLength: {
                value: 1,
                message: 'Street must contain at least one character',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Street"
                margin="dense"
                fullWidth
                autoComplete="address-line1"
                {...field}
                error={!!errors.street}
                helperText={errors.street ? errors.street.message : ''}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{
              required: 'City is required',
              minLength: {
                value: 1,
                message: 'City must contain at least one character',
              },
            }}
            render={({ field }) => (
              <TextField
                label="City"
                margin="dense"
                fullWidth
                autoComplete="address-level2"
                {...field}
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : ''}
              />
            )}
          />

          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            rules={{
              required: 'Postal code is required',
              minLength: {
                value: 1,
                message: 'Postal code must contain at least one character',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Postal code"
                margin="dense"
                fullWidth
                autoComplete="postal-code"
                {...field}
                error={!!errors.postalCode}
                helperText={errors.postalCode ? errors.postalCode.message : ''}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{
              required: 'Country is required',
              minLength: {
                value: 1,
                message: 'Country must contain at least one character',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇщЩЬьЫыъЪэЭ-]+$/u,
                message: 'Enter valid Country',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Country"
                margin="dense"
                fullWidth
                autoComplete="country-name"
                {...field}
                error={!!errors.country}
                helperText={errors.country ? errors.country.message : ''}
              />
            )}
          />
        </div>
      </details>

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
