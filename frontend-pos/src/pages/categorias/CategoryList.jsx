// ✅ CategoryList.jsx MODIFICADO
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import api from '../../lib/axios';

function LoadingSpinner() { return <div className="p-6">Cargando...</div>; }
function ErrorDisplay({ message }) { return <div className="p-6 text-red-600">{message}</div>; }
function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1 rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
}

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categorias/');
      setCategories(Array.isArray(res.data) ? res.data : res.data.results || []);
    } catch (err) {
      setError('Error al cargar categorías.');
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
    try {
      await api.delete(`/categorias/${categoryToDelete.id}/`);
      fetchCategories();
    } catch (err) {
      setError(`Error al eliminar la categoría: ${categoryToDelete.name}`);
    } finally {
      setShowConfirmDialog(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      {showConfirmDialog && (
        <ConfirmationDialog
          message={`¿Eliminar la categoría "${categoryToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Link to="/categorias/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          <FaPlus className="inline mr-2" /> Nueva Categoría
        </Link>
      </div>

      {error && <ErrorDisplay message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Descripción</th>
                <th className="px-3 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.length ? (
                categories.map(cat => (
                  <tr key={cat.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2">{cat.id}</td>
                    <td className="px-3 py-2 font-semibold">{cat.name}</td>
                    <td className="px-3 py-2">{cat.description || '-'}</td>
                    <td className="px-3 py-2 text-center space-x-2">
                      <Link to={`/categorias/edit/${cat.id}`} className="text-blue-600 hover:text-blue-800"><FaEdit /></Link>
                      <button onClick={() => handleDeleteClick(cat)} className="text-red-600 hover:text-red-800"><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-4 text-gray-500">No hay categorías.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoryList;