import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Usuario } from '@/types';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('planeaciones_user');
    if (savedUser) {
      setUsuario(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const mockUser: Usuario = {
      id: '1',
      nombre: 'Daniel Exelente Hernández',
      email: email,
      token: 'mock-token-123'
    };
    
    setUsuario(mockUser);
    localStorage.setItem('planeaciones_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('planeaciones_user');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
