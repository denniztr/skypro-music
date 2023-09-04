import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { SignIn } from './pages/signin/SignIn';
import { SignUp } from './pages/signup/SignUp';
import { FavoriteSongs } from './pages/favorites/Favorites';
import { NotFound } from './pages/notfound/NotFound';
import { Playlist } from './pages/playlist/Playlist';
import { ProtectedRoute } from './components/protected-route/ProtectedRoute';

export const AppRoutes = ({ setUser, onAuthButtonClick }) => {

  return (
    <Routes>

      <Route path="/signin" element={<SignIn onAuthButtonClick={onAuthButtonClick} />}  />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={ <ProtectedRoute> <Main setUser={setUser}/> </ProtectedRoute> } />
      <Route path="/playlist/:id" element={ <ProtectedRoute> <Playlist/>  </ProtectedRoute> }/>
      <Route path="/favorites" element={ <ProtectedRoute> <FavoriteSongs/> </ProtectedRoute>  } />
      <Route path="*" element={<NotFound />} />
      
        {/* <Route element={<ProtectedRoute isAllowed={Boolean(user)}/>} >
            <Route path="/" element={<Main />} />
            <Route path="/playlist/:id" element={ <Playlist/> }/>
            <Route path="/favorites" element={ <FavoriteSongs/> } />
        </Route> */}

    </Routes>
  );
};
