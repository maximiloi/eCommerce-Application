import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <div className="header__nav">
          <NavLink className="btn" to="/auth">
            Log In Now
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
