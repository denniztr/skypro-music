import { createSlice, current } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    tracks: [{}],
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
        const selectedTrack = state.currentTrack;
        const selectedPlaylist = state.tracks;
        const selectedTrackId = selectedPlaylist.findIndex((currentTrack) => currentTrack.id === selectedTrack.id);
        if (selectedTrackId >= selectedPlaylist.length - 1 ) {
            state.currentTrack = state.tracks[0];
        } else {
            state.currentTrack = state.tracks[selectedTrackId + 1]
        }
    },
    prevTrack: (state, action) => {
        const selectedTrack = state.currentTrack;
        const selectedPlaylist = state.tracks;
        const selectedTrackId = selectedPlaylist.findIndex((currentTrack) => currentTrack.id === selectedTrack.id);
        if (selectedTrackId >= selectedPlaylist.length - 1) {
            state.currentTrack = state.tracks[0];
        } else {
            state.currentTrack = state.tracks[selectedTrackId - 1]
        }
    },
  },
});

export const { setCurrentTrack, setIsPlaying, setTracks, nextTrack, prevTrack } = playerSlice.actions;
export default playerSlice.reducer;
