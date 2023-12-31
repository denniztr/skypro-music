import './NotFound.css';

export const NotFound = () => {
  return (
    <>
      <div className="fav__container">
        <a href="../">
          <div class="modal__logo fav__logo">
            <img className="fav__logo-src" src="./logo.png" alt="logo" />
          </div>
        </a>
        <div className="fav">
          <h3 className="fav__title">The page is not found</h3>
        </div>
      </div>
    </>
  );
};
