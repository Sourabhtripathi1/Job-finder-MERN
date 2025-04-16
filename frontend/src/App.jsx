import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loadUser } from "./features/auth/authSlice"; // adjust path
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Job-Seeker-pages/Home";
import Login from "./pages/Common-pages/Login";
import Register from "./pages/Common-pages/Register";
import JobListing from "./pages/Job-Seeker-pages/JobListing";
import About from "./pages/Common-pages/About";
import ContactUs from "./pages/Common-pages/ContactUs";
import JobDetails from "./pages/Job-Seeker-pages/JobDetails";
import Jobs from "./pages/Employer-Pages/Jobs";
import Dashboard from "./pages/Employer-Pages/Dashboard";
import Company from "./pages/Employer-Pages/company";
import Applications from "./pages/Employer-Pages/applications";
import URLNotFound from "./pages/Common-pages/URLNotFound";
import useInitializeTheme from "./hooks/useInitializeTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useInitializeTheme(); // ✅ Theme updates automatically on route change

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(loadUser());
    } catch (err) {
      Cookies.remove("token"); // remove invalid token
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-listing" element={<JobListing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/company"
            element={
              <ProtectedRoute>
                <Company />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<URLNotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
