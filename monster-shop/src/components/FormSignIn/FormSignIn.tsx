import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Cart, CustomerSignin } from '@commercetools/platform-sdk';
import { login } from '../../api/requests/userActions';
import { getCarts } from '../../api/requests/cart';
import { useAppDispatch } from '../../redux/hooks';
import { setTotalQuantity } from '../../redux/cartCountSlice';
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
  const dispatch = useAppDispatch();
  const fetchCart = useCallback(async () => {
    try {
      const cartResponce = (await getCarts()) as Cart[];
      const cart = cartResponce[0];
      if (cart) dispatch(setTotalQuantity(cart.totalLineItemQuantity || 0));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const onSubmit = (data: CustomerSignin) => {
    login(data)
      .catch((err) => console.log(err))
      .then(() => {
        navigate('/');
        reset();
        fetchCart();
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldInput
        control={control}
        name="email"
        label="E-mail"
        required
        disabled={false}
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
        disabled={false}
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
