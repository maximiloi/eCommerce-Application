export type ShippingFields = {
  [key: string]: string;
};

export interface FormValues {
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
  shipping?: ShippingFields;
  addressMatches: boolean;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingDefaultAddress: boolean;
}

export type KeySignUp = keyof FormValues;
