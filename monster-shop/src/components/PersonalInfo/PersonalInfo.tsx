import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { Grid, Paper, styled } from '@mui/material';
import dayjs from 'dayjs';
import TextFieldInput from '../Inputs/TextFieldInput';
// import ColoredBtn from '../ColoredBtn/ColoredBtn';
import User from '../../api/user';
import validatePassword from '../../helper/validatePassword';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PersonalInfo() {
  const { data } = User;

  const { control } = useForm<CustomerSignin>({
    defaultValues: {
      email: data?.email,
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Item>
          <TextFieldInput
            name="firstName"
            control={control}
            label="First Name"
            defaultValue={data?.firstName}
            required={false}
            disabled={false}
          />
          <TextFieldInput
            name="lastName"
            control={control}
            label="Last Name"
            defaultValue={data?.lastName}
            required={false}
            disabled={false}
          />
          <TextFieldInput
            name="dateOfBirth"
            control={control}
            label="Date of birth"
            defaultValue={dayjs(data?.dateOfBirth).format('DD/MM/YYYY')}
            required={false}
            disabled={false}
          />
        </Item>
      </Grid>
      <Grid item xs={12} md={4}>
        <Item>
          <TextFieldInput
            name="email"
            control={control}
            label="E-mail"
            required={false}
            disabled={false}
          />
          <TextFieldInput
            name="password"
            control={control}
            label="Password"
            required={false}
            disabled={false}
            rules={{
              required: 'Enter your password, required field',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
              validate: validatePassword,
            }}
          />
        </Item>
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
