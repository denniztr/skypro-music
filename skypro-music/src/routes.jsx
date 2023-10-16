import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components/protected-route/ProtectedRoute';

import { Main } from './pages/main/Main';
import { FavoriteSongs } from './pages/favorites/Favorites';
import { NotFound } from './pages/notfound/NotFound';
import { Playlist } from './pages/playlist/Playlist';
import { AuthPage } from './pages/auth/AuthPage';


export const AppRoutes = ({ getAllTracksError }) => {
  return (
    <Routes>
      <Route path="/register" element={<AuthPage isLoginMode={false} />} />
      <Route path="/login" element={<AuthPage isLoginMode={true} />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route 
          path="/favorites"
          element={<FavoriteSongs/>}
        />
        <Route
          path="/"
          element={
            <Main getAllTracksError={getAllTracksError} />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
