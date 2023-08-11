import { NavLink } from 'react-router-dom';
import FormSignUp from '../components/FormSignUp/FormSignUp';

function SignUp() {
  return (
    <div className="register">
      <div className="register__container">
        <h2>Sign Up</h2>
        <FormSignUp />
        <NavLink to="/auth">You have an account, Login</NavLink>
      </div>
    </div>
  );
}

export default SignUp;
