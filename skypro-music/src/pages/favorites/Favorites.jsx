import { NavMenuComponent } from '../../components/NavMenuComponent/NavMenuComponent';
import { SearchComponent } from '../../components/SearchComponent/SearchComponent';
import { SortButtonsComponent } from '../../components/SortButtonsComponent/SortButtonsComponent';
import { SideBarComponent } from '../../components/SideBarComponent/SideBarComponent';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import * as S from './Favorites.styles';

export const FavoriteSongs = ({ setUser, email, password }) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [error, setError] = useState('');
  
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    
    console.log(token);

  }, [token])
  
  
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.Main>
            <NavMenuComponent setUser={setUser} />
            <S.MainCenterblock>
              <SearchComponent />
              <S.CenterblockTitle>Мой плейлист</S.CenterblockTitle>
              <SortButtonsComponent  />
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
                <h1>Избранные треки здесь</h1>

              </S.CenterblockContent>
            </S.MainCenterblock>
            <SideBarComponent />
          </S.Main>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
