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

interface AddressProps {
  addressType: 'billing' | 'shipping';
}

interface AddressValueType {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

function convertToDefaultValues(
  typeAddressArray: AddressValueType[]
): Record<string, string> {
  console.log('typeAddressArray: ', typeAddressArray);
  return typeAddressArray.reduce((defaultValues, address) => {
    return {
      ...defaultValues,
      [`addressStreet_${address.id}`]: address.streetName,
      [`addressCity_${address.id}`]: address.city,
      [`addressPostalCode_${address.id}`]: address.postalCode,
      [`addressCountry_${address.id}`]: address.country,
    };
  }, {});
}

function ProfileAddress({ addressType }: AddressProps) {
  const [editMode, setEditMode] = useState(false);

  const userData = User.data;
  const addressArray = userData?.addresses; // all address
  const AddressIdArray =
    addressType === 'shipping'
      ? userData?.shippingAddressIds
      : userData?.billingAddressIds; // arr ids address

  const typeAddressArray = AddressIdArray
    ? addressArray
        ?.filter((obj) => obj.id && AddressIdArray.includes(obj.id))
        .map(
          (obj): AddressValueType => ({
            id: obj.id!,
            streetName: obj.streetName!,
            city: obj.city!,
            postalCode: obj.postalCode!,
            country: obj.country!,
          })
        )
    : [];
  const defaultValues = convertToDefaultValues(typeAddressArray || []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const spacing = isSmallScreen ? 0 : 2;

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<FormValues | CustomerSignin>({
    mode: 'onChange',
    defaultValues: { address: defaultValues },
  });

  const onSubmit = async (data: FormValues | CustomerSignin) => {
    console.log(data);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {typeAddressArray?.map((address) => {
        if (!address) {
          return null;
        }

        return (
          <Item key={address.id}>
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
                  name={`address.addressStreet_${address.id}`}
                  control={control}
                  label="Street"
                  required={false}
                  disabled={!editMode}
                />
                <TextFieldInput
                  name={`address.addressCity_${address.id}`}
                  control={control}
                  label="City"
                  required={false}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldInput
                  name={`address.addressPostalCode_${address.id}`}
                  control={control}
                  label="Postal Code"
                  required={false}
                  disabled={!editMode}
                />
                <TextFieldInput
                  name={`address.addressCountry_${address.id}`}
                  control={control}
                  label="Country"
                  required={false}
                  disabled={!editMode}
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
            Add {addressType === 'shipping' ? 'shipping' : 'billing'} Address
          </Button>

          <Button
            type="button"
            variant="outlined"
            size="small"
            color="warning"
            disabled={editMode}
            onClick={() => setEditMode(true)}
          >
            Edit Addresses
          </Button>

          <ColoredBtn type="submit" variant="contained" disabled={!isValid}>
            Save Changes
          </ColoredBtn>
        </Grid>
      </Grid>
    </form>
  );
}

export default ProfileAddress;