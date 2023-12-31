import { useState } from 'react';
import {
  Grid,
  Paper,
  styled,
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import PropTypes from 'prop-types';
import TextFieldInput from '../Inputs/TextFieldInput';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import SelectInput from '../Inputs/SelectInput';
import { SignUpDefaultValues, countries } from '../../helper/variables';
import { FormValues } from '../../types/signupFormValues';
import User from '../../api/user';
import { addUserAdressType, getCustomer } from '../../api/requests/userProfile';

interface ModalAddressProps {
  onClose: () => void;
  addressTypeText: 'Shipping' | 'Billing';
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 370,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function ModalAddress({ onClose, addressTypeText }: ModalAddressProps) {
  const { handleSubmit, control } = useForm<FormValues | CustomerSignin>({
    mode: 'onChange',
    defaultValues: SignUpDefaultValues,
  });
  const addressTypeLow = addressTypeText.toLocaleLowerCase() as
    | 'shipping'
    | 'billing';
  const [open] = useState(true);

  const onSubmit = async (data: CustomerSignin | FormValues) => {
    if ('shippingStreet' in data)
      addUserAdressType(
        User.data?.version as number,
        {
          streetName: data[`${addressTypeLow}Street`] as string,
          country: data[`${addressTypeLow}Country`],
          city: data[`${addressTypeLow}City`],
          postalCode: data[`${addressTypeLow}PostalCode`],
        },
        addressTypeText
      );
    onClose();
    getCustomer();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Add New {addressTypeText} Address
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Item className="adress__item--new">
              <TextFieldInput
                name={`${addressTypeLow}Street`}
                control={control}
                label="Street"
                required
                rules={{
                  required: 'Street is required',
                  minLength: {
                    value: 1,
                    message: 'Street must contain at least one character',
                  },
                }}
                disabled={false}
              />
              <TextFieldInput
                name={`${addressTypeLow}City`}
                control={control}
                label="City"
                required
                rules={{
                  required: 'City is required',
                  minLength: {
                    value: 1,
                    message: 'City must contain at least one character',
                  },
                }}
                disabled={false}
              />
              <TextFieldInput
                name={`${addressTypeLow}PostalCode`}
                control={control}
                label="Postal code"
                required
                rules={{
                  required: 'Postal code is required',
                  minLength: {
                    value: 1,
                    message: 'Postal code must contain at least one character',
                  },
                }}
                disabled={false}
              />
              <SelectInput
                name={`${addressTypeLow}Country`}
                control={control}
                label="Country"
                required
                options={countries}
                rules={{
                  required: 'Country is required',
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: 'Enter valid Country',
                  },
                }}
                disabled={false}
              />
            </Item>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                mt: 2,
              }}
            >
              <ColoredBtn type="submit" size="small" variant="contained">
                Save New Address
              </ColoredBtn>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

ModalAddress.propTypes = {
  onClose: PropTypes.func.isRequired,
  addressTypeText: PropTypes.string.isRequired,
};

export default ModalAddress;
