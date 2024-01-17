// redux/slices/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk, ThunkAction, Action, AsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import Notify from '../../utils/Notify';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login: AsyncThunk<any, { email: string; password: string }, {}> = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, { email, password });
    return response.data;
  }
);

export const signup: AsyncThunk<any, { name: string, email: string; password: string, role: string }, {}> = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, role }) => {

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, { name, email, password, role });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;

export type AuthThunk = ThunkAction<void, RootState, unknown, Action<string>>;
