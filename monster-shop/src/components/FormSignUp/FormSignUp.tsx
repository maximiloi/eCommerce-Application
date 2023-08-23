import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  ButtonProps,
  Checkbox,
  Switch,
  FormControlLabel,
  styled,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import dataFromat from '../../helper/registrationDataFormat';

import validatePassword from '../../helper/validatePassword';
import validateDateBirth from '../../helper/validateDateBirth';

import './FormSignUp.scss';
import { signup } from '../../api/AuthorizedUser/requests';
import FormValues from '../../types/signupFormValues';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#000',
  backgroundColor: '#f0c349',
  '&:hover': {
    backgroundColor: '#f0c349',
  },
}));

const countries = [
  { value: 'BY', label: 'Belarus' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'PL', label: 'Poland' },
  { value: 'RU', label: 'Russia' },
];

export default function FormSignUp() {
  const navigate = useNavigate();
  const [addressMatches, setAddressMatches] = React.useState(false);
  const handleAddressMatchesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const targetElement = event.target as HTMLInputElement;
    setAddressMatches(!!targetElement.value);
  };
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
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { dateOfBirth: undefined },
  });

  const onSubmit = async (data: FormValues) => {
    await signup(dataFromat(data)).then(
      (response: ClientResponse<CustomerSignInResult>) => {
        console.log('response: ', response);
        if (response.statusCode === 201) {
          navigate('/');
          reset();
        }
      }
    );
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
            size="small"
            fullWidth
            required
            label="E-mail"
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
            size="small"
            fullWidth
            required
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
            size="small"
            fullWidth
            required
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
            {...field}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue={undefined}
          rules={{
            required: 'Date of Birth is required',
            validate: validateDateBirth,
          }}
          render={({ field }) => (
            <DateField
              margin="dense"
              size="small"
              fullWidth
              required
              label="Date of Birth"
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors.dateOfBirth,
                  helperText: errors.dateOfBirth
                    ? errors.dateOfBirth.message
                    : '',
                },
              }}
              {...field}
            />
          )}
        />
      </LocalizationProvider>

      <details>
        <summary>Shipping Address</summary>
        <div>
          <Controller
            name="shippingStreet"
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
                margin="dense"
                size="small"
                fullWidth
                required
                label="Street"
                autoComplete="address-line1"
                {...field}
                error={!!errors.shippingStreet}
                helperText={
                  errors.shippingStreet ? errors.shippingStreet.message : ''
                }
              />
            )}
          />

          <Controller
            name="shippingCity"
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
                size="small"
                fullWidth
                required
                autoComplete="address-level2"
                {...field}
                error={!!errors.shippingCity}
                helperText={
                  errors.shippingCity ? errors.shippingCity.message : ''
                }
              />
            )}
          />

          <Controller
            name="shippingPostalCode"
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
                size="small"
                fullWidth
                required
                autoComplete="postal-code"
                {...field}
                error={!!errors.shippingPostalCode}
                helperText={
                  errors.shippingPostalCode
                    ? errors.shippingPostalCode.message
                    : ''
                }
              />
            )}
          />

          <Controller
            name="shippingCountry"
            control={control}
            defaultValue=""
            rules={{
              required: 'Country is required',
              pattern: {
                value: /^[A-Z]{2}$/,
                message: 'Enter valid Country',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Country"
                margin="dense"
                size="small"
                select
                fullWidth
                required
                {...field}
                error={!!errors.shippingCountry}
                helperText={
                  errors.shippingCountry ? errors.shippingCountry.message : ''
                }
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="shippingDefaultAddress"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox />}
                label="Make it a default address"
                {...field}
              />
            )}
          />

          <Controller
            name="addressMatches"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    onChange={(event) => {
                      const billing = document.querySelector(
                        '.billing'
                      ) as HTMLElement;
                      if (billing.style.display !== 'none') {
                        billing.style.display = 'none';
                        handleAddressMatchesChange(event);
                      } else {
                        billing.style.display = 'block';
                        handleAddressMatchesChange(event);
                      }
                    }}
                  />
                }
                label="Billing address matches the Shipping"
                {...field}
              />
            )}
          />
        </div>

        <details className="billing">
          <summary>Billing Address</summary>
          <div>
            <Controller
              name="billingStreet"
              control={control}
              defaultValue=""
              rules={{
                required: !addressMatches ? 'Street is required' : false,
                minLength: {
                  value: 1,
                  message: 'Street must contain at least one character',
                },
              }}
              render={({ field }) => (
                <TextField
                  required={!addressMatches}
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Street"
                  autoComplete="address-line1"
                  {...field}
                  error={!!errors.billingStreet}
                  helperText={
                    errors.billingStreet ? errors.billingStreet.message : ''
                  }
                />
              )}
            />

            <Controller
              name="billingCity"
              control={control}
              defaultValue=""
              rules={{
                required: !addressMatches ? 'City is required' : false,
                minLength: {
                  value: 1,
                  message: 'City must contain at least one character',
                },
              }}
              render={({ field }) => (
                <TextField
                  required={!addressMatches}
                  label="City"
                  margin="dense"
                  size="small"
                  fullWidth
                  autoComplete="address-level2"
                  {...field}
                  error={!!errors.billingCity}
                  helperText={
                    errors.billingCity ? errors.billingCity.message : ''
                  }
                />
              )}
            />

            <Controller
              name="billingPostalCode"
              control={control}
              defaultValue=""
              rules={{
                required: !addressMatches ? 'Postal code is required' : false,
                minLength: {
                  value: 1,
                  message: 'Postal code must contain at least one character',
                },
              }}
              render={({ field }) => (
                <TextField
                  required={!addressMatches}
                  label="Postal code"
                  margin="dense"
                  size="small"
                  fullWidth
                  autoComplete="postal-code"
                  {...field}
                  error={!!errors.billingPostalCode}
                  helperText={
                    errors.billingPostalCode
                      ? errors.billingPostalCode.message
                      : ''
                  }
                />
              )}
            />

            <Controller
              name="billingCountry"
              control={control}
              defaultValue=""
              rules={{
                required: !addressMatches ? 'Country is required' : false,
                pattern: {
                  value: /^[A-Z]{2}$/,
                  message: 'Enter valid Country',
                },
              }}
              render={({ field }) => (
                <TextField
                  required={!addressMatches}
                  label="Country"
                  margin="dense"
                  size="small"
                  select
                  fullWidth
                  {...field}
                  error={!!errors.billingCountry}
                  helperText={
                    errors.billingCountry ? errors.billingCountry.message : ''
                  }
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="billingDefaultAddress"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label="Make it a default address"
                  {...field}
                />
              )}
            />
          </div>
        </details>
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
