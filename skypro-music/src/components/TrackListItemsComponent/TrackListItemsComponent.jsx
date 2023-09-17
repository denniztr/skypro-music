import { useState, useEffect } from 'react';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import * as S from './TrackListItems.styles';

export function TrackListItemsComponent({
  tracks,
  setCurrentTrack,
  getAllTracksError,
}) {
  const [isLoading, setIsLoading] = useState(true);

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
          <S.PlaylistItem key={track.id} onClick={() => setCurrentTrack(track)}>
            <S.PlaylistTrack>
              <S.TrackTitle>
                <S.TrackTitleImage>
                  <S.TrackTitleSvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </S.TrackTitleSvg>
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