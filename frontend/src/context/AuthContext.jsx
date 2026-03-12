import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/users/current-user");
      console.log(response.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async ({ identifier, password }) => {
    try {
      if (!identifier) {
        console.log("Username or email is missing!");
        return;
      }

      if (!password) {
        console.log("Password is missing");
        return;
      }

      const isEmail = identifier.includes("@");
      const data = {
        password: password,
        ...(isEmail ? { email: identifier } : { username: identifier }),
      };

      const response = await api.post("/users/login", data);
      console.log(response);
      setUser(response.data?.data?.user);
      return response.data?.success;
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/users/logout");
      console.log(response);
      setUser(null)
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
