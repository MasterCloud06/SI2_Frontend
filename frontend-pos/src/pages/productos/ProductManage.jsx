import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar'; // ✅ RUTA CORRECTA

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="ml-3 text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  );
}

function ErrorDisplay({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

function ProductManage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // 👈 sidebar toggle
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const API_PRODUCTS_URL = 'http://localhost:8000/api/p roductos/';
  const API_CATEGORIES_URL = 'http://localhost:8000/api/categorias/';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_CATEGORIES_URL);
        setCategories(Array.isArray(response.data) ? response.data : response.data.results || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setFormError("No se pudieron cargar las categorías.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchProductData = async () => {
        try {
          const response = await axios.get(`${API_PRODUCTS_URL}${productId}/`);
          const product = response.data;
          setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            stock: product.stock || '',
            category_id: product.category ? product.category.id : '',
            image_url: product.image_url || '',
          });
        } catch (err) {
          setFormError("Error al cargar datos del producto para editar.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
    }
  }, [productId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category_id' ? (value ? parseInt(value, 10) : null) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormMessage('');

    const payload = {
      ...formData,
      category_id: formData.category_id || null
    };

    try {
      let response;
      if (isEditing) {
        response = await axios.put(`${API_PRODUCTS_URL}${productId}/`, payload);
        setFormMessage('Producto actualizado correctamente.');
      } else {
        response = await axios.post(API_PRODUCTS_URL, payload);
        setFormMessage('Producto creado correctamente.');
      }

      setTimeout(() => {
        navigate('/productos/list');
      }, 1500);
    } catch (err) {
      let errorMsg = 'Ocurrió un error.';
      if (err.response && err.response.data) {
        errorMsg = Object.entries(err.response.data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join(' ');
      }
      setFormError(errorMsg || 'Error al guardar el producto.');
      console.error("Error saving product:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />

      <div className="flex-1 p-4 bg-white dark:bg-gray-900 overflow-auto">
        <div className="p-4 md:p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h1>
            <Link to="/productos/list" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
              <FaArrowLeft className="mr-1" /> Volver
            </Link>
          </div>

          {formError && <ErrorDisplay message={formError} />}
          {formMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{formMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre *</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
              <textarea
                id="description" name="description" value={formData.description} onChange={handleChange} rows="3"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio (Bs.) *</label>
                <input
                  type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" min="0"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock *</label>
                <input
                  type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required step="1" min="0"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
              <select
                id="category_id" name="category_id" value={formData.category_id || ''} onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Sin categoría --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de Imagen</label>
              <input
                type="url" id="image_url" name="image_url" value={formData.image_url} onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Link
                to="/productos/list"
                className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition"
              >
                <FaTimes className="mr-2" /> Cancelar
              </Link>
              <button
                type="submit"
                className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loading}
              >
                <FaSave className="mr-2" /> {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductManage;
