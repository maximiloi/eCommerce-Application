import { useForm } from 'react-hook-form';
import { Button, ButtonProps, TextField, styled } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  date: string;
  password: string;
  confirmPassword: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[700]),
  backgroundColor: yellow[700],
  '&:hover': {
    backgroundColor: yellow[500],
  },
}));

const limit = dayjs().subtract(13, 'year');

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <TextField
        label="Email"
        type="email"
        margin="dense"
        size="small"
        fullWidth
        {...register('eMail', {
          required: 'Enter your e-mail',
          minLength: { value: 8, message: 'Minimum 8 symbols' },
          maxLength: { value: 30, message: 'Maximum 30 symbols' },
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter valid e-mail',
          },
        })}
        error={errors?.eMail !== undefined}
        helperText={errors?.eMail?.message}
        autoComplete="current-email"
      />
      <TextField
        label="First Name"
        type="text"
        margin="dense"
        size="small"
        fullWidth
        {...register('firstName', {
          required: 'Enter your "First Name", required field',
          minLength: { value: 3, message: 'Minimum 3 symbols' },
          maxLength: { value: 20, message: 'Maximum 20 symbols' },
          pattern: {
            value: /^[^\n ]*$/,
            message: 'Enter valid First Name',
          },
        })}
        error={errors?.firstName !== undefined}
        helperText={errors?.firstName?.message}
        autoComplete="current-firstName"
      />
      <TextField
        label="Last Name"
        type="text"
        margin="dense"
        size="small"
        fullWidth
        {...register('lastName', {
          required: 'Enter your "Last Name", required field',
          minLength: { value: 3, message: 'Minimum 3 symbols' },
          maxLength: { value: 20, message: 'Maximum 20 symbols' },
          pattern: {
            value: /^[^\n ]*$/,
            message: 'Enter valid Last Name',
          },
        })}
        error={errors?.lastName !== undefined}
        helperText={errors?.lastName?.message}
        autoComplete="current-lastName"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          views={['year', 'month', 'day']}
          maxDate={limit}
          disableFuture
          {...register('date', { required: 'Enter date of birth' })}
        />
      </LocalizationProvider>
      <TextField
        label="Password"
        type="password"
        margin="dense"
        size="small"
        fullWidth
        {...register('password', {
          required: 'Enter your password',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password must have maximum 20 characters',
          },
          pattern: {
            value: /^(?=.*[a-z,A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/,
            message: 'At least one letter, one digit, one special character',
          },
        })}
        error={errors?.password !== undefined}
        helperText={errors?.password?.message}
        autoComplete="current-password"
      />
      <TextField
        label="Confirm Password"
        type="password"
        margin="dense"
        size="small"
        fullWidth
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
        })}
        error={errors?.confirmPassword !== undefined}
        helperText={
          watch('confirmPassword') !== watch('password') &&
          getValues('confirmPassword') ? (
            <span>Passwords do not match</span>
          ) : null
        }
      />
      <TextField
        label="Street"
        type="text"
        margin="dense"
        size="small"
        fullWidth
        {...register('street', {
          required: 'Enter your street',
          minLength: { value: 3, message: 'Minimum 3 symbols' },
          maxLength: { value: 20, message: 'Maximum 20 symbols' },
        })}
        error={errors?.street !== undefined}
        helperText={errors?.street?.message}
        autoComplete="current-street"
      />
      <TextField
        label="City"
        type="text"
        margin="dense"
        size="small"
        fullWidth
        {...register('city', {
          required: 'Enter your city',
          minLength: { value: 3, message: 'Minimum 3 symbols' },
          maxLength: { value: 20, message: 'Maximum 20 symbols' },
          pattern: {
            value: /[a-zA-Zа-яА-Я]$/i,
            message: 'The City should only contain letters',
          },
        })}
        error={errors?.city !== undefined}
        helperText={errors?.city?.message}
        autoComplete="current-city"
      />
      <TextField
        label="Country"
        type="text"
        margin="dense"
        size="small"
        fullWidth
        {...register('country', {
          required: 'Enter your country',
          minLength: { value: 3, message: 'Minimum 3 symbols' },
          maxLength: { value: 20, message: 'Maximum 20 symbols' },
          pattern: {
            value: /[a-zA-Zа-яА-Я]$/i,
            message: 'The Country should only contain letters',
          },
        })}
        error={errors?.country !== undefined}
        helperText={errors?.country?.message}
        autoComplete="current-country"
      />

      <ColorButton type="submit" variant="contained" fullWidth>
        Register
      </ColorButton>
    </form>
  );
}
