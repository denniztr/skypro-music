import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import authReducer from './authSlice'

export default configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
  },
});
