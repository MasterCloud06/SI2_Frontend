// src/usuarios/UserCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../lib/axios';

function UserCreate() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/create/', {
        username,
        email,
        password,
        role,
      });
      navigate('/usuarios/list');
    } catch (err) {
      setError('Error al crear el usuario');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Crear Usuario</h1>
          {error && <div className="bg-red-100 border text-red-700 p-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded p-6 space-y-4">
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required className="w-full p-2 border rounded" />
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required className="w-full p-2 border rounded" />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required className="w-full p-2 border rounded" />
            <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Rol (opcional)" className="w-full p-2 border rounded" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Usuario</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default UserCreate;
