import { NavLink } from 'react-router-dom';

import './LoginButton.scss';

function LoginButtons() {
  return (
    <div className="login-button__wrapper">
      <NavLink className="login-button__item" to="/auth">
        Sign In
      </NavLink>
      <NavLink className="login-button__item" to="/register">
        Register
      </NavLink>
    </div>
  );
}

export default LoginButtons;
