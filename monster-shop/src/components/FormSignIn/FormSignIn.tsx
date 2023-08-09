import { useForm } from 'react-hook-form';

import './FormSignIn.scss';

type FormValues = {
  eMail: string;
  password: string;
};

export default function FormSignIn() {
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
        {...register('eMail', { required: true })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />
      <input type="submit" />
    </form>
  );
}
