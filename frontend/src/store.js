import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import jobReducer from "./features/job/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});

export default store;
