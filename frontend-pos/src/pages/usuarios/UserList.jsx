import React, { useState, useEffect } from 'react'; // <--- ¡Importa useState!
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar'; // <--- Tu importación está bien

function UserList() {
  // --- Estado para los datos de la tabla ---
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // --- ¡NECESITAS AÑADIR ESTADO PARA EL SIDEBAR! ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // --- useEffect para cargar usuarios (sin cambios) ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/usuarios/');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // --- handleDelete (sin cambios) ---
  const handleDelete = async (username) => {
    try {
      await axios.delete(`http://localhost:8000/api/usuarios/delete/${username}/`);
      setUsers(users.filter((user) => user.username !== username));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    }
  };

  // --- Estructura del Return con Layout ---
  return (
    // 1. Contenedor principal con Flexbox
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* 2. Renderizar el Sidebar pasándole el estado y la función para cambiarlo */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={setIsSidebarCollapsed} // Pasamos la función que actualiza el estado
      />

      {/* 3. Contenedor para el contenido principal (la tabla) */}
      {/* Este div se ajusta con margen dinámico */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
         {/* Añadimos padding interno para separar el contenido */}
         <div className="p-6">

            {/* El contenido original de tu UserList va aquí dentro */}
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6"> {/* Ajuste color dark */}
                Lista de Usuarios
            </h1>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>} {/* Mejor estilo de error */}

            {/* Contenedor para la tabla con sombra y bordes redondeados */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                    <th className="px-4 py-3 border dark:border-gray-600 text-left">ID</th>
                    <th className="px-4 py-3 border dark:border-gray-600 text-left">Nombre</th>
                    <th className="px-4 py-3 border dark:border-gray-600 text-left">Correo</th>
                    <th className="px-4 py-3 border dark:border-gray-600 text-left">Rol</th>
                    <th className="px-4 py-3 border dark:border-gray-600 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-200 text-sm font-light">
                    {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 border dark:border-gray-600">{user.id}</td>
                        <td className="px-4 py-3 border dark:border-gray-600">{user.username}</td>
                        <td className="px-4 py-3 border dark:border-gray-600">{user.email}</td>
                        <td className="px-4 py-3 border dark:border-gray-600">{user.role ? user.role.name : 'Sin rol'}</td>
                        <td className="px-4 py-3 border dark:border-gray-600 text-center whitespace-nowrap"> {/* Evita que botones se rompan en dos líneas */}
                        <Link to={`/usuarios/edit/${user.id}`} className="text-blue-500 hover:text-blue-700 mr-3 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-150">Editar</Link>
                        <button
                            onClick={() => handleDelete(user.username)}
                            className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                            Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div> {/* Fin contenedor tabla */}
          </div> {/* Fin padding interno */}
      </main> {/* Fin contenido principal */}
    </div> // Fin contenedor flex principal
  );
}

export default UserList;