import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const initialState = {
  users: [],
  currentPage: 1,
  totalPages: null,
  isLoading: false,
  status: null,
};

export const getUsers = createAsyncThunk('users/getUsers', async (currentPage) => {
  try {
    const { data } = await axios.get(`/users?page=${currentPage}&count=6`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage(state) {
      state.currentPage++;
    },
    setStateCleaning(state) {
      state.users = [];
      state.currentPage = 1;
      state.totalPages = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Get Users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(...action.payload.users);
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.status = action.payload.success;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.success;
    });
  },
});

export const { setCurrentPage, setStateCleaning } = userSlice.actions;

export default userSlice.reducer;
