import React, { useState } from 'react';
import '../NavMenu.css';
import '../App.css';
const Logo = './logo.png'

const NavMenuComponent = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <img 
        className="logo__image" 
        src={Logo}
        alt="logo" />
      </div>
      <div className="nav__burger burger" onClick={toggleMenu}>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>    
      <div className="nav__menu menu">
        {isMenuOpen ? (
            <ul className="menu__list">
            <li className="menu__item">
            <a href="#" className="menu__link">
              Главное
            </a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              Мой плейлист
            </a>
          </li>
          <li className="menu__item">
            <a href="../signin.html" className="menu__link">
              Войти
            </a>
          </li>
          </ul>
          ) : null}
      </div>
    </nav>
  );
};

export default NavMenuComponent;
