import { useForm } from 'react-hook-form';
import { Address, CustomerSignin } from '@commercetools/platform-sdk';
import { Grid, IconButton, Button, Paper, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import TextFieldInput from '../Inputs/TextFieldInput';
// import ColoredBtn from '../ColoredBtn/ColoredBtn';
import User from '../../api/user';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function ShippingAddress() {
  const { data } = User;
  const addressArray: Address[] | undefined = data?.addresses;
  const shippingIdArray: string[] | undefined = data?.shippingAddressIds;

  const shippingAddressArray = shippingIdArray?.map((id) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const shippingAddressArray = addressArray?.find((obj) => obj.id === id);
    return shippingAddressArray ? { id, ...shippingAddressArray } : null;
  });

  console.log('shippingAddressArray: ', shippingAddressArray);

  // const { id, city, country, postalCode, streetName } = shippingAddressArray;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const spacing = isSmallScreen ? 0 : 2;

  const { control } = useForm<CustomerSignin>({
    mode: 'onChange',
  });

  return (
    <>
      <Item>
        <Grid container spacing={spacing}>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
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
      <Grid container spacing={spacing}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
            sx={{ marginTop: '10px' }}
          >
            Add Shipping Address
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ShippingAddress;
