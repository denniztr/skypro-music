import './SignIn.css'
import { Link } from 'react-router-dom';

export const SignIn = () => {
  return (
    <>
      <div class="wrapper">
        <div class="container-enter">
          <div class="modal__block">
            <form class="modal__form-login" action="#">
              <Link to="/">
                <div class="modal__logo">
                  <img src="./logo_modal.png" alt="logo" />
                </div>
              </Link>
              <input
                class="modal__input login"
                type="text"
                name="login"
                placeholder="Почта"
              />
              <input
                class="modal__input password"
                type="password"
                name="password"
                placeholder="Пароль"
              />
              <button class="modal__btn-enter">
                {/* <a href="../index.html">Войти</a> */}
                
                <Link to="/"> Войти </Link>
              </button>
              <button class="modal__btn-signup">
                {/* <a href="signup.html">Зарегистрироваться</a> */}

                <Link to="/signup"> Зарегистрироваться </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
