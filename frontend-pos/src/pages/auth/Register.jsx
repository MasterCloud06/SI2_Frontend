import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // 1) Registramos al usuario
      await api.post('/register/', data);
      // 2) Al registrarse, auto-login con el mismo contexto
      await login(data.username, data.password);
      // 3) Redirigimos al dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl mb-4">Registrar Usuario</h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-2 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {[
          { name: 'username',   label: 'Usuario',      type: 'text' },
          { name: 'email',      label: 'Correo',       type: 'email' },
          { name: 'password',   label: 'Contraseña',   type: 'password' },
          { name: 'first_name', label: 'Nombre',       type: 'text' },
          { name: 'last_name',  label: 'Apellido',     type: 'text' },
        ].map(({ name, label, type }) => (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-sm">{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={data[name]}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
