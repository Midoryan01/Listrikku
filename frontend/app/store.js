import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
