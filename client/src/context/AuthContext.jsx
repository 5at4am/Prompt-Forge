import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Ensure anonymous session exists
  const ensureSession = async () => {
    if (!user && !localStorage.getItem('sessionId')) {
      try {
        const response = await authAPI.createSession();
        localStorage.setItem('sessionId', response.data.id);
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    }
  };

  // Make sure we have a session for anonymous users
  useEffect(() => {
    if (!loading && !user) {
      ensureSession();
    }
  }, [loading, user]);

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
