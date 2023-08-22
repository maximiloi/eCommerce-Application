export default interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string | undefined;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingDefaultAddress: boolean;
  addressMatches: boolean;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingDefaultAddress: boolean;
}
