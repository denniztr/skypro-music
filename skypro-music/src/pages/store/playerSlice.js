import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_SORT_VALUE } from '../../constants';


export const getPlaylist = createAsyncThunk(
  'player/getPlaylist',
  async function (id, {rejectWithValue, dispatch}) {
    try {
      dispatch(setIsLoading(true))
      const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/selection/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      
      dispatch(setIsLoading(false))
      dispatch(setPlaylist(data))


      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    tracks: [],
    shuffledPlaylist: [],
    shuffled: false,
    currentPlaylist: [],
    favorites: [],
    playlist: [],
    loading: false,
    playlistId: null,
    value: '',
    selectedAuthors: [],
    selectedGenres: [],
    selectedSort: [DEFAULT_SORT_VALUE],
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
    nextTrack: (state) => {
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
    prevTrack: (state) => {
      const selectedTrack = state.currentTrack;
      const selectedPlaylist = state.shuffled
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const selectedTrackId = selectedPlaylist.findIndex(
        (currentTrack) => currentTrack.id === selectedTrack.id
      );
      if (selectedTrackId >= selectedPlaylist.length - 1) {
        state.currentTrack = state.currentPlaylist[0];
      } else {
        state.currentTrack = state.currentPlaylist[selectedTrackId - 1];
      }
    },
    initShuffle: (state) => {
      const shuffledArray = state.currentPlaylist.map((track, index) => ({...track, index}));
      state.shuffledPlaylist = shuffledArray.sort(() => Math.random() - 0.5);
    },
    setShuffled: (state) => {
      state.shuffled = !state.shuffled;
    },
    toggleTrackStarred: (state, action) => {

      const { track, currentUser, paramsId } = action.payload;
      
      if (paramsId) {
       
          const trackIndex = state.playlist.items.findIndex((el) => el.id === track.id);
          const updatedTrack = { ...state.playlist.items[trackIndex] };
          const starred = updatedTrack.stared_user.find((user) => user.id === currentUser.id);
  
          if (starred) {
            updatedTrack.stared_user = updatedTrack.stared_user.filter((user) => user.id !== currentUser.id);
          } else {
            updatedTrack.stared_user.push(currentUser);
          }
          state.playlist.items[trackIndex] = updatedTrack;
        } else {
         const trackIndex = state.tracks.findIndex((el) => el.id === track.id);
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
      state.currentPlaylist = action.payload;
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;  
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    toggleAuthorSelection: (state, action) => {
      const author = action.payload;
      const index = state.selectedAuthors.indexOf(author);
      if (index !== -1) {
        state.selectedAuthors.splice(index, 1);
      } else {
        state.selectedAuthors.push(author);
      }
    },
    toggleSelectedGenres: (state, action) => {
      const genre = action.payload;
      const index = state.selectedGenres.indexOf(genre);
      if (index !== -1) {
        state.selectedGenres.splice(index, 1);
      } else {
        state.selectedGenres.push(genre);
      }
      state.selectedItems = [...state.selectedGenres];
    },
    toggleSelectedSort: (state, action) => {
      const sort = action.payload;
      state.selectedSort = [];
      state.selectedSort.push(sort);
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
  toggleTrackStarred,
  setCurrentPlaylist,
  setIsLoading,
  setFavorites,
  setPlaylist,
  setValue,
  setIsSortByAuthor,
  toggleAuthorSelection,
  setFoundTracksLength,
  setPlaylistId,
  toggleSelectedGenres,
  setToggleSelection,
  toggleSelectedSort,
  setShuffled,
} = playerSlice.actions;
export default playerSlice.reducer;
