import React, { useState } from 'react';
import * as S from './NavMenu.styles'
const Logo = './logo.png'


export default function NavMenuComponent () {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
              <S.MenuLink href="#"> Главное </S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.MenuLink href="#"> Мой плейлист </S.MenuLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.MenuLink href="../signin.html"> Войти </S.MenuLink>
            </S.MenuItem>
          </S.MenuList>
          ) : null}
      </S.NavMenu>
    </S.MainNav>
  );
};


