import { NavLink, useLocation } from 'react-router-dom';

import './LoginButton.scss';

function LoginButtons() {
  const location = useLocation();
  const disableSignIn = location.pathname === '/auth';
  const disableRegister = location.pathname === '/register';

  return (
    <div className="login-button__wrapper">
      <NavLink
        className={
          disableSignIn ? 'login-button__item disabled' : 'login-button__item'
        }
        to="/auth"
      >
        Sign In
      </NavLink>
      <NavLink
        className={
          disableRegister ? 'login-button__item disabled' : 'login-button__item'
        }
        to="/register"
      >
        Register
      </NavLink>
    </div>
  );
}

export default LoginButtons;
