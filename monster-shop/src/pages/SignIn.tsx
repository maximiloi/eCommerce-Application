import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton/LoginButton';
import FormSignIn from '../components/FormSignIn/FormSignIn';

function SignIn() {
  return (
    <div className="login-form">
      <div className="login-form__container">
        <LoginButton />
        <div className="login-form__wrapper">
          <FormSignIn />
          <Link className="login-form__link" to="/auth/register">
            No Account, Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
