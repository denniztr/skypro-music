import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import * as S from './AudioPlayer.styles';
const PrevSvg = './prev.svg';

export function AudioPlayer() {
  const currentTrack = useSelector((state) => state.tracks.currentTrack);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [looping, setLooping] = useState(false);

  const audioRef = useRef(null);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      console.log(currentTrack);
      handleStart();
    }
  }, [currentTrack]);

  const togglePlay = isPlaying ? handleStop : handleStart;

  const setVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !looping;
      setLooping(!looping);
    }
  };

  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const aintReadyYet = () => {
    if (aintReadyYet) {
      audioRef.current.pause();
      alert('Ещё не реализовано');
    }
    audioRef.current.play();
  };

  const formatTime = (decimalNumber) => {
    const wholeNumber = Math.floor(decimalNumber);
    const minutes = Math.floor(wholeNumber / 60);
    const seconds = wholeNumber % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <audio
        controls
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        src={currentTrack.track_file}
      />

      <S.Bar>
        <S.BarContent>
          <S.BarPlayerTime>
            {formatTime(currentTime)} / {formatTime(audioRef.current?.duration)}
          </S.BarPlayerTime>
          <ProgressBar
            currentTime={currentTime}
            setCurrentTime={handleSeek}
            barDuration={audioRef.current?.duration}
            formatTime={formatTime}
          />

          <S.BarPlayerBlock>
            <S.BarPlayer>
              <S.PlayerControls>
                <S.PlayerButtonPrev>
                  <S.PlayerButtonPrevSvg
                    src={PrevSvg}
                    alt="prev"
                    onClick={aintReadyYet}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                  </S.PlayerButtonPrevSvg>
                </S.PlayerButtonPrev>
                <S.PlayerButtonPlay className="_btn" onClick={togglePlay}>
                  {isPlaying ? (
                    <S.PlayerButtonPlaySvg alt="play">
                      <svg
                        width="15"
                        height="19"
                        viewBox="0 0 15 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="5" height="19" fill="#D9D9D9" />
                        <rect x="10" width="5" height="19" fill="#D9D9D9" />
                      </svg>
                    </S.PlayerButtonPlaySvg>
                  ) : (
                    <S.PlayerButtonPlaySvg alt="play">
                      <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                    </S.PlayerButtonPlaySvg>
                  )}
                </S.PlayerButtonPlay>
                <S.PlayerButtonNext>
                  <S.PlayerButtonNextSvg
                    style={{ cursor: 'pointer' }}
                    alt="next"
                    onClick={aintReadyYet}
                  >
                    <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                  </S.PlayerButtonNextSvg>
                </S.PlayerButtonNext>
                <S.PlayerButtonRepeat
                  className="_btn-icon"
                  onClick={toggleLoop}
                >
                  {looping ? (
                    <S.PlayerButtonRepeatSvgActive>
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerButtonRepeatSvgActive>
                  ) : (
                    <S.PlayerButtonRepeatSvg alt="repeat">
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerButtonRepeatSvg>
                  )}
                </S.PlayerButtonRepeat>
                <S.PlayerButtonShuffle
                  className="_btn-icon"
                  onClick={aintReadyYet}
                >
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
                    <S.TrackPlayAuthorLink href="http://">
                      {currentTrack.name}
                    </S.TrackPlayAuthorLink>
                  </S.TrackPlayAuthor>
                  <S.TrackPlayAlbum>
                    <S.TrackPlayAlbumLink href="http://">
                      {currentTrack.author}
                    </S.TrackPlayAlbumLink>
                  </S.TrackPlayAlbum>
                </S.TrackPlayContain>
                <S.TrackPlayLikeDis>
                  <S.TrackPlayLikeButton
                    className="_btn-icon"
                    onClick={aintReadyYet}
                  >
                    <S.TrackPlayLikeSvg alt="like">
                      <use xlinkHref="../img/icon/sprite.svg#icon-like"></use>
                    </S.TrackPlayLikeSvg>
                  </S.TrackPlayLikeButton>
                  <S.TrackPlayDislikeButton
                    className="_btn-icon"
                    onClick={aintReadyYet}
                  >
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
                  <S.VolumeProgressLine
                    className="_btn"
                    type="range"
                    name="range"
                    min="0"
                    max="1"
                    step="0.02"
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </S.VolumeProgress>
              </S.VolumeContent>
            </S.BarVolumeBlock>
          </S.BarPlayerBlock>
        </S.BarContent>
      </S.Bar>
    </>
  );
}
