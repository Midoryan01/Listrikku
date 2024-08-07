import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API_URL = "http://localhost:5000";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.msg);
      }
      return rejectWithValue("Network Error");
    }
  }
);

// Async thunk to fetch current user data
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) {
      return rejectWithValue("No token available");
    }

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is included in headers
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.msg);
      }
      return rejectWithValue("Network Error");
    }
  }
);

// Async thunk for logout
export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token"); // Clear the token from local storage
      const response = await axios.delete(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.msg);
      }
      return rejectWithValue("Network Error");
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"), // Retrieve token from local storage
  role: null,
  status: "idle",
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.status = "idle";
      });
  },
});

// Export the reset action
export const { reset } = authSlice.actions;

export default authSlice.reducer;
