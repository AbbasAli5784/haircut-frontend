import React, { useContext } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  function ProtectedRoute(props) {
    const { auth } = useContext(AuthContext);

    //IF the user is authenticated, render the routes component

    if (auth) return <Route {...props} />;

    //Otherwise, redirect to the login page
    return navigate("/booking/login");
  }

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
