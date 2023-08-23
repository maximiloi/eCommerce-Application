import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './FormSignIn.scss';
import {
  ClientResponse,
  CustomerSignInResult,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { login } from '../../api/AuthorizedUser/requests';
import TextFieldInput from '../Inputs/TextFieldInput';
import validatePassword from '../../helper/validatePassword';
import ColoredBtn from '../ColoredBtn/ColoredBtn';

function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<CustomerSignin>({ mode: 'onChange' });
  const navigate = useNavigate();

  const onSubmit = (data: CustomerSignin) => {
    login(data).then((response: ClientResponse<CustomerSignInResult>) => {
      if (response.statusCode === 200) {
        navigate('/');
        reset();
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextFieldInput
            {...field}
            label="E-mail"
            register={register}
            required
            rules={{
              required: 'Enter your e-mail, required field',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: 'Enter valid e-mail',
              },
            }}
            error={errors?.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextFieldInput
            {...field}
            label="Password"
            register={register}
            required
            rules={{
              required: 'Enter your password, required field',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
              validate: validatePassword,
            }}
            error={errors?.password?.message}
          />
        )}
      />
      <ColoredBtn
        className="btn"
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isValid}
      >
        Log In Now
      </ColoredBtn>
    </form>
  );
}

export default FormSignIn;
