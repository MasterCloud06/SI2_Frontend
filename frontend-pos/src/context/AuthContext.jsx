import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 1) Al montar, valida el token local
  const checkSession = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoggedIn(false);
      return;
    }
    try {
      const res = await api.get('/auth/session/');
      // si responde { authenticated: true, ... }
      if (res.data.authenticated) {
        setUser({ username: res.data.username, id: res.data.id });
        setLoggedIn(true);
      } else {
        throw new Error('No autenticado');
      }
    } catch {
      console.warn('⚠️ Token inválido o expirado');
      setLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // 2) Login: llama al endpoint, guarda tokens y user
  const login = async (username, password) => {
    const res = await api.post('/auth/login/', { username, password });
    const { access, refresh, user: userData } = res.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setLoggedIn(true);
  };

  // 3) Logout: limpia todo
  const logout = async () => {
    try {
      await api.post('/auth/logout/'); 
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);