// src/usuarios/UserDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usuarios/${userId}/`);
        setUser(response.data);
      } catch (err) {
        setError('Error al cargar el detalle del usuario');
        console.error(err);
      }
    };

    fetchUserDetail();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Detalle del Usuario</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {user && (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre de Usuario:</strong> {user.username}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role ? user.role.name : 'Sin rol'}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
