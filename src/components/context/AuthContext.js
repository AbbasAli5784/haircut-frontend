import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token AuthContext:", decodedToken.admin);

        setAuth(true);
        if (decodedToken.role === "admin") {
          setAdmin(true);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  //If there is a token in local storage, the user is autneticated

  return (
    <AuthContext.Provider value={{ auth, setAuth, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
