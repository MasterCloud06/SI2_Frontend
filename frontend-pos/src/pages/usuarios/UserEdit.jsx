// src/usuarios/UserEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/axios';

function UserEdit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [roleId, setRoleId] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/usuarios/${id}/`);
        const { username, email, role } = res.data;
        setUsername(username);
        setEmail(email);
        setRole(role?.name || '');
        setRoleId(role?.id || '');
      } catch {
        setError('Error al cargar datos del usuario');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/update/${id}/`, {
        username,
        email,
        role_id: roleId
      });
      navigate('/usuarios');
    } catch {
      setError('Error al actualizar usuario');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Editar Usuario</h1>
      {error && <div className="text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
      </form>
    </div>
  );
}

export default UserEdit;
