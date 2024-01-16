// redux/movieSlice.ts
import { createSlice, PayloadAction, createAsyncThunk, AsyncThunkAction, AsyncThunk, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface Movie {
  _id: string;
  title: string;
  year: number | string;
  image: string;
  createdAt: string;
}

interface MovieV2 {
  title: string;
  year: number | string;
  image: string;
}

interface UpdateMovieParams {
  id: string;
  movie: MovieV2;
}


interface MovieState {
  data: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchMovies: AsyncThunk<any, void, {}> = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
    return response.data;
  }
);

export const postMovie = createAsyncThunk('movies/postMovie', async (movie: MovieV2) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to post movie');
  }

  return response.json();
});



export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`);
  return response;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movie }: UpdateMovieParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update movie');
  }

  return response.json();
});


const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    clearMovies: (state) => {
      state.data = [];
    },
    addMovie: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { actions, reducer } = movieSlice;
//   export type AppThunk = AsyncThunkAction<any, void, any>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

