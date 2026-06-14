import React, { createContext, useState, useEffect } from "react";
import { api as API } from "../api/client.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Try to fetch user profile using stored token (sent via interceptor)
        const response = await API.get("/api/auth/me");
        if (response.data?.success && response.data?.user) {
          const u = response.data.user;
          u.id = u._id;
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
          return;
        }
      } catch (_) {
        // Fallback to localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          parsed.id = parsed._id;
          setUser(parsed);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async ({ name, email, password, role }) => {
    try {
      const response = await API.post("/api/auth/login", { name, email, password, role });
      if (response.data.success) {
        // Save the JWT token for future requests
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        const userData = response.data.user;
        userData.id = userData._id;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }

      return { success: false, message: response.data.message || "Login failed" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const response = await API.post("/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      if (response.data.success) {
        // Save the JWT token for future requests
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        const userData = response.data.user;
        userData.id = userData._id;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }

      return {
        success: false,
        message: response.data.message || "Registration failed",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

