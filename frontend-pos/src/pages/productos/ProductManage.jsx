import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../lib/axios';

function LoadingSpinner() {
  return <div className="p-6">Cargando...</div>;
}

function ErrorDisplay({ message }) {
  return <div className="p-6 text-red-600">{message}</div>;
}

function ProductManage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    api.get('/categorias/')
      .then(res => setCategories(Array.isArray(res.data) ? res.data : res.data.results || []))
      .catch(() => setFormError('No se pudieron cargar las categorías.'));
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/productos/${productId}/`)
        .then(res => {
          const p = res.data;
          setFormData({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
            category_id: p.category?.id || '',
            image_url: p.image_url || ''
          });
        })
        .catch(() => setFormError('Error al cargar producto.'))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category_id' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    try {
      const payload = { ...formData, category_id: formData.category_id || null };
      if (isEditing) {
        await api.put(`/productos/${productId}/`, payload);
        setFormMessage('Producto actualizado correctamente.');
      } else {
        await api.post('/productos/', payload);
        setFormMessage('Producto creado correctamente.');
      }
      setTimeout(() => navigate('/productos/list'), 1200);
    } catch (err) {
      let msg = 'Error al guardar el producto.';
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

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{isEditing ? 'Editar' : 'Crear'} Producto</h2>
            <Link to="/productos/list" className="text-blue-600 text-sm flex items-center">
              <FaArrowLeft className="mr-2" /> Volver
            </Link>
          </div>

          {formError && <ErrorDisplay message={formError} />}
          {formMessage && <div className="p-2 bg-green-100 border border-green-400 text-green-700 mb-4 rounded">{formMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 border rounded" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border rounded" />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Precio" required className="w-full p-2 border rounded" />
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="w-full p-2 border rounded" />
            <select name="category_id" value={formData.category_id || ''} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">-- Seleccionar categoría --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL de Imagen" className="w-full p-2 border rounded" />

            <div className="flex justify-end space-x-3">
              <Link to="/productos/list" className="bg-gray-300 px-4 py-2 rounded flex items-center">
                <FaTimes className="mr-2" /> Cancelar
              </Link>
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                <FaSave className="mr-2" /> {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductManage;