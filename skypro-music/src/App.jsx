import React, { useState, useEffect } from 'react';

import { createGlobalStyle } from 'styled-components';

import { AppRoutes } from './routes';
import { UserContext } from './context';

import { AudioPlayer } from './AudioPlayer';

import { useSelector, useDispatch } from 'react-redux';

import { setAccessToken, setUserRed } from './pages/store/authSlice';
import { updateToken } from './pages/store/authSlice';


const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'StratosSkyeng', sans-serif;
    color: #ffffff;
  }

  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'StratosSkyeng';
    src: local('StratosSkyeng'), local('StratosSkyeng'),
      url('/public//fonts/StratosSkyeng.woff2') format('woff2'),
      url('/public/fonts/StratosSkyeng.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  a,
  a:visited {
    text-decoration: none;
    font-family: 'StratosSkyeng', sans-serif;
    cursor: pointer;
  }

  button,
    ._btn {
      cursor: pointer;
  }

  ul li {
    list-style: none;
  }

  ._btn-text:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }

  ._btn-text:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }

  ._btn-icon:hover svg {
    fill: transparent;
    stroke: #ffffff;
    cursor: pointer;
    transition: stroke 0.3s ease-out;
  } 

  ._btn-icon:active svg {
    fill: transparent;
    stroke: #ffffff;
    cursor: pointer;
  }

  ._btn-icon:active .track-play__like-svg,
  ._btn-icon:active .track-play__dislike-svg {
    fill: #696969;
    stroke: #ffffff;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
      width: 4px;
      background-color: rgba(75, 73, 73, 1)
  }


  ::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 9em;
      height: 10px;
  } 

  audio {
    display: none;
  }


`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    dispatch(setUserRed(currentUser))
    setUser(currentUser)
 }, [dispatch])


  const [user, setUser] = useState(
    localStorage.getItem('user') || 
    null
  );

  const currentTrack = useSelector((state) => state.player.currentTrack);
  
  let accessToken = useSelector((state) => state.auth.accessToken);
  
  const refreshToken = window.localStorage.getItem('refreshToken');

  useEffect(() => {
    dispatch(updateToken(refreshToken))
    .then((newAccessToken) => {
      accessToken = newAccessToken;
      dispatch(setAccessToken(accessToken.payload))
    }).catch((error) => console.error(error.message))
  }, [dispatch, refreshToken])

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={[user, setUser]}>
        <AppRoutes />
        {currentTrack && user ? <AudioPlayer /> : null}
      </UserContext.Provider>
    </>
  );
};

export default App;
