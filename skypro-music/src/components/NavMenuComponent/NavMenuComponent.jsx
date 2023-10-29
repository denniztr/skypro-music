import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { getFavoriteTracks } from '../../pages/store/authSlice';

import * as S from './NavMenu.styles';

import { useDispatch, useSelector } from 'react-redux';

export function NavMenuComponent() {
  const linkStyle = {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
  };

  const [user, setUser] = useContext(UserContext);

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
          <S.LogoImage src="../logo.png" alt="logo" />
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
              <Link to="/favorites" style={linkStyle} >
                Мой плейслист
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              {user ? (
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
