import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function ProtectedAdminRoute({ element, ...rest }) {
  const { auth, admin } = useContext(AuthContext);

  // If the user is authenticated and an admin, return the protected element
  if (auth && admin) {
    return element;
  }

  // Otherwise, redirect to the login page
  return <Navigate to="/admin-panel" />;
}

export default ProtectedAdminRoute;
