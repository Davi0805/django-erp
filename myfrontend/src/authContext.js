import React, { createContext, useContext, useState, useEffect } from "react";
import axiosConfig from "./axiosConfig";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Cookies from "js-cookie";

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `expires=${date.toUTCString()}; `;
  }
  document.cookie = `${name}=${value}; ${expires}path=/; secure; samesite=strict`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies, removeCookie] = useCookies(['token', 'refresh']);
    const navigate = useNavigate();

    /* useEffect(() => {
        // Check if the token exists in cookies on initial load
        const token = cookies.token;
        const refreshToken = cookies.refresh;
    
        if (token) {
          // Token exists, so the user is authenticated
          setIsAuthenticated(true);
          setLoading(false);
        } else if (refreshToken) {
          // Try to refresh the token if only refreshToken is available
          const refreshAccessToken = async () => {
            try {
              const response = await axiosConfig.post("api/token/refresh/", {
                refresh: refreshToken
              });
              const newAccessToken = response.data.access;
              setCookies('token', newAccessToken, { path: '/', secure: true, sameSite: 'strict' });
              setIsAuthenticated(true);
            } catch (error) {
              setIsAuthenticated(false);
              removeCookie('refresh');
            } finally {
              setLoading(false);
            }
          };
          refreshAccessToken();
        } else {
          // No token or refresh token, user is not authenticated
          setIsAuthenticated(false);
          setLoading(false);
        }
      }, [cookies, setCookies, removeCookie]); */


      const login = async ({ username, password }) => {
        try {
          const res = await axiosConfig.post('api/token/', {
            username: username,
            password: password
          });
    
          Cookies.set('token', res.data.access); // Set cookie to expire in 1 day
          Cookies.set('refresh', res.data.refresh); // Set cookie to expire in 1 day
          Cookies.set('isAuthenticated', true); // Optional: track authentication status
    
          setIsAuthenticated(true);
          navigate('/dashboard');
        } catch (error) {
          console.error("Login error:", error);
        }
      };

      const logout = () => {
        /* deleteCookie('token');
        deleteCookie('refresh');
        deleteCookie('isAuthenticated'); */
        Cookies.remove('token');
        Cookies.remove('refresh');
        Cookies.remove('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/'); // Adjust path if necessary
      };

const value = useMemo(
    () => ({
        isAuthenticated,
        cookies,
        login,
        logout
    }),
    [isAuthenticated]
);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext)
};
