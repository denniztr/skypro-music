import { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as S from './AudioPlayer.styles'
const PrevSvg = './prev.svg';

export default function AudioPlayerComponent () {
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loading);
  }, []);

  return (
    <S.Bar>
      <S.BarContent>
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <S.PlayerControls>
              <S.PlayerButtonPrev>
                <S.PlayerButtonPrevSvg src={PrevSvg} alt="prev">
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </S.PlayerButtonPrevSvg>
              </S.PlayerButtonPrev>
              <S.PlayerButtonPlay className="_btn">
                <S.PlayerButtonPlaySvg alt="play">
                  <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                </S.PlayerButtonPlaySvg>
              </S.PlayerButtonPlay>
              <S.PlayerButtonNext>
                <S.PlayerButtonNextSvg alt="next">
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </S.PlayerButtonNextSvg>
              </S.PlayerButtonNext>
              <S.PlayerButtonRepeat className="_btn-icon">
                <S.PlayerButtonRepeatSvg alt="repeat">
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </S.PlayerButtonRepeatSvg>
              </S.PlayerButtonRepeat>
              <S.PlayerButtonShuffle className="_btn-icon">
                <S.PlayerButtonShuffleSvg alt="shuffle">
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </S.PlayerButtonShuffleSvg>
              </S.PlayerButtonShuffle>
            </S.PlayerControls>
            <S.PlayerTrackPlay>
              <S.TrackPlayContain>
                <S.TrackPlayImage>
                  <S.TrackPlaySvg alt="music">
                    <use xlinkHref="../img/icon/sprite.svg#icon-note"></use>
                  </S.TrackPlaySvg>
                </S.TrackPlayImage>
                <S.TrackPlayAuthor>
                {isLoading ? (
                <LoadingComponent />
                ) : (
                  <S.TrackPlayAuthorLink href="http://">
                    Ты та...
                  </S.TrackPlayAuthorLink>
                )}
                </S.TrackPlayAuthor>
                <S.TrackPlayAlbum>
                {isLoading ? (
                <LoadingComponent />
                ) : (
                  <S.TrackPlayAlbumLink href="http://">
                    Баста
                  </S.TrackPlayAlbumLink>
                )}
              </S.TrackPlayAlbum>
              </S.TrackPlayContain>
              <S.TrackPlayLikeDis>
                <S.TrackPlayLikeButton className="_btn-icon">
                  <S.TrackPlayLikeSvg alt="like">
                    <use xlinkHref="../img/icon/sprite.svg#icon-like"></use>
                  </S.TrackPlayLikeSvg>
                </S.TrackPlayLikeButton>
                <S.TrackPlayDislikeButton className="_btn-icon">
                  <S.TrackPlayDislikeSvg alt="dislike">
                    <use xlinkHref="../img/icon/sprite.svg#icon-dislike"></use>
                  </S.TrackPlayDislikeSvg>
                </S.TrackPlayDislikeButton>
              </S.TrackPlayLikeDis>
            </S.PlayerTrackPlay>
          </S.BarPlayer>
          <S.BarVolumeBlock>
            <S.VolumeContent>
              <S.VolumeImage>
                <S.VolumeSvg alt="volume">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </S.VolumeSvg>
              </S.VolumeImage>
              <S.VolumeProgress>
                <S.VolumeProgressLine className="_btn" type="range" name="range" />
              </S.VolumeProgress>
            </S.VolumeContent>
          </S.BarVolumeBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
};
