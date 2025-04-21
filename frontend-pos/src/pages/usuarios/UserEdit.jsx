// src/usuarios/UserEdit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [roleId, setRoleId] = useState('');  // Variable para guardar el role_id
  const [error, setError] = useState('');
  const { id } = useParams();  // Captura el id de la URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usuarios/${id}/`);
        const { username, email, role } = response.data;
        setUsername(username);
        setEmail(email);
        setRole(role.name);  // Usamos el nombre del rol para mostrarlo en el formulario
        setRoleId(role.id);  // Guardamos el ID del rol
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ahora estamos enviando el role_id en lugar de role
      await axios.put(`http://localhost:8000/api/usuarios/update/${id}/`, {
        username,
        email,
        role_id: roleId,  // Enviamos el role_id en lugar de role.name
      });
      navigate('/usuarios');  // Redirige después de la actualización
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Editar Usuario</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block">Rol</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Actualizar Usuario</button>
      </form>
    </div>
  );
}

export default UserEdit;
