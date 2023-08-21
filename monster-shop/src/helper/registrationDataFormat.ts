import { MyCustomerDraft } from '@commercetools/platform-sdk';
import dayjs from 'dayjs';
import FormValues from '../types/signupFormValues';

export default function dataFromat(data: FormValues): MyCustomerDraft {
  const draft = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: dayjs(data.dateOfBirth).format('DDMMYYYY'),
    addresses: [
      {
        country: data.shippingCountry,
        city: data.shippingCity,
        streetName: data.shippingStreet,
        postalCode: data.shippingPostalCode,
      },
    ],
  };
  if (data.addressMatches) draft.addresses?.push(draft.addresses[0]);
  else {
    draft.addresses?.push({
      country: data.billingCountry,
      city: data.billingCity,
      streetName: data.billingStreet,
      postalCode: data.billingPostalCode,
    });
    if (data.billingDefaultAddress)
      Object.defineProperty(draft, 'defaultbillingAddress', 1);
  }
  if (data.shippingDefaultAddress) {
    Object.defineProperty(draft, 'defaultShippingAddress', 0);
    if (data.addressMatches)
      Object.defineProperty(draft, 'defaultBillingAddress', 0);
  }
  return draft;
}
