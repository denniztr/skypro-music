import '../TrackList.css';
import '../App.css';
import TrackListItemsComponent from './TrackListItemsComponent';
import SearchComponent from './SearchComponent';
import SortButtonsComponent from './SortButtonsComponent'

export default function TrackListComponent () {
  
  return (
    <div className="main__centerblock centerblock">
      <SearchComponent />
      <h2 className="centerblock__h2">Треки</h2>
      <SortButtonsComponent/>
      <div className="centerblock__content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
          <div className="playlist-title__col col03">АЛЬБОМ</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg" alt="time">
              <use xlinkHref="../img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <TrackListItemsComponent />
      </div>
    </div>
  );
};