import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const AuthRedirect = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      auth &&
      (location.pathname === "/login" || location.pathname === "/booking/login")
    ) {
      navigate("/select-service");
    }
  }, [auth, location, navigate]);

  return null;
};

export default AuthRedirect;
