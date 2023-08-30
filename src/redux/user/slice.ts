import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_HOST } from '../api';

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (params: { email: string, password: string }, thunkAPI) => {
    const { data } = await axios.post(`${API_HOST}/auth/signin/`, {
      email: params.email,
      password: params.password,
    });
    return data.token;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      state.error = null;
      state.loading = false;  
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
