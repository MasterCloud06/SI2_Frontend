// src/pages/auth/Profile.jsx
import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return <div className="text-center mt-10">No estás autenticado.</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl mb-4">Perfil de Usuario</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nombre:</strong> {user.first_name}</p>
      <p><strong>Apellido:</strong> {user.last_name}</p>
      <p><strong>Rol:</strong> {user.role?.name || 'No asignado'}</p>
    </div>
  );
}

export default Profile;
