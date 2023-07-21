import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    //If there is a token in local storage, the user is autneticated

    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
