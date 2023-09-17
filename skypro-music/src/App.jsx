import { createGlobalStyle } from 'styled-components';
import { AppRoutes } from './routes';
import { useState, useEffect } from 'react';
import { getAllTracks } from './api';
import { AudioPlayer } from './AudioPlayer';
import { TRACKS } from './constants';

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
    stroke: #acacac;
    cursor: pointer;
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
  const [user, setUser] = useState(null);
  const handleLogin = () => setUser(localStorage.setItem('user', 'token'));

  const [tracks, setTracks] = useState(TRACKS);
  const [getAllTracksError, stGetAllTracksError] = useState(null);

  useEffect(() => {
    getAllTracks()
      .then((tracks) => setTracks(tracks))
      .catch((error) => {
        stGetAllTracksError(error.message);
      });
  }, []);

  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <>
      <GlobalStyle />
      <AppRoutes
        user={user}
        setUser={setUser}
        onAuthButtonClick={handleLogin}
        tracks={tracks}
        setTracks={setTracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        getAllTracksError={getAllTracksError}
      />

      {currentTrack ? (
        <AudioPlayer
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
      ) : null}
    </>
  );
};

export default App;
