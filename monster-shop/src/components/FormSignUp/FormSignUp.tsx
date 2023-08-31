import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import dataFormat from '../../helper/registrationDataFormat';
import validatePassword from '../../helper/validatePassword';
import validateDateBirth from '../../helper/validateDateBirth';
import { signup } from '../../api/requests';
import { FormValues, KeySignUp } from '../../types/signupFormValues';
import {
  SignUpDefaultValues,
  countries,
  addressShip,
  addressBill,
} from '../../helper/variables';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import TextFieldInput from '../Inputs/TextFieldInput';
import DateInput from '../Inputs/DateInput';
import SelectInput from '../Inputs/SelectInput';
import CheckboxInput from '../Inputs/CheckboxInput';
import SwitchInput from '../Inputs/SwitchInput';
import './FormSignUp.scss';

export default function FormSignUp() {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    control,
    setValue,
  } = useForm<FormValues | CustomerSignin>({
    defaultValues: SignUpDefaultValues,
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const handleAddressMatchesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const billing = document.querySelector('.billing');
    const form = document.forms[0];
    const addressData = addressShip.map(
      (el) => (form.elements.namedItem(el) as HTMLInputElement).value
    );

    billing?.classList.toggle('hidden');
    if (event.target.checked)
      (addressBill as Array<Partial<KeySignUp>>).map((el, index) =>
        setValue(el, addressData[index])
      );
  };

  const onSubmit = async (data: FormValues | CustomerSignin) => {
    await signup(dataFormat(data as FormValues))
      .catch((err) => console.log(err))
      .then(() => {
        navigate('/');
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldInput
        control={control}
        name="email"
        label="E-mail"
        required
        rules={{
          required: 'Enter your e-mail, required field',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter valid e-mail',
          },
        }}
      />
      <TextFieldInput
        control={control}
        name="password"
        label="Password"
        required
        rules={{
          required: 'Enter your password, required field',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          validate: validatePassword,
        }}
      />
      <TextFieldInput
        control={control}
        name="firstName"
        label="First Name"
        required
        rules={{
          required: 'First name is required',
          pattern: {
            value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
            message: 'Invalid first name',
          },
        }}
      />
      <TextFieldInput
        control={control}
        name="lastName"
        label="Last Name"
        required
        rules={{
          required: 'Last name is required',
          pattern: {
            value: /^[a-zA-Z\u0400-\u04FFҐґЁёІіЇїЎў]+$/u,
            message: 'Invalid last name',
          },
        }}
      />
      <DateInput
        control={control}
        name="dateOfBirth"
        label="Date of Birth"
        required
        rules={{
          required: 'Date of Birth is required',
          validate: validateDateBirth,
        }}
      />
      <details>
        <summary>Shipping Address</summary>
        <div>
          <TextFieldInput
            control={control}
            name="shippingStreet"
            label="Street"
            required
            rules={{
              required: 'Street is required',
              minLength: {
                value: 1,
                message: 'Street must contain at least one character',
              },
            }}
          />
          <TextFieldInput
            control={control}
            name="shippingCity"
            label="City"
            required
            rules={{
              required: 'City is required',
              minLength: {
                value: 1,
                message: 'City must contain at least one character',
              },
            }}
          />
          <TextFieldInput
            control={control}
            name="shippingPostalCode"
            label="Postal code"
            required
            rules={{
              required: 'Postal code is required',
              minLength: {
                value: 1,
                message: 'Postal code must contain at least one character',
              },
            }}
          />
          <SelectInput
            control={control}
            name="shippingCountry"
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
          />
          <CheckboxInput
            control={control}
            name="shippingDefaultAddress"
            label="Make it a default address"
          />
          <SwitchInput
            control={control}
            name="addressMatches"
            label="Billing address matches the Shipping address"
            handleChange={handleAddressMatchesChange}
          />
        </div>

        <details className="billing">
          <summary>Billing Address</summary>
          <div>
            <TextFieldInput
              control={control}
              name="billingStreet"
              label="Street"
              required
              rules={{
                required: 'Street is required',
                minLength: {
                  value: 1,
                  message: 'Street must contain at least one character',
                },
              }}
            />
            <TextFieldInput
              control={control}
              name="billingCity"
              label="City"
              required
              rules={{
                required: 'City is required',
                minLength: {
                  value: 1,
                  message: 'City must contain at least one character',
                },
              }}
            />
            <TextFieldInput
              control={control}
              name="billingPostalCode"
              label="Postal code"
              required
              rules={{
                required: 'Postal code is required',
                minLength: {
                  value: 1,
                  message: 'Postal code must contain at least one character',
                },
              }}
            />
            <SelectInput
              control={control}
              name="billingCountry"
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
            />
            <CheckboxInput
              control={control}
              name="billingDefaultAddress"
              label="Make it a default address"
            />
          </div>
        </details>
      </details>

      <ColoredBtn
        className="btn"
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isValid}
      >
        Sign Up
      </ColoredBtn>
    </form>
  );
}
