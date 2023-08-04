import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);

    console.log("Decoded Token AuthContext:", decodedToken.admin);

    //If there is a token in local storage, the user is autneticated

    if (token) {
      setAuth(true);
      if (decodedToken.role === "admin") {
        setAdmin(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
