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

function ShippingAddress() {
  const { data: userData } = User;
  const addressArray = userData?.addresses;
  const shippingIdArray = userData?.shippingAddressIds;

  const [editMode, setEditMode] = useState(false);

  const shippingAddressArray = shippingIdArray?.map((id) => {
    const shippingAddressObj = addressArray?.find((obj) => obj.id === id);
    return shippingAddressObj ? { id, ...shippingAddressObj } : null;
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const spacing = isSmallScreen ? 0 : 2;

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<FormValues | CustomerSignin>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues | CustomerSignin) => {
    console.log(data);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {shippingAddressArray?.map((shippingAddress) => (
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
                name="shippingStreet"
                control={control}
                label="Street"
                defaultValue={shippingAddress?.streetName}
                // readOnly={!editMode}
              />
              <TextFieldInput
                name="shippingCity"
                control={control}
                label="City"
                defaultValue={shippingAddress?.city}
                // readOnly={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldInput
                name="shippingPostalCode"
                control={control}
                label="Postal Code"
                defaultValue={shippingAddress?.postalCode}
                // readOnly={!editMode}
              />
              <TextFieldInput
                name="shippingCountry"
                control={control}
                label="Country"
                defaultValue={shippingAddress?.country}
                // readOnly={!editMode}
              />
            </Grid>
          </Grid>
        </Item>
      ))}

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
