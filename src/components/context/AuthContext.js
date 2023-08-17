import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenExpiration = () => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      const decodedToken = jwtDecode(tokenFromStorage);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        setAuth(false);
        setAdmin(false);
        setIsLoading(false);
      } else {
        if (decodedToken.userEmail !== email) {
          setEmail(decodedToken.userEmail);
        }
        setAuth(true);
        setIsLoading(false);

        if (decodedToken.role === "admin") {
          setAdmin(true);
        }
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkTokenExpiration(); // Initial check

    // Set up an interval to check token expiration every 10 minutes
    const interval = setInterval(checkTokenExpiration, 600000); // 600000ms = 10 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [email]); // Add email as a dependency

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, admin, setAdmin, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
}
