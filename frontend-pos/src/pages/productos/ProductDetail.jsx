import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImage } from 'react-icons/fa'; // Icono para imagen placeholder

// Reutilizar componentes auxiliares si los moviste a archivos separados
function LoadingSpinner() { /* ... */ }
function ErrorDisplay({ message }) { /* ... */ }

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Opcional: para la acción reduce_stock
  const [reduceAmount, setReduceAmount] = useState(1); // Valor inicial 1
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  const API_URL_BASE = 'http://localhost:8000/api/productos/';

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`<span class="math-inline">\{API\_URL\_BASE\}</span>{productId}/`);
        setProduct(response.data);
      } catch (err) {
        setError('Error al cargar el detalle del producto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleReduceStock = async () => {
      setActionMessage('');
      setActionError('');
      if (reduceAmount <= 0) {
          setActionError("La cantidad a reducir debe ser mayor a cero.");
          return;
      }
      try {
          // Usar la URL correcta de la acción personalizada
          const response = await axios.post(`<span class="math-inline">\{API\_URL\_BASE\}</span>{productId}/reducir-stock/`, { 
              amount: reduceAmount 
          });
          // Actualizar el estado del producto con la respuesta del backend
          setProduct(response.data); 
          setActionMessage(`Stock reducido exitosamente. Nuevo stock: ${response.data.stock}`);
          setReduceAmount(1); // Resetear input
      } catch (err) {
          const detail = err.response?.data?.detail || 'Error desconocido al reducir stock.';
          setActionError(detail);
          console.error("Error reducing stock:", err);
      }
  };

  const formatPrice = (price) => { /* ... (misma función que en ProductList) ... */ };


  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!product) return <div className="p-6 text-center">Producto no encontrado.</div>;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Detalle del Producto</h1>
        <Link to="/productos/list" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <FaArrowLeft className="mr-2"/> Volver a la Lista
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna de Imagen */}
        <div className="md:col-span-1">
          {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg shadow-md aspect-square" 
                onError={(e) => { e.target.onerror = null; e.target.src="/path/to/default/placeholder.png"}} // Fallback si URL está rota
              />
          ) : (
              <div className="w-full h-auto bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex items-center justify-center aspect-square">
                 <FaImage className="text-gray-400 dark:text-gray-500 text-6xl"/>
              </div>
          )}
        </div>

        {/* Columna de Detalles */}
        <div className="md:col-span-2 space-y-3 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
          <p><strong>ID:</strong> {product.id}</p>
          <p>
            <strong>Categoría:</strong> 
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm rounded-full">
              {product.category ? product.category.name : 'Sin categoría'}
            </span>
          </p>
          <p><strong>Precio:</strong> <span className="font-semibold text-lg">{formatPrice(product.price)}</span></p>
          <p><strong>Stock Actual:</strong> <span className="font-semibold text-lg">{product.stock}</span></p>
          <p><strong>Descripción:</strong></p>
          <p className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-md">{product.description || 'No disponible.'}</p>

          {/* Sección para reducir stock */}
          <div className="pt-4 border-t dark:border-gray-600">
             <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">Ajustar Stock</h3>
             {actionError && <div className="text-red-600 dark:text-red-400 text-sm mb-2">{actionError}</div>}
             {actionMessage && <div className="text-green-600 dark:text-green-400 text-sm mb-2">{actionMessage}</div>}
             <div className="flex items-center space-x-2">
                <label htmlFor="reduceAmount" className="text-sm">Reducir en:</label>
                 <input
                   type="number"
                   id="reduceAmount"
                   min="1" // No permitir reducir 0 o menos
                   value={reduceAmount}
                   onChange={(e) => setReduceAmount(parseInt(e.target.value) || 1)} // Asegurar que sea número > 0
                   className="p-2 border rounded-md w-20 text-sm dark:bg-gray-700 dark:border-gray-600"
                 />
                 <button
                   onClick={handleReduceStock}
                   className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 text-sm transition"
                   disabled={product.stock === 0} // Deshabilitar si no hay stock
                 >
                   Aplicar Reducción
                 </button>
             </div>
          </div>

          {/* Botón para editar */}
           <div className="pt-4">
             <Link 
                to={`/productos/edit/${product.id}`} 
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm transition inline-flex items-center"
              >
                <FaEdit className="mr-2"/> Editar Producto
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;