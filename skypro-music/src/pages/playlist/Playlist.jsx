import { useParams } from 'react-router-dom';
import { PLAYLISTS } from '../../constants';

import './Playlist.css';

export const Playlist = () => {
    const params = useParams();
    const playlist = PLAYLISTS.find((playlist) => playlist.id === Number(params.id));

    return (
    <>
        <div className='playlist__container'>
                <a href="../">
                    <div className="modal__logo fav__logo">
                        <img className='playlist__logo-src' src="../logo.png" alt="logo" />
                    </div>
                </a>
            <div className="playlist">
                <h3 className='playlist__title' >{playlist.title}</h3>
            </div>
        </div>
    </>
    )
}