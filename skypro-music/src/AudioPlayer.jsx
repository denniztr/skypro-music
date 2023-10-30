import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from './context';
import { useContext } from 'react';

import {
  setIsPlaying,
  nextTrack,
  prevTrack,
  initShuffle,
  toggleTrackStarred,
  setShuffled,
} from './pages/store/playerSlice';

import { unStarred, addToStarred } from './pages/store/authSlice';

import ProgressBar from './ProgressBar';
import * as S from './AudioPlayer.styles';

const PrevSvg = './prev.svg';


export function AudioPlayer() {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const [user] = useContext(UserContext);
  const currentUser = user;


  const currentTrack = useSelector((state) => state.player.currentTrack);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isShuffle = useSelector((state) => state.player.shuffled);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentPlaylist = useSelector((state) => state.player.currentPlaylist);

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
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
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
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </S.PlayerButtonPlaySvg>
                  )}
                </S.PlayerButtonPlay>
                <S.PlayerButtonNext>
                  <S.PlayerButtonNextSvg
                    style={{ cursor: 'pointer' }}
                    alt="next"
                    onClick={() => dispatch(nextTrack())}
                  >
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                  </S.PlayerButtonNextSvg>
                </S.PlayerButtonNext>
                <S.PlayerButtonRepeat
                  className="_btn-icon"
                  onClick={toggleLoop}
                >
                  {looping ? (
                    <S.PlayerButtonRepeatSvgActive>
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerButtonRepeatSvgActive>
                  ) : (
                    <S.PlayerButtonRepeatSvg alt="repeat">
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </S.PlayerButtonRepeatSvg>
                  )}
                </S.PlayerButtonRepeat>
                <S.PlayerButtonShuffle
                  className="_btn-icon"
                  onClick={() => {
                    dispatch(initShuffle())
                    dispatch(setShuffled())
                  }}
                >
                  {isShuffle ? (
                    <S.PlayerButtonShuffleSvgActive>
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                    </S.PlayerButtonShuffleSvgActive>
                  ) : (
                    <S.PlayerButtonShuffleSvg alt="shuffle">
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
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
                  className={`_btn-icon ${isLiked ? "like-animation" : ""}`} 
                  onClick={(e) => {
                    dispatch(addToStarred({ track: currentTrack, accessToken }));
                    dispatch(toggleTrackStarred({ track: currentTrack, currentUser }));
                    setIsLiked(true)
                    setTimeout(() => {
                      setIsLiked(false)
                    }, 750);
                    e.stopPropagation()
                }}
                >

                  <S.TrackPlayLikeSvg alt="like">
                    <svg  viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.36529 12.751C14.2458 9.25098 17.3111 3.96019 13.9565 1.51832C11.7563 -0.0832586 9.29718 1.19273 8.36529 2.00669H8.34378H8.34372H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34372H8.34378H8.36529Z" fill="#B672FF"/>
                      <path d="M8.34372 2.00669H8.36529C9.29718 1.19273 11.7563 -0.0832586 13.9565 1.51832C17.3111 3.96019 14.2458 9.25098 8.36529 12.751H8.34372M8.34378 2.00669H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34378" stroke="#B672FF"/>
                    </svg> 
                  </S.TrackPlayLikeSvg>

                </S.TrackPlayLikeButton>
                <S.TrackPlayDislikeButton className="_btn-icon" onClick={(e) => {
                  dispatch(unStarred({ track: currentTrack, accessToken }));
                  dispatch(toggleTrackStarred({ track: currentTrack, currentUser }));
                  e.stopPropagation()
                }}>
                  <S.TrackPlayDislikeSvg alt="dislike" >
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
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
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
