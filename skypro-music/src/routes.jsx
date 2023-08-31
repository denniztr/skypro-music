import { Routes, Route } from "react-router-dom";
import { Main }  from "./pages/main/Main";
import { SignIn } from "./pages/signin/SignIn";
import { SignUp } from "./pages/signup/SignUp";
import { FavoriteSongs } from "./pages/favorites/Favorites";
import { NotFound } from "./pages/notfound/NotFound";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Main /> }/>
            <Route path="/signin" element={ <SignIn />}/>
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/favorites" element={ <FavoriteSongs /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}