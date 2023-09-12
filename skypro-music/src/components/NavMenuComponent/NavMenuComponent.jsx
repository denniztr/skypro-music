import React, { useState } from 'react';
import * as S from './NavMenu.styles';
import { Link, useNavigate } from 'react-router-dom';
const Logo = './logo.png';

export function NavMenuComponent({ setUser }) {
  const linkStyle = {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(localStorage.clear());
    navigate('/signin', { replace: true });
  };

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src={Logo} alt="logo" />
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
                Главное
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
                <Link to="/signin">
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
