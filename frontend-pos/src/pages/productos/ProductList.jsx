// src/pages/productos/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import api from '../../lib/axios';
import Sidebar from '../../components/layout/Sidebar';

function LoadingSpinner() { return <div className="p-6">Cargando...</div>; }
function ErrorDisplay({ message }) { return <div className="p-6 text-red-600">{message}</div>; }

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/productos/');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error al cargar productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    try {
      await api.delete(`/productos/${productToDelete.id}/`);
      fetchProducts();
    } catch (err) {
      setError(`Error al eliminar el producto: ${productToDelete.name}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Gestión de Productos</h1>
          <Link to="/productos/create" className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <FaPlus className="mr-2" /> Añadir Producto
          </Link>
        </div>

        {error && <ErrorDisplay message={error} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? products.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.category?.name || 'N/A'}</td>
                  <td>{`Bs. ${parseFloat(prod.price).toFixed(2)}`}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <Link to={`/productos/detail/${prod.id}`}><FaEye /></Link>
                    <Link to={`/productos/edit/${prod.id}`}><FaEdit /></Link>
                    <button onClick={() => setProductToDelete(prod)}><FaTrashAlt /></button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6">No se encontraron productos.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductList;
