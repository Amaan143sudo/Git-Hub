import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!token;
  const authorizationToken = `Bearer ${token}`; // 🟢 Yeh zaroori tha

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const userAuthentication = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: { Authorization: authorizationToken },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        LogoutUser();
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, authorizationToken]);

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, isLoading, authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);