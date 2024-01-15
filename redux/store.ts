// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { reducer as movieReducer } from './slices/movieSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;