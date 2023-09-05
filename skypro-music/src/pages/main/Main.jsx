import NavMenuComponent from '../../components/NavMenuComponent/NavMenuComponent';
import TrackListComponent from '../../components/TrackListComponent/TrackListComponent';
import SideBarComponent from '../../components/SideBarComponent/SideBarComponent';
import AudioPlayerComponent from '../../components/AudioPlayerComponent/AudioPlayerComponent';
import * as S from './Main.styles';

export const Main = ({ setUser }) => {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent setUser={setUser} />
            <TrackListComponent />
            <SideBarComponent />
          </S.Main>
          <AudioPlayerComponent />
          <footer className="footer"></footer>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
