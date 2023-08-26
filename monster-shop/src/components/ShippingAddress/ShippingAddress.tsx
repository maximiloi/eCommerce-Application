import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
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
  const addressArray = data?.addresses;
  const shippingIdArray: string[] | undefined = data?.shippingAddressIds;
  console.log('shippingIdArray: ', shippingIdArray);

  const shippingAddressArray = shippingIdArray?.map((id) => {
    const shippingAddressObj = addressArray?.find((obj) => obj.id === id);
    return shippingAddressObj ? { id, ...shippingAddressObj } : null;
  });
  console.log('shippingAddressArray: ', shippingAddressArray);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const spacing = isSmallScreen ? 0 : 2;

  const { control } = useForm<CustomerSignin>({
    mode: 'onChange',
  });

  return (
    <>
      {shippingAddressArray?.map(({ shippingAddress }) => (
        <Item key={shippingAddress?.id}>
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
                name="streetName"
                control={control}
                label="Street"
                defaultValue={shippingAddress?.streetName}
              />
              <TextFieldInput
                name="city"
                control={control}
                label="City"
                defaultValue={shippingAddress?.city}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldInput
                name="postalCode"
                control={control}
                label="Postal Code"
                defaultValue={shippingAddress?.postalCode}
              />
              <TextFieldInput
                name="country"
                control={control}
                label="Country"
                defaultValue={shippingAddress?.country}
              />
            </Grid>
          </Grid>
        </Item>
      ))}

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
