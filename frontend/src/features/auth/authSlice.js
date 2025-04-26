import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}auth`;

// 📌 Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/register`, data, {
        withCredentials: true,
      });
      toast.success("Registration successful");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// 📌 Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, data, {
        withCredentials: true,
      });

      toast.success("Login successful");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed");
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// 📌 Load Authenticated User
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token"); // e.g. 'authToken'

      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.user;
      }
      // const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
      // return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user");
    }
  }
);

// 📌 Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true }
    );
    toast.success("Logged out");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
