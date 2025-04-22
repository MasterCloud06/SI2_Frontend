// src/pages/productos/ProductManage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar';
import api from '../../lib/axios';

function ProductManage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', category_id: '', image_url: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    api.get('/categorias/')
      .then(res => setCategories(res.data))
      .catch(() => setFormError('No se pudieron cargar las categorías.'));
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/productos/${productId}/`)
        .then(res => {
          const p = res.data;
          setFormData({
            name: p.name, description: p.description, price: p.price,
            stock: p.stock, category_id: p.category?.id || '', image_url: p.image_url || ''
          });
        })
        .catch(() => setFormError('Error al cargar producto.'))
        .finally(() => setLoading(false));
    }
  }, [productId, isEditing]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'category_id' ? parseInt(value) : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, category_id: formData.category_id || null };
      if (isEditing) {
        await api.put(`/productos/${productId}/`, payload);
        setFormMessage('Producto actualizado correctamente.');
      } else {
        await api.post('/productos/', payload);
        setFormMessage('Producto creado correctamente.');
      }
      setTimeout(() => navigate('/productos/list'), 1000);
    } catch (err) {
      setFormError('Error al guardar el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">{isEditing ? 'Editar' : 'Crear'} Producto</h2>
          {formError && <p className="text-red-500">{formError}</p>}
          {formMessage && <p className="text-green-500">{formMessage}</p>}

          {/* campos... */}
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className="w-full mb-3 p-2 border" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="w-full mb-3 p-2 border" />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Precio" required className="w-full mb-3 p-2 border" />
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required className="w-full mb-3 p-2 border" />
          <select name="category_id" value={formData.category_id || ''} onChange={handleChange} className="w-full mb-3 p-2 border">
            <option value="">-- Seleccionar categoría --</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL Imagen" className="w-full mb-3 p-2 border" />

          <div className="flex justify-between">
            <Link to="/productos/list" className="bg-gray-300 px-4 py-2 rounded">Cancelar</Link>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? 'Actualizar' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductManage;
