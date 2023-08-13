import { NavLink } from 'react-router-dom';
import FormSignIn from '../components/FormSignIn/FormSignIn';

function SignIn() {
  return (
    <div className="login-form">
      <div className="login-form__container">
        <h2>Sign In</h2>
        <FormSignIn />
        <NavLink to="/auth/register">No Account, Register</NavLink>
      </div>
    </div>
  );
}

export default SignIn;
