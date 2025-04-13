// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}auth`;

// 📌 Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7 });

      const decoded = jwtDecode(token);
      return { token, user: decoded }; // 🔁 return full decoded
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
      return thunkAPI.rejectWithValue(error.response?.data || {});
    }
  }
);

// 📌 Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7 });

      const decoded = jwtDecode(token);
      return { token, user: decoded }; // 🔁 return full decoded
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Login error"
      );
    }
  }
);

// 📌 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      state.user = null;
      state.token = null;
    },
    setUserFromToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
