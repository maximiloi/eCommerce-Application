import { useState } from 'react';
import { Grid, IconButton, Button, Paper, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import User from '../../api/user';
import TextFieldInput from '../Inputs/TextFieldInput';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { FormValues } from '../../types/signupFormValues';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

interface ShippingAddressType {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

function convertToDefaultValues(
  shippingAddresses: ShippingAddressType[]
): Record<string, string> {
  return shippingAddresses.reduce((defaultValues, address) => {
    return {
      ...defaultValues,
      [`shippingStreet_${address.id}`]: address.streetName,
      [`shippingCity_${address.id}`]: address.city,
      [`shippingPostalCode_${address.id}`]: address.postalCode,
      [`shippingCountry_${address.id}`]: address.country,
    };
  }, {});
}

function ShippingAddress() {
  const [editMode, setEditMode] = useState(false);

  const userData = User.data;
  const addressArray = userData?.addresses; // all address
  const shippingIdArray = userData?.shippingAddressIds; // arr ids shipping address

  const shippingAddressArray = shippingIdArray
    ? addressArray
        ?.filter((obj) => obj.id && shippingIdArray.includes(obj.id))
        .map(
          (obj): ShippingAddressType => ({
            id: obj.id!,
            streetName: obj.streetName!,
            city: obj.city!,
            postalCode: obj.postalCode!,
            country: obj.country!,
          })
        )
    : [];
  const defaultValues = convertToDefaultValues(shippingAddressArray || []);

  // console.log('shippingAddressArray: ', shippingAddressArray);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const spacing = isSmallScreen ? 0 : 2;

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<FormValues | CustomerSignin>({
    mode: 'onChange',
    defaultValues: { shipping: defaultValues },
  });

  const onSubmit = async (data: FormValues | CustomerSignin) => {
    console.log(data);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {shippingAddressArray?.map((shippingAddress) => {
        if (!shippingAddress) {
          return null;
        }

        return (
          <Item key={shippingAddress.id}>
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
                  name={`shipping.shippingStreet_${shippingAddress.id}`}
                  control={control}
                  label="Street"
                  required={false}
                />
                <TextFieldInput
                  name={`shipping.shippingCity_${shippingAddress.id}`}
                  control={control}
                  label="City"
                  required={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldInput
                  name={`shipping.shippingPostalCode_${shippingAddress.id}`}
                  control={control}
                  label="Postal Code"
                  required={false}
                />
                <TextFieldInput
                  name={`shipping.shippingCountry_${shippingAddress.id}`}
                  control={control}
                  label="Country"
                  required={false}
                />
              </Grid>
            </Grid>
          </Item>
        );
      })}

      <Grid container spacing={spacing}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Button variant="text" startIcon={<AddCircleIcon />}>
            Add Shipping Address
          </Button>

          <Button
            type="button"
            variant="outlined"
            size="small"
            color="warning"
            disabled={editMode}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>

          <ColoredBtn type="submit" variant="contained" disabled={!isValid}>
            Save Changes
          </ColoredBtn>
        </Grid>
      </Grid>
    </form>
  );
}

export default ShippingAddress;
