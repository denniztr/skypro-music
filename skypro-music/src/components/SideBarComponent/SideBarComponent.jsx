import PlayListComponent from '../PlayListComponent/PlayListComponent';
import * as S from './SideBar.styles'

export default function SideBarComponent() {
  return (
    <S.MainSidebar>
      <S.SideBarPersonal>
        <S.SideBarPersonalName> Sergey.Ivanov </S.SideBarPersonalName>
        <S.SideBarIcon className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </S.SideBarIcon>
      </S.SideBarPersonal>
      <S.SideBarBlock>
        <PlayListComponent />
      </S.SideBarBlock>
    </S.MainSidebar>
  );
}
