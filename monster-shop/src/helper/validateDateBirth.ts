import { CartResourceIdentifier } from '@commercetools/platform-sdk';
import { FormValues, ShippingFields } from '../types/signupFormValues';

type ValueType =
  | string
  | boolean
  | undefined
  | FormValues
  | CartResourceIdentifier
  | ShippingFields;

const validateDateBirth: (value: ValueType) => string | true = (
  value: ValueType
): string | true => {
  const ageConsent = 13;
  const bigAge = 129;

  if (typeof value === 'string') {
    const today = new Date();
    const birthDate = new Date(value.toString());
    const age: number = today.getFullYear() - birthDate.getFullYear();

    if (age < ageConsent) {
      return `Your age must be over ${ageConsent} years old, 👶`;
    }

    if (age > bigAge) {
      return `You can't be more than ${bigAge} years old, 🧛 Dracula is you?`;
    }
  }

  return true;
};

export default validateDateBirth;
