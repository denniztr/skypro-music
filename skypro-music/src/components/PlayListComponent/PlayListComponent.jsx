import React, { useState, useEffect } from 'react';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { Link } from 'react-router-dom';
import * as S from './Playlist.styles';
import { useDispatch, useSelector } from 'react-redux';

export function PlayListComponent({ playlists }) {
  const playlistLinkStyle = {
    width: '100%',
    height: '100%',
    display: 'inline-block',
  };

  const dispatch = useDispatch();

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