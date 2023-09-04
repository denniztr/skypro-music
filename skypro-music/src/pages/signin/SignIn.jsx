import './SignIn.css';
import { Link } from 'react-router-dom';

export const SignIn = ({ onAuthButtonClick }) => {
  return (
    <>
      <div className="wrapper">
        <div className="container-enter">
          <div className="modal__block">
            <form className="modal__form-login" action="#">
              <Link to="/">
                <div className="modal__logo">
                  <img src="./logo_modal.png" alt="logo" />
                </div>
              </Link>
              <input
                className="modal__input login"
                type="text"
                name="login"
                placeholder="Почта"
              />
              <input
                className="modal__input password"
                type="password"
                name="password"
                placeholder="Пароль"
              />
              <Link to="/">
                <button
                  onClick={onAuthButtonClick}
                  className="modal__btn-enter"
                >
                  Войти
                </button>
              </Link>

              <button className="modal__btn-signup">
                <Link to="/signup"> Зарегистрироваться </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
