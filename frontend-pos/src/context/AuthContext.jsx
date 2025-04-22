import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [checking, setChecking] = useState(true); // Evita mostrar contenido antes de verificar sesión

  // Verifica sesión al montar
  const checkSession = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoggedIn(false);
      setChecking(false);
      return;
    }
    try {
      const res = await api.get('/auth/session/');
      if (res.data.authenticated) {
        const sessionUser = {
          username: res.data.username,
          id: res.data.id,
          ...res.data,
        };
        setUser(sessionUser);
        setLoggedIn(true);
      } else {
        throw new Error('No autenticado');
      }
    } catch {
      console.warn('⚠️ Token inválido o expirado');
      logout(); // limpia todo si falla la sesión
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Login
  const login = async (username, password) => {
    const res = await api.post('/auth/login/', { username, password });
    const { access, refresh, user: userData } = res.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setLoggedIn(true);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  };

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-700 dark:text-white">
        Validando sesión...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
