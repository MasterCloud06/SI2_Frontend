// src/pages/categorias/CategoryManage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import api from '../../lib/axios';

function LoadingSpinner() { return <div className="p-6">Cargando...</div>; }
function ErrorDisplay({ message }) { return <div className="p-6 text-red-600">{message}</div>; }

function CategoryManage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(categoryId);

  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/categorias/${categoryId}/`)
        .then(res => {
          setFormData({
            name: res.data.name || '',
            description: res.data.description || '',
          });
        })
        .catch(() => setFormError('Error al cargar la categoría.'))
        .finally(() => setLoading(false));
    }
  }, [categoryId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await api.put(`/categorias/${categoryId}/`, formData);
        setFormMessage('Categoría actualizada correctamente.');
      } else {
        await api.post('/categorias/', formData);
        setFormMessage('Categoría creada correctamente.');
      }
      setTimeout(() => navigate('/categorias/list'), 1200);
    } catch (err) {
      let msg = 'Error al guardar categoría.';
      if (err.response?.data) {
        msg = Object.entries(err.response.data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' ');
      }
      setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{isEditing ? 'Editar' : 'Crear'} Categoría</h2>
        <Link to="/categorias/list" className="text-blue-600 text-sm flex items-center">
          <FaArrowLeft className="mr-2" /> Volver
        </Link>
      </div>

      {formError && <ErrorDisplay message={formError} />}
      {formMessage && <div className="p-2 bg-green-100 border border-green-400 text-green-700 mb-4 rounded">{formMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Nombre *</label>
          <input
            type="text" id="name" name="name" value={formData.name} onChange={handleChange}
            required className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
          <textarea
            id="description" name="description" value={formData.description} onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Link to="/categorias/list" className="bg-gray-300 px-4 py-2 rounded"><FaTimes className="mr-2" /> Cancelar</Link>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            <FaSave className="mr-2" /> {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryManage;
