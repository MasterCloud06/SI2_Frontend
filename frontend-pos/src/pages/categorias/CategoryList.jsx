import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

// Reutilizar o crear componentes auxiliares
function LoadingSpinner() { /* ... */ }
function ErrorDisplay({ message }) { /* ... */ }
function ConfirmationDialog({ message, onConfirm, onCancel }) { /* ... */ }


function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8000/api/categorias/';

  const fetchCategories = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await axios.get(API_URL);
           // Asumiendo respuesta directa de array o con 'results'
           if (Array.isArray(response.data)) {
              setCategories(response.data);
          } else if (response.data && Array.isArray(response.data.results)) {
              setCategories(response.data.results);
          } else {
              console.warn("Respuesta inesperada:", response.data);
              setCategories([]);
              setError('Formato de respuesta inesperado.');
          }
      } catch (err) {
          setError('Error al cargar categorías.');
          console.error("Error fetching categories:", err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchCategories();
  }, []);

  const handleDeleteClick = (category) => {
      setCategoryToDelete(category);
      setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
      if (!categoryToDelete) return;
      try {
          // Opcional: Verificar si hay productos asociados antes de borrar,
          // o confiar en la restricción ON DELETE SET NULL de la BD.
          await axios.delete(`<span class="math-inline">\{API\_URL\}</span>{categoryToDelete.id}/`);
          fetchCategories(); // Recargar lista
      } catch (err) {
          setError(`Error al eliminar la categoría ${categoryToDelete.name}`);
          console.error("Error deleting category:", err);
      } finally {
          setShowConfirmDialog(false);
          setCategoryToDelete(null);
      }
  };

   const cancelDelete = () => {
      setShowConfirmDialog(false);
      setCategoryToDelete(null);
  };


  return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          {showConfirmDialog && categoryToDelete && (
              <ConfirmationDialog 
                  message={`¿Estás seguro de eliminar la categoría "${categoryToDelete.name}"? Los productos asociados quedarán sin categoría.`}
                  onConfirm={confirmDelete}
                  onCancel={cancelDelete}
              />
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Gestión de Categorías</h1>
              <Link 
                  to="/categorias/create" // Asume ruta de creación
                  className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out text-sm"
              >
                  <FaPlus className="mr-2"/> Añadir Categoría
              </Link>
          </div>

          {error && <ErrorDisplay message={error} />}

          {loading ? (
              <LoadingSpinner />
          ) : (
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                          <tr>
                              <th scope="col" className="px-6 py-3">ID</th>
                              <th scope="col" className="px-6 py-3">Nombre</th>
                              <th scope="col" className="px-6 py-3">Descripción</th>
                              <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          {categories.length > 0 ? (
                              categories.map((category) => (
                                  <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{category.id}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{category.name}</td>
                                      <td className="px-6 py-4">{category.description || '-'}</td>
                                      <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                                          <Link to={`/categorias/edit/${category.id}`} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center p-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded" title="Editar Categoría"> <FaEdit size="1.1em"/> </Link>
                                          <button onClick={() => handleDeleteClick(category)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center p-1 hover:bg-red-100 dark:hover:bg-gray-700 rounded" title="Eliminar Categoría"> <FaTrashAlt size="1.1em"/> </button>
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr className="bg-white dark:bg-gray-800">
                                  <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400"> No se encontraron categorías.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          )}
      </div>
  );
}

export default CategoryList;