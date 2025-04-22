// src/usuarios/RoleManage.jsx
import React, { useState } from 'react';
import api from '../../lib/axios';

function RoleManage() {
  const [username, setUsername] = useState('');
  const [roleName, setRoleName] = useState('cliente');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/update-role/', {
        username,
        role_name: roleName,
      });
      setMessage(response.data.detail);
    } catch (err) {
      setError('Error al actualizar el rol');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestión de Roles</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm">Nombre de Usuario</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-3 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="role_name" className="block text-sm">Nuevo Rol</label>
          <select id="role_name" value={roleName} onChange={(e) => setRoleName(e.target.value)} className="w-full p-3 border rounded-md">
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Actualizar Rol</button>
      </form>
    </div>
  );
}

export default RoleManage;
