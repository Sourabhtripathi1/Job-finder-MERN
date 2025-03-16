import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import useInitializeTheme from "./hooks/useInitializeTheme";

function App() {
  // Initialize theme functionality
  useInitializeTheme();

  return (
    <>
      <Header />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </main>
      <Footer />
    </>
  );
}

export default App;
