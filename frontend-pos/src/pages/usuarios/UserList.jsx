// src/usuarios/UserList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../lib/axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    api.get('/usuarios/')
      .then(res => setUsers(res.data))
      .catch(() => setError('Error al cargar los usuarios'));
  }, []);

  const handleDelete = async (username) => {
    try {
      await api.delete(`/usuarios/delete/${username}/`);
      setUsers(users.filter(u => u.username !== username));
    } catch {
      setError('Error al eliminar el usuario');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
      <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Lista de Usuarios</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role?.name || 'N/A'}</td>
                <td>
                  <Link to={`/usuarios/edit/${u.id}`} className="text-blue-600 mr-3">Editar</Link>
                  <button onClick={() => handleDelete(u.username)} className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default UserList;
