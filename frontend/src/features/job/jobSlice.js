import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}job/`;

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}list?${query}`);
    if (!response.ok) throw new Error("Failed to fetch jobs");
    return await response.json();
  }
);

// 📌 Redux Slice
const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
