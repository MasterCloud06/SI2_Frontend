// src/usuarios/UserDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/axios';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await api.get(`/usuarios/${userId}/`);
        setUser(response.data);
      } catch (err) {
        setError('Error al cargar el detalle del usuario');
      }
    };

    fetchUserDetail();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Detalle del Usuario</h1>
      {error && <div className="text-red-600">{error}</div>}
      {user && (
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role?.name || 'Sin rol'}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
