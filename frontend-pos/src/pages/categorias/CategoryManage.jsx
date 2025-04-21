import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';

function LoadingSpinner() { /* ... */ }
function ErrorDisplay({ message }) { /* ... */ }

function CategoryManage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(categoryId);

  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const API_URL = 'http://localhost:8000/api/categorias/';

  useEffect(() => {
      if (isEditing) {
          setLoading(true);
          const fetchCategoryData = async () => {
              try {
                  const response = await axios.get(`<span class="math-inline">\{API\_URL\}</span>{categoryId}/`);
                  setFormData({
                      name: response.data.name || '',
                      description: response.data.description || '',
                  });
              } catch (err) {
                  setFormError("Error al cargar datos de la categoría.");
                  console.error(err);
              } finally {
                  setLoading(false);
              }
          };
          fetchCategoryData();
      }
  }, [categoryId, isEditing]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setFormError('');
      setFormMessage('');

      try {
          if (isEditing) {
              await axios.put(`<span class="math-inline">\{API\_URL\}</span>{categoryId}/`, formData);
              setFormMessage('Categoría actualizada correctamente.');
          } else {
              await axios.post(API_URL, formData);
              setFormMessage('Categoría creada correctamente.');
          }
          setTimeout(() => navigate('/categorias/list'), 1500); // Redirigir a la lista

      } catch (err) {
          let errorMsg = 'Ocurrió un error al guardar la categoría.';
          if (err.response && err.response.data) {
              errorMsg = Object.entries(err.response.data)
                  .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                  .join(' ');
          }
          setFormError(errorMsg);
          console.error("Error saving category:", err.response?.data || err);
      } finally {
          setLoading(false);
      }
  };

  if (loading && isEditing) return <LoadingSpinner />;

  return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}
             </h1>
             <Link to="/categorias/list" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                <FaArrowLeft className="mr-1"/> Volver
             </Link>
          </div>

          {formError && <ErrorDisplay message={formError} />}
          {formMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{formMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre *</label>
                  <input
                      type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
              </div>
              <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                  <textarea
                      id="description" name="description" value={formData.description} onChange={handleChange} rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                  <Link to="/categorias/list" className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition">
                      <FaTimes className="mr-2"/> Cancelar
                  </Link>
                  <button type="submit" className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50" disabled={loading}>
                      <FaSave className="mr-2"/> {loading ? 'Guardando...' : (isEditing ? 'Actualizar Categoría' : 'Crear Categoría')}
                  </button>
              </div>
          </form>
      </div>
  );
}

export default CategoryManage;