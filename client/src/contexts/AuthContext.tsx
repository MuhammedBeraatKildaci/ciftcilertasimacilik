import React, { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../services/api';
import { AuthContextType, LoginCredentials, AuthResponse, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Yetki kontrolü için yardımcı fonksiyonlar
export const hasPermission = (user: User | null, permission: 'admin' | 'user') => {
  if (!user) return false;
  if (permission === 'user') return true;
  return user.role === permission;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Token kontrolü
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setIsLoading(true);
          // Token doğrulama isteği yapılabilir
          // const response = await authAPI.verify();
          // setUser(response.user);
        } catch (error) {
          localStorage.removeItem('token');
        } finally {
          setIsLoading(false);
        }
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials.email, credentials.password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 