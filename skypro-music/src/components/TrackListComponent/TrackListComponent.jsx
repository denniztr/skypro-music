import * as S from './TrackList.styles'
import TrackListItemsComponent from '../TrackListItemsComponent/TrackListItemsComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import SortButtonsComponent from '../SortButtonsComponent/SortButtonsComponent'

export default function TrackListComponent () {
  
  return (
    <S.MainCenterblock>
      <SearchComponent />
      <S.CenterblockTitle>Треки</S.CenterblockTitle>
      <SortButtonsComponent/>
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
        <TrackListItemsComponent />
      </S.CenterblockContent>
    </S.MainCenterblock>
  );
};