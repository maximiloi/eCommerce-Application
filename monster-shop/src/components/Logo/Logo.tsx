import React from 'react';
import './Logo.scss';
import logoImg from '../../assets/images/logo.jpg';

function Logo() {
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

export default Logo;
