import * as S from './Playlist.styled';
import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { SearchComponent } from '../../components/SearchComponent/SearchComponent';
import { TrackListItemsComponent } from '../../components/TrackListItemsComponent/TrackListItemsComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist, setPlaylist } from '../store/playerSlice';


export const Playlist = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.player.loading);

  const params = useParams();
  // const playlist = PLAYLISTS.find((playlist) => playlist.id === Number(params.id)
  // );

  const allTracks = useSelector((state) => state.player.tracks);
  
  useEffect(() => {
 try {
  dispatch(getPlaylist(params.id))
  dispatch(setPlaylist(allTracks))
 } catch (error) {
  console.error(error.message)
 }
  }, [params.id, dispatch, allTracks])


  const playlist = useSelector((state) => state.player.playlist);

  const tracks = playlist?.items || [];
  const name = playlist?.name || '';

  return (
    <>
    <S.Wrapper>
      <S.Container>
        <S.Main>
          <NavMenuComponent/>
          <S.MainCenterblock>
            <SearchComponent />
            <S.CenterblockTitle>{name}</S.CenterblockTitle>
            <S.CenterblockContent>
              <S.ContentTitle>
                <S.Col1>Трек</S.Col1>
                <S.Col2>ИСПОЛНИТЕЛЬ</S.Col2>
                <S.Col3>АЛЬБОМ</S.Col3>
                <S.Col4>
                  <S.PlaylistTitleSvg alt="time">
                    <use xlinkHref="../img/icon/sprite.svg#icon-watch" />
                  </S.PlaylistTitleSvg>
                </S.Col4>
              </S.ContentTitle>
              <TrackListItemsComponent isLoading={isLoading} tracks={tracks}/>  
            </S.CenterblockContent>
          </S.MainCenterblock>
          <SideBarComponent />
        </S.Main>
      </S.Container>
    </S.Wrapper>
  </>
  );
};
