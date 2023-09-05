import React, { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { Link } from 'react-router-dom';
import * as S from './Playlist.styles';

export default function PlayListComponent({ playlists }) {
  const playlistLinkStyle = {
    width: '100%',
    height: '100%',
    display: 'inline-block',
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loading);
  }, []);

  return (
    <S.SidebarList>
      <S.SidebarItem>
        {playlists.map((playlist) => (
          <Link
            style={playlistLinkStyle}
            to={`/playlist/${playlist.id}`}
            key={playlist.id}
          >
            <S.SidebarImg src={playlist.img} alt={playlist.alt} />
          </Link>
        ))}
      </S.SidebarItem>
    </S.SidebarList>
  );
}

{
  /* <Link to="/playlist">
{isLoading ? (
  <LoadingComponent />
) : (
  <S.SidebarImg src="./img/playlist01.png" alt="day's playlist" />
)}
</Link>
</S.SidebarItem>
<S.SidebarItem>
<Link to="/playlist">
{isLoading ? (
  <LoadingComponent />
) : (
  <S.SidebarImg src="./img/playlist02.png" alt="day's playlist" />
)}
</Link>
</S.SidebarItem>
<S.SidebarItem>
<Link to="/playlist">
{isLoading ? (
  <LoadingComponent />
) : (
  <S.SidebarImg src="./img/playlist03.png" alt="day's playlist" />
)}
</Link> */
}
