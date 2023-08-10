import { useForm } from 'react-hook-form';
import validatePassword from '../../helper/validatePassword';

import './FormSignIn.scss';

type FormValues = {
  eMail: string;
  password: string;
};

export default function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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
          required: 'Enter your e-mail',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter valid e-mail',
          },
        })}
      />
      {errors.eMail && <p>{errors.eMail.message}</p>}
      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Enter your password',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          validate: validatePassword,
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" disabled={!isValid} />
    </form>
  );
}
