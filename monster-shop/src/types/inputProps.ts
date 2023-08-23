import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { FormValues } from './signupFormValues';

export type InputPropsType = {
  label: string;
  name: Path<FormValues>;
  register: UseFormRegister<FormValues | CustomerSignin>;
  required: boolean;
  rules?: RegisterOptions;
  error?: string;
};
