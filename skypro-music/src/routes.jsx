import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { FavoriteSongs } from './pages/favorites/Favorites';
import { NotFound } from './pages/notfound/NotFound';
import { Playlist } from './pages/playlist/Playlist';
import { ProtectedRoute } from './components/protected-route/ProtectedRoute';
import { AuthPage } from './pages/auth/AuthPage';

export const AppRoutes = ({
  user,
  setUser,
  tracks,
  setTracks,
  currentTrack,
  setCurrentTrack,
  getAllTracksError,
}) => {
  return (

    <Routes>
        <Route path="/register" element={<AuthPage isLoginMode={false}/>} />
        <Route path="/login" element={<AuthPage isLoginMode={true}/>} />
        <Route element={<ProtectedRoute isAllowed={user} />} >
            <Route path='/playlist/:id' element={<Playlist/>} />
            <Route path='/favorites' element={<FavoriteSongs/>} />
            <Route path='/' element={<Main setUser={setUser} tracks={tracks} setTracks={setTracks} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} getAllTracksError={getAllTracksError}/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>

    /* <Routes>


      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main
              setUser={setUser}
              tracks={tracks}
              setTracks={setTracks}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              getAllTracksError={getAllTracksError}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <Playlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoriteSongs />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes> */

  );
};
