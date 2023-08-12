import { useForm } from 'react-hook-form';
import { Button, ButtonProps, TextField, styled } from '@mui/material';
import { yellow } from '@mui/material/colors';
import './FormSignIn.scss';

type FormValues = {
  eMail: string;
  password: string;
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[700]),
  backgroundColor: yellow[700],
  '&:hover': {
    backgroundColor: yellow[500],
  },
}));

export default function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        margin="dense"
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
        id="outlined-password-input"
        label="Password"
        type="password"
        margin="dense"
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
      <ColorButton type="submit" variant="contained" fullWidth>
        Log In Now
      </ColorButton>
    </form>
  );
}
