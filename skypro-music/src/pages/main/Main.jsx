import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { TrackListComponent } from '../../components/TrackListComponent/TrackListComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';
import { setTracks } from '../store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './Main.styles';

export const Main = ({ getAllTracksError }) => {


  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent />
            <TrackListComponent getAllTracksError={getAllTracksError} />
            <SideBarComponent/>
          </S.Main>
          <footer className="footer"></footer>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
