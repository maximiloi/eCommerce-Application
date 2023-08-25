export const countries = [
  { value: 'BY', label: 'Belarus' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'PL', label: 'Poland' },
  { value: 'RU', label: 'Russia' },
];

export const SignUpDefaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  dateOfBirth: undefined,
  shippingStreet: '',
  shippingCity: '',
  shippingPostalCode: '',
  shippingCountry: '',
  shippingDefaultAddress: false,
  addressMatches: false,
  billingStreet: '',
  billingCity: '',
  billingPostalCode: '',
  billingCountry: '',
  billingDefaultAddress: false,
};

export const addressShip = [
  'shippingStreet',
  'shippingCity',
  'shippingPostalCode',
  'shippingCountry',
];

export const addressBill = [
  'billingStreet',
  'billingCity',
  'billingPostalCode',
  'billingCountry',
];
