import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { Grid, Paper, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import TextFieldInput from '../Inputs/TextFieldInput';
// import ColoredBtn from '../ColoredBtn/ColoredBtn';
import User from '../../api/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ShippingAddress() {
  const { data } = User;
  console.log('data: ', data);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const spacing = isSmallScreen ? 0 : 2;

  const { control } = useForm<CustomerSignin>({
    mode: 'onChange',
  });

  return (
    <Item>
      <Grid container spacing={spacing}>
        <Grid item xs={12} md={6}>
          <TextFieldInput
            name="firstName"
            control={control}
            label="First Name"
            defaultValue={data?.firstName}
          />
          <TextFieldInput
            name="lastName"
            control={control}
            label="Last Name"
            defaultValue={data?.lastName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldInput
            name="firstName"
            control={control}
            label="First Name"
            defaultValue={data?.firstName}
          />
          <TextFieldInput
            name="lastName"
            control={control}
            label="Last Name"
            defaultValue={data?.lastName}
          />
        </Grid>
      </Grid>
    </Item>
  );
}

export default ShippingAddress;
