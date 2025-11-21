import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const profile = await authService.getProfile();
        setUser(profile);
      }
    } catch (err) {
      localStorage.removeItem('access_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signup = async (userData) => {
    try {
      setError(null);
      await authService.signup(userData);
      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      await authService.login(email, password);
      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};