import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CustomerSignin } from '@commercetools/platform-sdk';
import { login } from '../../api/requests';
import TextFieldInput from '../Inputs/TextFieldInput';
import validatePassword from '../../helper/validatePassword';
import ColoredBtn from '../ColoredBtn/ColoredBtn';
import './FormSignIn.scss';

function FormSignIn() {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    control,
  } = useForm<CustomerSignin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = (data: CustomerSignin) => {
    login(data)
      .catch((err) => console.log(err))
      .then(() => {
        navigate('/');
        reset();
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldInput
        control={control}
        name="email"
        label="E-mail"
        required
        rules={{
          required: 'Enter your e-mail, required field',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            message: 'Enter valid e-mail',
          },
        }}
      />
      <TextFieldInput
        control={control}
        name="password"
        label="Password"
        required
        rules={{
          required: 'Enter your password, required field',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
          validate: validatePassword,
        }}
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
