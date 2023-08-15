import '../TrackList.css';
import '../App.css';
import TrackListItemsComponent from '../components/TrackListItemsComponent';
import SearchComponent from '../components/SearchComponent';

const TrackListComponent = () => {
  return (
    <div className="main__centerblock centerblock">
      <SearchComponent />
      <h2 className="centerblock__h2">Треки</h2>
      <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        <div className="filter__button button-author _btn-text">
          исполнителю
        </div>
        <div className="filter__button button-year _btn-text">году выпуска</div>
        <div className="filter__button button-genre _btn-text">жанру</div>
      </div>
      <div className="centerblock__content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
          <div className="playlist-title__col col03">АЛЬБОМ</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg" alt="time">
              <use xlinkHref="../public/img/icon/watch.svg"></use>
            </svg>
          </div>
        </div>
        <TrackListItemsComponent />
      </div>
    </div>
  );
};

export default TrackListComponent;
