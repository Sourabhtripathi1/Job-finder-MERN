import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token"); // e.g. 'authToken'
  var user = null;
  if (token) {
    const decoded = jwtDecode(token);
    user = decoded.user.user;
  }

  // const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
