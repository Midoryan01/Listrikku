import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API_URL = "http://localhost:5000";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      console.log("Sending login request...");
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Login error response:", error.response.data);
        return rejectWithValue(error.response.data.msg);
      }
      console.error("Network error:", error);
      return rejectWithValue("Network Error");
    }
  }
);

// Async thunk to fetch current user data
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token || localStorage.getItem("token"); // Cek token dari state atau localStorage
    if (!token) {
      return rejectWithValue("No token available");
    }

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pastikan token ada di header
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
      const response = await axios.delete(`${API_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Kirim token untuk logout
        },
      });
      localStorage.removeItem("token"); // Hapus token setelah logout berhasil
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
  token: localStorage.getItem("token"),  // Ambil token dari localStorage
  role: null,
  status: "idle",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
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
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          id: action.payload.id_pelanggan || action.payload.id_user,
          username: action.payload.username,
          nama_pelanggan: action.payload.nama_pelanggan || null,
          alamat: action.payload.alamat || null,
          nomor_kwh: action.payload.nomor_kwh || null,
          id_tarif: action.payload.id_tarif || null,
        };
        state.token = action.payload.token;
        // Menetapkan role berdasarkan id_level atau data lain
        state.role = action.payload.id_level === 1 ? "admin" : "pelanggan";
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        // Menetapkan role berdasarkan id_level atau data lain
        state.role = action.payload.id_level === 1 ? "admin" : "pelanggan";
        state.isError = false;
        state.message = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.isError = true;
        state.message = action.payload;
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
