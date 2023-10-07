import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import { registerUser, loginUser, 
  // getToken 
} from '../../api';

import { UserContext } from '../../context';

import { useDispatch } from 'react-redux';
import { getToken } from '../store/authSlice';

import * as S from './AuthPage.styles';

export function AuthPage({ isLoginMode = false }) {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const [loginButton, setLoginButton] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setError('Введите почту');
      return;
    }
    if (!password) {
      setError('Введите пароль');
      return;
    }
    setLoginButton(true);
    loginUser({ email, password })
      .then(async (object) => {
        const status = object.status;
        const data = object.data;
        if (status === 200) {
          setError(null);
          window.localStorage.setItem('user', data.username);
          setUser(data.username);
          dispatch(getToken({ email, password }))
          navigate('/');
        } else {
          const message = data.detail;
          setError(message);
          setLoginButton(false);
        }
      })
      .catch((error) => setError(error.message));

    // alert(`Выполняется вход: ${email} ${password}`);
    // setError("Неизвестная ошибка входа");
  };
  
  const handleRegister = async () => {
    if (!username) {
      setError('Веедите имя');
      return;
    }
    if (!email) {
      setError('Введите почту');
      return;
    }
    if (!password) {
      setError('Веедите пароль');
      return;
    }
    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    registerUser({ email, password, username })
      .then((object) => {
        const status = object.status;
        const data = object.data;
        console.log(status);
        console.log(data);
        if (status === 201) {
          setError(null);
          window.localStorage.setItem('user', data.username);
          setUser(data.username);
          navigate('/');
        } else {
          const message =
            data.email ||
            data.username ||
            data.password[0] ||
            data.password[1] ||
            data.password[2];
          setError(message);
        }
      })
      .catch((error) => setError(error.message));

    // alert(`Выполняется регистрация: ${email} ${password}`);
    // setError("Неизвестная ошибка регистрации");
  };

  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password, repeatPassword]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/login">
          <S.ModalLogo>
            <S.ModalLogoImage src="./logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        {isLoginMode ? (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton
                onClick={() => handleLogin({ email, password })}
                
                disabled={loginButton}
                to="/"
              >
                Войти
              </S.PrimaryButton>
              <Link to="/register">
                <S.SecondaryButton>Зарегистрироваться</S.SecondaryButton>
              </Link>
            </S.Buttons>
          </>
        ) : (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton onClick={handleRegister}>
                Зарегистрироваться
              </S.PrimaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  );
}
