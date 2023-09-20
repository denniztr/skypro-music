import { Link, useNavigate } from "react-router-dom";
import * as S from "./AuthPage.styles";
import { useEffect, useState } from "react";
import { registerUser, loginUser } from "../../api";

export function AuthPage({ isLoginMode = false }) {
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");


  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email) {
      setError('Введите почту')
    }
    if (!password) {
      setError('Введите пароль')
    }

    try {
      const userData = await loginUser({ email, password })
      localStorage.setItem('userData', JSON.stringify(userData))
      console.log(userData)
      navigate('/', {replace: true})
    } catch (error) {
      console.error('Error message: ' + error)
    }

    alert(`Выполняется вход: ${email} ${password}`);
    setError("Неизвестная ошибка входа");
  };

  const handleRegister = async () => {

    if (!username) {
      setError('Веедите имя')
      return
    }
    if (!email) {
      setError('Введите почту')
      return
    }
    if (!password) {
      setError('Веедите пароль')
      return
    }
    if (password !== repeatPassword) {
      setError('Пароли не совпадают')
      return
    }

    try {
      const userData = await registerUser({ email, password, username })
      console.log(userData)
      localStorage.setItem('userData', JSON.stringify(userData))
      console.log(localStorage)
      navigate('/', {replace: true})
    } catch (error) {
      console.error('Error message: ' + error)
    }

    alert(`Выполняется регистрация: ${email} ${password}`);
    setError("Неизвестная ошибка регистрации");
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
              <S.PrimaryButton 
                onClick={handleRegister}
              >
                Зарегистрироваться
              </S.PrimaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  );
}
