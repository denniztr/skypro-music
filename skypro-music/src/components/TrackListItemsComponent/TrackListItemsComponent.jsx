import { useState, useEffect } from 'react';

import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

import { useDispatch, useSelector } from 'react-redux';

import { setCurrentTrack, setIsPlaying } from '../../pages/store/playerSlice';

import { addToStarred, unStarred } from '../../pages/store/authSlice';
import { setIsStarred, setTracks } from '../../pages/store/playerSlice';

import { useContext } from 'react';
import { UserContext } from '../../context';

import * as S from './TrackListItems.styles';

export function TrackListItemsComponent() {

  const [user, setUser] = useContext(UserContext);
  const currentUser = user;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const favorites = useSelector((state) => state.player.favTracks);
  const tracks = useSelector((state) => state.player.tracks)
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const starred = useSelector((state) => state.player.starred);

  console.log(tracks);

  // Треки добавляются в избранное

  const starredTrack = (track) => {
    dispatch(addToStarred({ track, accessToken }))
    dispatch(setIsStarred({...track, starred }))
  }

  console.log(tracks.map((track) => track.stared_user.find((user) => user.id === currentUser.id)));
  const toggleStarred = ((track) => {
    if (tracks.map((track) => track.stared_user.find((user) => user.id === currentUser.id))) {
     
      dispatch(addToStarred({ track, accessToken }))
      dispatch(setIsStarred({...track, starred: true}))

    } else {
      console.log('Удаление')
      dispatch(unStarred({ track, accessToken }))
      dispatch(setIsStarred({...track, starred: false}))
    }
  })


  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loading);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };
 
  return (
    <S.ContentPlaylist>
      {tracks.map((track) => {
        return (
          <S.PlaylistItem
            key={track.id}
            onClick={() => {
              dispatch(setCurrentTrack(track));
              dispatch(setIsPlaying(true));
            }}
          >
            <S.PlaylistTrack>
              <S.TrackTitle>
                <S.TrackTitleImage>
                  {currentTrack && currentTrack.id === track.id ? (
                    isPlaying ? (
                      <S.PlayingDot></S.PlayingDot>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                          fill="#B672FF"
                        />
                      </svg>
                    )
                  ) : (
                    <S.TrackTitleSvg alt="music">
                      <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                    </S.TrackTitleSvg>
                  )}
                </S.TrackTitleImage>
                <S.TrackTitleText>
                  {isLoading ? (
                    <LoadingComponent />
                  ) : (
                    <S.TrackTitleLink href="http://">
                      {track.name} <S.TrackTitleSpan></S.TrackTitleSpan>
                    </S.TrackTitleLink>
                  )}
                </S.TrackTitleText>
              </S.TrackTitle>
              <S.TrackAuthor>
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <S.TrackAuthorLink href="http://">
                    {track.author}
                  </S.TrackAuthorLink>
                )}
              </S.TrackAuthor>
              <S.TrackAlbum>
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <S.TrackAlbumLink href="http://">
                    {track.album}
                  </S.TrackAlbumLink>
                )}
              </S.TrackAlbum>
              <S.TrackTime>

                <S.TrackTimeSvg
                  key={track.id} 
                  alt="time" 
                  onClick={(e) => {
                   toggleStarred(track)
                    e.stopPropagation()
                  }}
                  >
                      {track.stared_user.find((user) => user.id === currentUser.id) ? ( 
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.36529 12.751C14.2458 9.25098 17.3111 3.96019 13.9565 1.51832C11.7563 -0.0832586 9.29718 1.19273 8.36529 2.00669H8.34378H8.34372H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34372H8.34378H8.36529Z" fill="#B672FF"/>
                        <path d="M8.34372 2.00669H8.36529C9.29718 1.19273 11.7563 -0.0832586 13.9565 1.51832C17.3111 3.96019 14.2458 9.25098 8.36529 12.751H8.34372M8.34378 2.00669H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34378" stroke="#B672FF"/>
                        </svg> 
                      ) : (
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use> 
                      )}

                    {/* {(track.stared_user ?? []).find((user) => user.id) ? ( 
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.36529 12.751C14.2458 9.25098 17.3111 3.96019 13.9565 1.51832C11.7563 -0.0832586 9.29718 1.19273 8.36529 2.00669H8.34378H8.34372H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34372H8.34378H8.36529Z" fill="#B672FF"/>
                      <path d="M8.34372 2.00669H8.36529C9.29718 1.19273 11.7563 -0.0832586 13.9565 1.51832C17.3111 3.96019 14.2458 9.25098 8.36529 12.751H8.34372M8.34378 2.00669H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34378" stroke="#B672FF"/>
                      </svg> 
                    ) : (
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use> 
                    )} */}

                
                </S.TrackTimeSvg>
                <S.TrackTimeText>
                  {formatTime(track.duration_in_seconds)}
                </S.TrackTimeText>
              </S.TrackTime>
            </S.PlaylistTrack>
          </S.PlaylistItem>
        );
      })}
    </S.ContentPlaylist>
  );
}
