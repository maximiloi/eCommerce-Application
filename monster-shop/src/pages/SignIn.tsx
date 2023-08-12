import { NavLink } from 'react-router-dom';
import FormSignIn from '../components/FormSignIn/FormSignIn';

import '../sass/pages/_SignIn.scss';

function SignIn() {
  return (
    <div className="sign-in">
      <div className="sign-in__container">
        <h2>Sign In</h2>
        <FormSignIn />
        <NavLink to="/auth/register">No Account, Register</NavLink>
      </div>
    </div>
  );
}

export default SignIn;
