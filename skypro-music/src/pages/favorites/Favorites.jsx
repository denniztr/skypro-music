import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { SearchComponent } from '../../components/SearchComponent/SearchComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';
import { FavTracksItemComponent } from '../../components/FavTracksItemComponent/FavTracksItemComponent';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { updateToken } from '../store/authSlice';
import { setAccessToken, getFavoriteTracks } from '../store/authSlice';

import * as S from './Favorites.styles';

export const FavoriteSongs = ({ isLoading }) => {
  const dispatch = useDispatch();

  const refreshToken = window.localStorage.getItem('refreshToken');
  let accessToken = useSelector((state) => state.auth.accessToken);
  

  useEffect(() => {
    dispatch(updateToken(refreshToken))
      .then((newAccessToken) => {
        accessToken = newAccessToken;
        dispatch(setAccessToken(accessToken.payload));
        // window.localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => console.error(error.message));
      // dispatch(getFavoriteTracks(accessToken))
  }, [dispatch, refreshToken]);

  
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent/>
            <S.MainCenterblock>
              <SearchComponent />
              <S.CenterblockTitle>Мой плейлист</S.CenterblockTitle>
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
                <FavTracksItemComponent isLoading={isLoading}/>
              </S.CenterblockContent>
            </S.MainCenterblock>
            <SideBarComponent />
          </S.Main>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
