import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth/authSlice';
import userSlice from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});