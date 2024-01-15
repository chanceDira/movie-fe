// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { reducer as movieReducer } from './slices/movieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;