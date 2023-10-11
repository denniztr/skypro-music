import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setIsStarred, setFavTracks } from './playerSlice';

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
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      dispatch(setFavTracks({data}));
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToStarred = createAsyncThunk(
  'auth/addToStarred',
  async function({track, accessToken}, { rejectWithValue, dispatch }) {
    // const trackId = getState().player.tracks.find(track => track.id === id); // Трек, добавленный в избранное
    
    try {
      const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${track.id}/favorite/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (!response.ok) {
        throw new Error('Cant toggle like. Server error.');
    }
       const data = await response.json();
       console.log(data);
        // dispatch(setIsStarred({...track, starred: true}))

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const unStarred = createAsyncThunk(
  'auth/unStarred',
  async function({track, accessToken}, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${track.id}/favorite/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      const data = await response.json()
       console.log(data)
        // dispatch(setIsStarred({...track, starred: false}))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    // favTracks: [],
    // starred: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    // setFavTracks: (state, action) => {
    //   const updatedArray = action.payload.data.map((track) => ({
    //     ...track,
    //     starred: true,
    //   }))
    //   state.favTracks = updatedArray;
    //   // console.log(state.favTracks);
    //   // state.favTracks = action.payload.data;
    //   // console.log(state.favTracks);
    // },
    // setIsStarred: (state, action) => {  
    //   // state.starred = action.payload;
    //   // console.log(state.starred);
    //   const isStarred = state.favTracks.some((track) => track.id === action.payload.id);
    //   state.starred = isStarred
    // }
  },
});

export const { setAccessToken, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
