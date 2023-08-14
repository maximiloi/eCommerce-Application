import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton/LoginButton';
import FormSignUp from '../components/FormSignUp/FormSignUp';

function SignUp() {
  return (
    <div className="login-form">
      <div className="login-form__container">
        <LoginButton />
        <div className="login-form__wrapper">
          <FormSignUp />
          <Link className="login-form__link" to="/auth">
            You have an account, Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
