import { createSlice } from '@reduxjs/toolkit';

const tracksSlice = createSlice({
  name: 'tracks',
  initialState: {
    currentTrack: null,
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = tracksSlice.actions;
export default tracksSlice.reducer;
