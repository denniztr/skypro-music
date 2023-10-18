import { createSlice, current } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    tracks: [],
    shuffledPlaylist: [{}],
    shuffled: false,
    currentPlaylist: [],
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    nextTrack: (state, action) => {
      
      // const selectedTrack = state.currentTrack;
      
      // const selectedPlaylist = state.shuffled ? state.shuffledPlaylist : state.tracks;

      // const selectedTrackId = selectedPlaylist.findIndex(
      //   (currentTrack) => currentTrack.id === selectedTrack.id
      // );
      

      // if (selectedTrackId >= selectedPlaylist.length - 1) {
      //   state.currentTrack = state.tracks[0];
      // } else {
      //   state.currentTrack = state.tracks[selectedTrackId + 1];
      // }
      const selectedTrack = state.currentTrack;
      
      const selectedPlaylist = state.shuffled ? state.shuffledPlaylist : state.currentPlaylist;

      const selectedTrackId = selectedPlaylist.findIndex(
        (currentTrack) => currentTrack.id === selectedTrack.id
      );
      

      if (selectedTrackId >= selectedPlaylist.length - 1) {
        state.currentTrack = state.currentPlaylist[0];
      } else {
        state.currentTrack = state.currentPlaylist[selectedTrackId + 1];
      }
    },
    prevTrack: (state, action) => {
      const selectedTrack = state.currentTrack;
      const selectedPlaylist = state.shuffled
        ? state.shuffledPlaylist
        : state.tracks;
      const selectedTrackId = selectedPlaylist.findIndex(
        (currentTrack) => currentTrack.id === selectedTrack.id
      );
      if (selectedTrackId >= selectedPlaylist.length - 1) {
        state.currentTrack = state.tracks[0];
      } else {
        state.currentTrack = state.tracks[selectedTrackId - 1];
      }
    },
    initShuffle: (state, action) => {
      state.shuffled = !state.shuffled;
      const shuffledArray = state.tracks.map((track, index) => ({...track, index}));
      state.shuffledPlaylist = shuffledArray.sort(() => Math.random() - 0.5);
    },
    toggleTrackStarred: (state, action) => {
      const { track, currentUser } = action.payload;
      const trackIndex = state.tracks.findIndex((el) => el.id === track.id);

      if (trackIndex !== -1) {
        const updatedTrack = { ...state.tracks[trackIndex] };
        const starred = updatedTrack.stared_user.find((user) => user.id === currentUser.id);
        
        if (starred) {
          updatedTrack.stared_user = updatedTrack.stared_user.filter((user) => user.id !== currentUser.id);
        } else {
          updatedTrack.stared_user.push(currentUser);
        }
        
        state.tracks[trackIndex] = updatedTrack;
      }
    },
    setCurrentPlaylist: (state, action) => {
      // state.tracks = action.payload;
      state.currentPlaylist = action.payload;
      console.log(state.currentPlaylist)
    }
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setTracks,
  nextTrack,
  prevTrack,
  initShuffle,
  toggleTrackStarred,
  setCurrentPlaylist,
} = playerSlice.actions;
export default playerSlice.reducer;
