import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER } from '../services/mockData';
import { campusService } from '../services/campusService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campusiq_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('campusiq_token') || 'demo_token';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campusiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campusiq_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await campusService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('campusiq_token', data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await campusService.register(formData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('campusiq_token', data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campusiq_token');
    localStorage.removeItem('campusiq_user');
  };

  const switchRole = (newRole) => {
    setUser((prev) => ({
      ...prev,
      role: newRole,
      name:
        newRole === 'ADMIN'
          ? 'Dean Arthur Vance'
          : newRole === 'FACULTY'
          ? 'Dr. Evelyn Reed'
          : 'Alex Rivera',
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
