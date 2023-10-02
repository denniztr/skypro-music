import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { TrackListComponent } from '../../components/TrackListComponent/TrackListComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';
import * as S from './Main.styles';

export const Main = ({ setUser, tracks, setTracks, getAllTracksError }) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent setUser={setUser} />
            <TrackListComponent
              tracks={tracks}
              setTracks={setTracks}
              getAllTracksError={getAllTracksError}
            />
            <SideBarComponent />
          </S.Main>
          <footer className="footer"></footer>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
