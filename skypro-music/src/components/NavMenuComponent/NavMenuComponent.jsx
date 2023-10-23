import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

import * as S from './NavMenu.styles';

const Logo = './logo.png';

export function NavMenuComponent() {
  const linkStyle = {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
  };

  const [setUser] = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(localStorage.clear()); 
    navigate('/login', { replace: true });
  };

  return (
    <S.MainNav>
      <S.NavLogo>
        <Link to="/">
          <S.LogoImage src={Logo} alt="logo" />
        </Link>
      </S.NavLogo>
      <S.NavBurger onClick={toggleMenu}>
        <S.BurgerLine />
        <S.BurgerLine />
        <S.BurgerLine />
      </S.NavBurger>
      <S.NavMenu>
        {isMenuOpen ? (
          <S.MenuList>
            <S.MenuItem>
              <Link to="/" style={linkStyle}>
                Главная
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to="/favorites" style={linkStyle}>
                Мой плейслист
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              {setUser ? (
                <S.MenuLink onClick={handleLogout}>Выйти</S.MenuLink>
              ) : (
                <Link to="/login">
                  <S.MenuLink>Войти</S.MenuLink>
                </Link>
              )}
            </S.MenuItem>
          </S.MenuList>
        ) : null}
      </S.NavMenu>
    </S.MainNav>
  );
}
