import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    tracks: [],
    shuffledPlaylist: [{}],
    shuffled: false,
    starred: false,
    favTracks: [],
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setTracks: (state, action) => {
      const updatedArray = action.payload.map((track) => ({
        ...track,
        starred: state.starred,
      }));
      state.tracks = updatedArray
      console.log(state.tracks);
    },
    nextTrack: (state, action) => {
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
        state.currentTrack = state.tracks[selectedTrackId + 1];
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
    setIsStarred: (state, action) => {
      state.starred = action.payload.starred;
      state.tracks = state.tracks.map((track) => {
        if (track.id === action.payload.id)
          return {
          ...track, 
          starred: state.starred,
        }
        return track
      })
    },
    setFavTracks: (state, action) => {
      // const favorites = action.payload.data.map((track) => {
      //   const matchingTracks = state.tracks.find((matchingTrack => matchingTrack.id === track.id));
      //   if (matchingTracks) {
      //     return {...matchingTracks, starred: track.starred }
      //   }
      //   return state.tracks
      // })
      // state.tracks = favorites;

      const favorites = action.payload.data.map((track) => ({
        ...track,
        starred: state.starred,
      }))
      state.tracks = favorites;

    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setTracks,
  nextTrack,
  prevTrack,
  initShuffle,
  setIsStarred,
  setFavTracks,
} = playerSlice.actions;
export default playerSlice.reducer;
