import { Link, useLocation } from 'react-router-dom';
import './Logo.scss';
import logoImg from '../../assets/images/logo.jpg';

function LogoComponent() {
  return (
    <div className="logo logo__header">
      <div className="logo__img">
        <img src={logoImg} alt="Logo Monster" />
      </div>
      <div className="logo__wrapper">
        <span>FRONTENDS,</span>
        <span>INC.</span>
      </div>
    </div>
  );
}

function Logo() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return <LogoComponent />;
  }

  return (
    <Link className="header__link" to="/">
      <LogoComponent />
    </Link>
  );
}

export default Logo;
