import './SignUp.css'
import { Link } from 'react-router-dom';

export const SignUp = () => {
  return (
    <>
      <div class="wrapper">
        <div class="container-signup">
          <div class="modal__block">
            <form class="modal__form-login">
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
                class="modal__input password-first"
                type="password"
                name="password"
                placeholder="Пароль"
              />
              <input
                class="modal__input password-double"
                type="password"
                name="password"
                placeholder="Повторите пароль"
              />
              <button class="modal__btn-signup-ent">
                {/* <a href="../index.html">Зарегистрироваться</a> */}
                <Link to="/"> Зарегистрироваться </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
