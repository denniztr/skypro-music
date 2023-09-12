import { Link } from 'react-router-dom';
import './Favorites.css';

export const FavoriteSongs = () => {
  return (
    <>
      <div className="fav__container">
        <Link to='/'>
          <div className="modal__logo fav__logo">
            <img className="fav__logo-src" src="./logo.png" alt="logo" />
          </div>
        </Link>
        <div className="fav">
          <h3 className="fav__title">Favorites</h3>
        </div>
      </div>
    </>
  );
};
