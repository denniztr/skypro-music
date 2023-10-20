import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { SearchComponent } from '../../components/SearchComponent/SearchComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';
import { FavTracksItemComponent } from '../../components/FavTracksItemComponent/FavTracksItemComponent';
import { TrackListItemsComponent } from '../../components/TrackListItemsComponent/TrackListItemsComponent';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import { setAccessToken, updateToken } from '../store/authSlice';

import { UserContext } from '../../context';
import { useContext } from 'react';

import * as S from './Favorites.styles';


export const FavoriteSongs = () => {

  const dispatch = useDispatch();

  const [user] = useContext(UserContext);
  // const currentUser = user;

  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = window.localStorage.getItem('refreshToken');
  let accessToken = useSelector((state) => state.auth.accessToken);

  const favorites = useSelector((state) => state.player.favorites.map((item) => {
    return {
      ...item,
      stared_user: [{
        email: user.email,
        first_name: '',
        id: user.id,
        username: user.username,
      }]
    }
  }))

  console.log(favorites);

 // const favorites = useSelector((state) => state.player.favorites);

  useEffect(() => {
    dispatch(updateToken(refreshToken))
      .then((newAccessToken) => {
        accessToken = newAccessToken;
        dispatch(setAccessToken(accessToken.payload));
        // window.localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => console.error(error.message));
     
  }, [dispatch, refreshToken]);

  console.log(favorites);
  // useEffect(() => {
  //   try {
  //     getFavoriteTracks(accessToken).then((tracks) => {
  //     dispatch(setFavorites(tracks))
  //     setIsLoading(false)
  //     })
  //   } catch (error) {
  //     console.error(error.message)
  //     setIsLoading(false)
  //   }
    
  // }, [accessToken, dispatch])



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
                {/* <FavTracksItemComponent  isLoading={isLoading}/> */}
                <TrackListItemsComponent favorites={favorites}/>
              </S.CenterblockContent>
            </S.MainCenterblock>
            <SideBarComponent />
          </S.Main>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
