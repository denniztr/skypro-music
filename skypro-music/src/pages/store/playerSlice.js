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
      console.log(action.payload)
      // const trackId = action.payload.id;
      // const starred = action.payload.starred;
      // state.tracks = state.tracks.map((track) => {
      //   if (track.id === trackId) {
      //     return {
      //       ...track,
      //       starred: starred,
      //     }
      //   }
      //   return track
      // })
      const starred = !action.payload.starred;
      const trackId = action.payload.id;
      const stared_user = action.payload.stared_user;
      console.log(stared_user);
      state.tracks = state.tracks.map((track) => {
      
        if (track.id === trackId) {
          return {
            ...track,
            starred: starred,
          };
        }
        return track;
      });

    },
    setFavTracks: (state, action) => {
      // state.favTracks = action.payload.data;
      const favorites = action.payload.data.map((track) => ({
        ...track,
        starred: true,
      }))
      state.favTracks = favorites
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
