import { useForm } from 'react-hook-form';

import './FormSignUp.scss';

type FormValues = {
  eMail: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FormValues) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input
        type="text"
        placeholder="E-mail"
        {...register('E-mail', {
          required: true,
          pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
        })}
      />
      <input
        type="text"
        placeholder="First Name"
        {...register('First Name', { required: true })}
      />
      <input
        type="text"
        placeholder="Last Name"
        {...register('Last Name', {})}
      />
      <input
        type="password"
        placeholder="Password"
        {...register('Password', { required: true })}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        {...register('Repeat Password', { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
