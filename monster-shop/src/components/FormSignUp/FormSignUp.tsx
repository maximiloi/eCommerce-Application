import { useForm } from 'react-hook-form';

import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => console.log(data);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input
        type="text"
        placeholder="E-mail"
        {...register('eMail', {
          required: true,
          pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
        })}
      />
      <input
        type="text"
        placeholder="First Name"
        {...register('firstName', { required: true })}
      />
      <input
        type="text"
        placeholder="Last Name"
        {...register('lastName', { required: false })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        {...register('repeatPassword', { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
