import React, { useContext } from 'react';
import { PlayListComponent } from '../PlayListComponent/PlayListComponent';
import * as S from './SideBar.styles';
import { PLAYLISTS } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';


export function SideBarComponent() {

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const buttonClick = () => {
    window.localStorage.removeItem('user');
    setUser(window.localStorage.getItem('user'));
    navigate('/login');
  }

  return (
    <S.MainSidebar>
      <S.SideBarPersonal>
        <S.SideBarPersonalName> {user} </S.SideBarPersonalName>
        <S.SideBarIcon className="sidebar__icon" >
          <svg width="100%" height="100%" alt="logout" onClick={buttonClick}>
            <use xlinkHref="img/icon/sprite.svg#logout" ></use>
          </svg>
        </S.SideBarIcon>
      </S.SideBarPersonal>
      <S.SideBarBlock>
        <PlayListComponent playlists={PLAYLISTS} />
      </S.SideBarBlock>
    </S.MainSidebar>
  );
}
