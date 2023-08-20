import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  ButtonProps,
  Checkbox,
  Switch,
  FormControlLabel,
  styled,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// import { MyCustomerDraft } from '@commercetools/platform-sdk';

import validatePassword from '../../helper/validatePassword';
import validateDateBirth from '../../helper/validateDateBirth';

import './FormSignUp.scss';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string | null;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingDefaultAddress: boolean;
  addressMatches: boolean;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingDefaultAddress: boolean;
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
    // reset,
    control,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { dateOfBirth: null },
  });

  const onSubmit = (data: FormValues) => {
    console.log('birthDate: ', dayjs(data.dateOfBirth).format('DD/MM/YYYY'));
    console.log(data);

    // reset();
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
            size="small"
            fullWidth
            required
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
          defaultValue={null}
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
                size="small"
                fullWidth
                required
                autoComplete="country-name"
                {...field}
                error={!!errors.shippingCountry}
                helperText={
                  errors.shippingCountry ? errors.shippingCountry.message : ''
                }
              />
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
                control={<Switch />}
                label="Billing address matches the Shipping"
                {...field}
              />
            )}
          />
        </div>

        <details>
          <summary>Billing Address</summary>
          <div>
            <Controller
              name="billingStreet"
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
                  size="small"
                  fullWidth
                  required
                  autoComplete="country-name"
                  {...field}
                  error={!!errors.billingCountry}
                  helperText={
                    errors.billingCountry ? errors.billingCountry.message : ''
                  }
                />
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
