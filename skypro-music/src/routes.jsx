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
  getAllTracksError,
}) => {
  return (

    <Routes>
        <Route path="/register" element={<AuthPage isLoginMode={false}/>} />
        <Route path="/login" element={<AuthPage isLoginMode={true}/>} />
        <Route element={<ProtectedRoute isAllowed={user} />} >
            <Route path='/playlist/:id' element={<Playlist/>} />
            <Route path='/favorites' element={<FavoriteSongs setUser={setUser} tracks={tracks}/>} />
            <Route path='/' element={<Main setUser={setUser} tracks={tracks} setTracks={setTracks} getAllTracksError={getAllTracksError}/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>

  );
};
