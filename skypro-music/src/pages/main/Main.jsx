import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { TrackListComponent } from '../../components/TrackListComponent/TrackListComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';

import { useState, useEffect } from 'react';
import { getAllTracks } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setTracks } from '../store/playerSlice';

import * as S from './Main.styles';


export const Main = () => {
  const dispatch = useDispatch();

  const [getAllTracksError, stGetAllTracksError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      getAllTracks().then((tracks) => {
      dispatch(setTracks(tracks))
      setIsLoading(false)
      })
    } catch (error) {
      stGetAllTracksError(error.message)
      setIsLoading(false)
    }
  }, [dispatch])

  const tracks = useSelector((state) => state.player.tracks)
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent />
            <TrackListComponent isLoading={isLoading} tracks={tracks}  getAllTracksError={getAllTracksError} />
            <SideBarComponent/>
          </S.Main>
          <footer className="footer"></footer>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
