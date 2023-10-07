import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getToken = createAsyncThunk(
  'auth/getToken',
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        'https://skypro-music-api.skyeng.tech/user/token/',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('an Error occurred in getToken function');

      const data = await response.json();
      const accessToken = data.access;
      const refreshToken = data.refresh;

      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(getFavoriteTracks(accessToken));

      window.localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateToken = createAsyncThunk(
  'auth/updateToken',
  async function (refreshToken, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        'https://skypro-music-api.skyeng.tech/user/token/refresh/',
        {
          method: 'POST',
          body: JSON.stringify({
            refresh: refreshToken,
          }),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      if (!response.ok)
        throw new Error('an Error occurred in updateToken function');

      const data = await response.json();
      const updatedAccessToken = data.access;

      dispatch(getFavoriteTracks(updatedAccessToken));
      
      return updatedAccessToken;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFavoriteTracks = createAsyncThunk(
  'auth/getFavoriteTracks',
  async function (accessToken, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        'https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`, //token!
          },
        }
      );
      const data = await response.json();
      dispatch(setFavTracks({ data }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    favTracks: [{}],
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setFavTracks: (state, action) => {
      state.favTracks = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setFavTracks } =
  authSlice.actions;
export default authSlice.reducer;
