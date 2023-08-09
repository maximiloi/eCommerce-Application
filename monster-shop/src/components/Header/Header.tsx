import Logo from '../Logo/Logo';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Logo />
        <nav className="header__nav">
          <ul>
            <li>
              <a href="/auth">Sign In</a>
            </li>
            <li>
              <a href="/auth/register">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
