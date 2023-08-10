import { useForm } from 'react-hook-form';

import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
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
            value: 6,
            message: 'Password must have at least 6 characters',
          },
        })}
      />
      {errors?.password && (
        <span>
          {errors?.password.message || 'Password must be at least 6 characters'}
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
      <input type="submit" disabled={!isValid} />
    </form>
  );
}
