import { useState, useEffect } from 'react';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

import { useDispatch, useSelector } from 'react-redux';
// import { setCurrentTrack } from '../../pages/store/trackSlice';
import { setCurrentTrack, setIsPlaying  } from '../../pages/store/playerSlice';

import * as S from './TrackListItems.styles';

export function TrackListItemsComponent() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const tracks = useSelector((state) => state.player.tracks)
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const isPlaying = useSelector((state) => state.player.isPlaying);

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
                <S.TrackTimeSvg alt="time">
                  <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
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
