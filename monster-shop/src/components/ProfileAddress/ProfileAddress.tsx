import { useState } from 'react';
import { Grid, IconButton, Button, Paper, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useForm } from 'react-hook-form';
import {
  Customer,
  CustomerSignin,
  BaseAddress,
} from '@commercetools/platform-sdk';
import User from '../../api/user';
import TextFieldInput from '../Inputs/TextFieldInput';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import { FormValues } from '../../types/signupFormValues';
import SelectInput from '../Inputs/SelectInput';
import { countries } from '../../helper/variables';
import {
  getCustomer,
  removeUserAdressType,
  updateUserAdress,
} from '../../api/requests/userProfile';
import ModalAddress from '../ModalAddress/ModalAddress';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = User.data as Customer;
  const userVersion = userData.version;
  const addressArray = userData.addresses; // all address
  const AddressIdArray =
    addressType === 'shipping'
      ? userData.shippingAddressIds
      : userData.billingAddressIds; // arr ids address

  const typeAddressArray = AddressIdArray
    ? addressArray
        .filter((obj) => obj.id && AddressIdArray.includes(obj.id))
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

  const { handleSubmit, control } = useForm<FormValues | CustomerSignin>({
    mode: 'onChange',
    defaultValues: { address: defaultValues },
  });
  const addressTypeText = addressType === 'shipping' ? 'Shipping' : 'Billing';

  const handleClickDeleteAddress = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = (event.target as HTMLElement).closest('.adress__item');
    if (!target) return;
    removeUserAdressType(userVersion, target.id, addressTypeText);
    (target as HTMLDivElement).remove();
    getCustomer();
  };

  const handleClickAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: FormValues | CustomerSignin) => {
    if ('address' in data) {
      const dataList = data.address!;
      const addresses: BaseAddress[] = [];
      AddressIdArray?.forEach((id) => {
        addresses.push({
          country: dataList[`addressCountry_${id}`],
          city: dataList[`addressCity_${id}`],
          postalCode: dataList[`addressPostalCode_${id}`],
          streetName: dataList[`addressStreet_${id}`],
          id,
        });
      });
      updateUserAdress(userVersion, addresses);
    }
    setEditMode(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {typeAddressArray.map((address) => {
          if (!address) {
            return null;
          }

          return (
            <Item key={address.id} id={address.id} className="adress__item">
              <Grid container spacing={spacing}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <IconButton
                    aria-label="delete"
                    disabled={!editMode}
                    onClick={handleClickDeleteAddress}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldInput
                    name={`address.addressStreet_${address.id}`}
                    control={control}
                    label="Street"
                    required
                    disabled={!editMode}
                    rules={{
                      required: 'Street is required',
                      minLength: {
                        value: 1,
                        message: 'Street must contain at least one character',
                      },
                    }}
                  />
                  <TextFieldInput
                    name={`address.addressCity_${address.id}`}
                    control={control}
                    label="City"
                    required
                    disabled={!editMode}
                    rules={{
                      required: 'City is required',
                      minLength: {
                        value: 1,
                        message: 'City must contain at least one character',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldInput
                    name={`address.addressPostalCode_${address.id}`}
                    control={control}
                    label="Postal code"
                    required
                    disabled={!editMode}
                    rules={{
                      required: 'Postal code is required',
                      minLength: {
                        value: 1,
                        message:
                          'Postal code must contain at least one character',
                      },
                    }}
                  />
                  <SelectInput
                    name={`address.addressCountry_${address.id}`}
                    control={control}
                    label="Country"
                    required
                    disabled={!editMode}
                    options={countries}
                    rules={{
                      required: 'Country is required',
                      pattern: {
                        value: /^[A-Z]{2}$/,
                        message: 'Enter valid Country',
                      },
                    }}
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
            <Button
              variant="text"
              startIcon={<AddCircleIcon />}
              onClick={handleClickAddAddress}
            >
              Add {addressTypeText} Address
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
          >
            <Button
              type="button"
              variant="outlined"
              size="small"
              color="warning"
              sx={{ mr: 1 }}
              disabled={editMode}
              onClick={() => setEditMode(true)}
            >
              Edit Addresses
            </Button>

            <ColoredBtn
              type="submit"
              size="small"
              variant="contained"
              disabled={!editMode}
            >
              Save Changes
            </ColoredBtn>
          </Grid>
        </Grid>
      </form>
      {isModalOpen && (
        <ModalAddress
          onClose={handleCloseModal}
          addressTypeText={addressTypeText}
        />
      )}
    </>
  );
}

export default ProfileAddress;
