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

// 📌 Load Authenticated User from token (Cookie stored)
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token"); // Read token from cookie
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user.user; // extract user info from token
      } else {
        return thunkAPI.rejectWithValue("Token not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user from token");
    }
  }
);

// 📌 Load Updated User from backend API /me
export const loadUpdatedUser = createAsyncThunk(
  "auth/loadUpdatedUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load updated user");
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

// 📌 Auth Slice
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
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // LoadUser (From token)
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // LoadUpdatedUser (From /me API)
      .addCase(loadUpdatedUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUpdatedUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadUpdatedUser.rejected, (state) => {
        state.isLoading = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
