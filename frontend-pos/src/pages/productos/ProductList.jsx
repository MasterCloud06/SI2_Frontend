// ✅ ProductList.jsx actualizado con mejoras de diseño, confirmación y manejo de errores
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import api from '../../lib/axios';
import Sidebar from '../../components/layout/Sidebar';

function LoadingSpinner() { return <div className="p-6">Cargando...</div>; }
function ErrorDisplay({ message }) { return <div className="p-6 text-red-600">{message}</div>; }
function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <p className="mb-4 text-gray-800">{message}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

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
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      setError(`Error al eliminar el producto: ${productToDelete.name}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 p-6">
        {productToDelete && (
          <ConfirmationDialog
            message={`¿Seguro que deseas eliminar el producto "${productToDelete.name}"?`}
            onConfirm={confirmDelete}
            onCancel={() => setProductToDelete(null)}
          />
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Gestíon de Productos</h1>
          <Link to="/productos/create" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Nuevo Producto
          </Link>
        </div>

        {error && <ErrorDisplay message={error} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? products.map(prod => (
                  <tr key={prod.id} className="border-t">
                    <td className="px-4 py-2">{prod.id}</td>
                    <td className="px-4 py-2">{prod.name}</td>
                    <td className="px-4 py-2">{prod.category?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{`Bs. ${parseFloat(prod.price).toFixed(2)}`}</td>
                    <td className="px-4 py-2">{prod.stock}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <Link to={`/productos/detail/${prod.id}`} className="text-blue-600 hover:text-blue-800"><FaEye /></Link>
                      <Link to={`/productos/edit/${prod.id}`} className="text-green-600 hover:text-green-800"><FaEdit /></Link>
                      <button onClick={() => setProductToDelete(prod)} className="text-red-600 hover:text-red-800"><FaTrashAlt /></button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center p-4">No se encontraron productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
