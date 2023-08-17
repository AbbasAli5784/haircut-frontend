import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function ProtectedRoute({ element, ...rest }) {
  const { auth } = useContext(AuthContext);

  // If the user is authenticated, return the protected element
  if (auth) {
    return element;
  } else {
    // Otherwise, redirect to the login page
    return <Navigate to="/booking/login" />;
  }
}

export default ProtectedRoute;
