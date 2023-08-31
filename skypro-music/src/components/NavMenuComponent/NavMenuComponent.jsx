import React, { useState } from 'react';
import * as S from './NavMenu.styles'
import { Link } from 'react-router-dom';
const Logo = './logo.png'


export default function NavMenuComponent () {

  const linkStyle = { 'color': '#ffffff', 
                      'font-weight': '400',
                      'font-size': '16px',
                      'line-height': '24px', 
                    }


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
                <Link 
                  to="/" 
                  style={linkStyle} 
                > 
                  Главное 
                </Link>
              </S.MenuItem>
              <S.MenuItem>
                <Link 
                  to="/favorites" 
                  style={linkStyle}
                > 
                  Мой плейслист 
                </Link>
              </S.MenuItem>
              <S.MenuItem>
                <Link 
                  to="/signin" 
                  style={linkStyle}
                > 
                  Войти 
                </Link>
              </S.MenuItem>
            </S.MenuList>
          ) : null}
      </S.NavMenu>
    </S.MainNav>
  );
};


