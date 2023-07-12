import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axios from '../../../utils/axios';

const initialState = {
  positions: [],
  token: null,
  isLoading: false,
  isPendingRequest: false,
  status: null,
};

export const getPositions = createAsyncThunk('auth/positions', async () => {
  const { data } = await axios.get('/positions');

  return data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async ({ formData, token }) => {
  try {
    const { data } = await axios.post('/users', formData, { headers: { Token: token } });

    return data;
  } catch (error) {
    if (!error.response.data.status) {
      toast.error(error.response.data.message);
    }
  }
});

export const getMeToken = createAsyncThunk('auth/getMeToken', async () => {
  const { data } = await axios.get('/token');

  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatusDefault(state) {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Get Positions
    builder.addCase(getPositions.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.positions = action.payload.positions;
      state.status = null;
    });
    builder.addCase(getPositions.rejected, (state) => {
      state.isLoading = false;
    });

    // Get Me Token
    builder.addCase(getMeToken.fulfilled, (state, action) => {
      state.token = action.payload?.token;
    });

    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.isPendingRequest = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isPendingRequest = false;
      state.status = action.payload?.success;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isPendingRequest = false;
    });
  },
});

export const { setStatusDefault } = authSlice.actions;

export default authSlice.reducer;
