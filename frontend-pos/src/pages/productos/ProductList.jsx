// src/pages/productos/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Sidebar from '../../components/layout/Sidebar'

// --- Componentes Auxiliares ---
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
function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Confirmación</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-300">{message}</p>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2">
                            Confirmar
                        </button>
                        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
// --- Fin Componentes Auxiliares ---

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const navigate = useNavigate();
    const API_URL = 'http://localhost:8000/api/productos/';

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.warn("Respuesta inesperada:", response.data);
                setProducts([]);
                setError('Formato de respuesta inesperado.');
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError('Error al cargar productos. Verifica la conexión con el backend.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            await axios.delete(`${API_URL}${productToDelete.id}/`);
            fetchProducts();
        } catch (err) {
            setError(`Error al eliminar el producto ${productToDelete.name}`);
            console.error("Error deleting product:", err);
        } finally {
            setShowConfirmDialog(false);
            setProductToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmDialog(false);
        setProductToDelete(null);
    };

    const formatPrice = (price) => {
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numericPrice)) return '---';
        return `Bs. ${numericPrice.toFixed(2)}`;
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />

            <div className="flex-1 p-4 bg-white dark:bg-gray-900 overflow-auto">
                {showConfirmDialog && productToDelete && (
                    <ConfirmationDialog
                        message={`¿Estás seguro de eliminar el producto "${productToDelete.name}" (ID: ${productToDelete.id})?`}
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Gestión de Productos</h1>
                    <Link
                        to="/productos/create"
                        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out text-sm"
                    >
                        <FaPlus className="mr-2" />
                        Añadir Producto
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
                                    <th className="px-6 py-3">ID</th>
                                    <th className="px-6 py-3">Nombre</th>
                                    <th className="px-6 py-3">Categoría</th>
                                    <th className="px-6 py-3 text-right">Precio</th>
                                    <th className="px-6 py-3 text-center">Stock</th>
                                    <th className="px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                                            <td className="px-6 py-4">{product.category ? product.category.name : 'N/A'}</td>
                                            <td className="px-6 py-4 text-right">{formatPrice(product.price)}</td>
                                            <td className="px-6 py-4 text-center">{product.stock}</td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                                                <Link to={`/productos/detail/${product.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center p-1 hover:bg-blue-100 dark:hover:bg-gray-700 rounded" title="Ver Detalles">
                                                    <FaEye size="1.1em" />
                                                </Link>
                                                <Link to={`/productos/edit/${product.id}`} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center p-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded" title="Editar Producto">
                                                    <FaEdit size="1.1em" />
                                                </Link>
                                                <button onClick={() => handleDeleteClick(product)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center p-1 hover:bg-red-100 dark:hover:bg-gray-700 rounded" title="Eliminar Producto">
                                                    <FaTrashAlt size="1.1em" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">No se encontraron productos.</td>
                                    </tr>
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
