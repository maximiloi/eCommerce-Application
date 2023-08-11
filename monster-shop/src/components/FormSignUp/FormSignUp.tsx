import { useForm } from 'react-hook-form';
import validatePassword from '../../helper/validatePassword';

import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    getValues,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input
        type="text"
        placeholder="E-mail"
        {...register('eMail', {
          required: 'Enter your e-mail, required field',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter e-mail',
          },
        })}
      />
      {errors?.eMail && (
        <span>{errors?.eMail.message || 'Required field'}</span>
      )}
      <input
        type="text"
        placeholder="First Name"
        {...register('firstName', {
          required: 'Enter your "First Name", required field',
          pattern: {
            value: /[a-zA-Zа-яА-Я]$/i,
            message: 'The first name should only contain letters',
          },
        })}
      />
      {errors?.firstName && (
        <span>{errors?.firstName.message || 'Required field'}</span>
      )}
      <input
        type="text"
        placeholder="Last Name"
        {...register('lastName', {
          required: 'Enter your "Last Name", required field',
          pattern: {
            value: /[a-zA-Zа-яА-Я]$/i,
            message: 'The last name should only contain letters',
          },
        })}
      />
      {errors?.lastName && (
        <span>{errors?.lastName.message || 'Required field'}</span>
      )}
      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          validate: validatePassword,
        })}
      />
      {errors?.password && (
        <span>
          {errors?.password.message || 'Password must be at least 8 characters'}
        </span>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
        })}
      />
      {watch('confirmPassword') !== watch('password') &&
      getValues('confirmPassword') ? (
        <span>Confirm Password not match</span>
      ) : null}

      <input
        type="text"
        placeholder="Street"
        {...register('street', {
          required: 'Enter your "Street", required field',
        })}
      />
      {errors?.street && (
        <span>{errors?.street.message || 'Required field'}</span>
      )}

      <input
        type="text"
        placeholder="City"
        {...register('city', {
          required: 'Enter your "City", required field',
          pattern: {
            value: /[a-zA-Zа-яА-Я]$/i,
            message: 'The City should only contain letters',
          },
        })}
      />
      {errors?.city && <span>{errors?.city.message || 'Required field'}</span>}

      <input
        type="text"
        placeholder="Postal code"
        {...register('postalCode', {
          required: 'Enter your "Postal code", required field',
          pattern: {
            value: /[0-9]$/i,
            message: 'Can Postal code only contain numbers',
          },
        })}
      />
      {errors?.postalCode && (
        <span>{errors?.postalCode.message || 'Required field'}</span>
      )}

      <input
        type="text"
        placeholder="Country"
        {...register('country', {
          required: 'Enter your "Country", required field',
        })}
      />
      {errors?.country && (
        <span>{errors?.country.message || 'Required field'}</span>
      )}

      <input type="submit" disabled={!isValid} />
    </form>
  );
}
