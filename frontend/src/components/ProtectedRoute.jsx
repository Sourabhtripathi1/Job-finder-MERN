import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  console.log(useSelector((state) => state.auth));

  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
