import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsPlaying,
  nextTrack,
  prevTrack,
  initShuffle,
  toggleTrackStarred,
} from './pages/store/playerSlice';
import { unStarred, addToStarred  } from './pages/store/authSlice';

import { useContext } from 'react';
import { UserContext } from './context';

import ProgressBar from './ProgressBar';
import * as S from './AudioPlayer.styles';

const PrevSvg = './prev.svg';

export function AudioPlayer() {
  const dispatch = useDispatch();

  const [user] = useContext(UserContext);
  const currentUser = user;
 

  const currentTrack = useSelector((state) => state.player.currentTrack);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isShuffle = useSelector((state) => state.player.shuffled);
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  const currentPlaylist = useSelector((state) => state.player.currentPlaylist);
  const tracks = useSelector((state) => state.player.tracks);

  const [currentTime, setCurrentTime] = useState(0);
  const [looping, setLooping] = useState(false);

  const audioRef = useRef(null);
  
  useEffect(() => {
    const handleTrackEnded = () => dispatch(nextTrack());
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleTrackEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnded);
      }
    };
  }, [audioRef, dispatch]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlaying(false));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
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

  const formatTime = (decimalNumber) => {
    const wholeNumber = Math.floor(decimalNumber);
    const minutes = Math.floor(wholeNumber / 60);
    const seconds = wholeNumber % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleStarred = (track) => {
    try {
      if (track.stared_user.some((user) => user.id === currentUser.id)) {
        dispatch(unStarred({ track, accessToken }));
      } else {
        dispatch(addToStarred({ track, accessToken }));
      }
      dispatch(toggleTrackStarred({ track, currentUser }));
    } catch (error) {
      console.error(error.message);
    }
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
                    style={{ cursor: 'pointer' }}
                    src={PrevSvg}
                    alt="prev"
                    onClick={() => dispatch(prevTrack())}
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
                    onClick={() => dispatch(nextTrack())}
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
                  onClick={() => dispatch(initShuffle())}
                >
                  {isShuffle ? (
                    <S.PlayerButtonShuffleSvgActive>
                      <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                    </S.PlayerButtonShuffleSvgActive>
                  ) : (
                    <S.PlayerButtonShuffleSvg alt="shuffle">
                      <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                    </S.PlayerButtonShuffleSvg>
                  )}
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
                      {currentTrack.album}
                    </S.TrackPlayAlbumLink>
                  </S.TrackPlayAlbum>
                </S.TrackPlayContain>
                <S.TrackPlayLikeDis>

                  <S.TrackPlayLikeButton
                    className="_btn-icon"
                    onClick={() => {
                      toggleStarred(currentTrack)
                    }}
                   
                  >
                    <S.TrackPlayLikeSvg alt="like">
                      {currentTrack.stared_user.find((user) => user.id === currentUser.id
                        ) ? (
                        <svg width="14.34" height="13" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.02203 12.7031C13.9025 9.20312 16.9678 3.91234 13.6132 1.47046C11.413 -0.13111 8.95392 1.14488 8.02203 1.95884H8.00052H8.00046H7.97895C7.04706 1.14488 4.58794 -0.13111 2.38775 1.47046C-0.966814 3.91234 2.09846 9.20312 7.97895 12.7031H8.00046H8.00052H8.02203Z" fill="#B672FF"/>
                          <path d="M8.00046 1.95884H8.02203C8.95392 1.14488 11.413 -0.13111 13.6132 1.47046C16.9678 3.91234 13.9025 9.20312 8.02203 12.7031H8.00046M8.00052 1.95884H7.97895C7.04706 1.14488 4.58794 -0.13111 2.38775 1.47046C-0.966814 3.91234 2.09846 9.20312 7.97895 12.7031H8.00052" stroke="#B672FF"/>
                        </svg> 
                      ) : (
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      )}
                    </S.TrackPlayLikeSvg>
                   </S.TrackPlayLikeButton>
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
