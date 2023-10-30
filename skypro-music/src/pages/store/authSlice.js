import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setFavorites, getPlaylist } from './playerSlice';

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

      if (!response.ok) throw new Error('an Error occurred in updateToken function');

      const data = await response.json();
      
      const updatedAccessToken = data.access;
      dispatch(setAccessToken(updatedAccessToken));

      dispatch(getFavoriteTracks(updatedAccessToken));

      return updatedAccessToken;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFavoriteTracks = createAsyncThunk(
  'auth/getFavoriteTracks',
  async function (accessToken, { rejectWithValue, dispatch, getState }) {
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
      const store = getState();

      const transformData = data.map((el) => {
        return {
          ...el,
          stared_user: [{
            email: store.auth.user.email,
            first_name: '',
            id: store.auth.user.id,
            username: store.auth.user.username,
          }]
        }
      })

      dispatch(setFavorites(transformData))

      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToStarred = createAsyncThunk(
  'auth/addToStarred',
  async function({track, accessToken}, { rejectWithValue, dispatch, getState }) {
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

      return data;
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

      dispatch(getFavoriteTracks(accessToken))

      dispatch(setIsLoading(false))

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserRed: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: {
    [getFavoriteTracks.pending]: (state) => {
      state.loading = true;
    },
    [getFavoriteTracks.fulfilled]: (state) => {
      state.loading = false;
    },
    [getFavoriteTracks.rejected]: (state) => {
      state.loading = false;
    },
  }
});

export const { setAccessToken, setRefreshToken, setUserRed, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
