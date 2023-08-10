import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <div className="header__nav">
          <NavLink to="/auth">Sign In</NavLink>
          <NavLink to="/auth/register">Sign Up</NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
