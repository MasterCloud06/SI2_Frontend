// src/pages/productos/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImage, FaEdit } from 'react-icons/fa';
import api from '../../lib/axios';

function LoadingSpinner() { return <div className="p-6">Cargando...</div>; }
function ErrorDisplay({ message }) { return <div className="p-6 text-red-600">{message}</div>; }

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reduceAmount, setReduceAmount] = useState(1);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await api.get(`/productos/${productId}/`);
        setProduct(response.data);
      } catch (err) {
        setError('Error al cargar el detalle del producto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId]);

  const handleReduceStock = async () => {
    if (reduceAmount <= 0) return setActionError("La cantidad debe ser mayor a 0.");
    try {
      const response = await api.post(`/productos/${productId}/reducir-stock/`, { amount: reduceAmount });
      setProduct(response.data);
      setActionMessage(`Stock reducido exitosamente. Nuevo stock: ${response.data.stock}`);
      setReduceAmount(1);
    } catch (err) {
      setActionError(err.response?.data?.detail || 'Error al reducir stock.');
    }
  };

  const formatPrice = price => `Bs. ${parseFloat(price).toFixed(2)}`;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!product) return <div className="p-6">Producto no encontrado.</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Detalle del Producto</h1>
        <Link to="/productos/list" className="text-blue-600 flex items-center">
          <FaArrowLeft className="mr-2" /> Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full aspect-square rounded-lg" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg">
              <FaImage className="text-6xl text-gray-500" />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p><strong>Categoría:</strong> {product.category?.name || 'Sin categoría'}</p>
          <p><strong>Precio:</strong> {formatPrice(product.price)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p className="mt-4"><strong>Descripción:</strong> {product.description || 'No disponible'}</p>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Reducir Stock</h3>
            {actionError && <p className="text-red-500">{actionError}</p>}
            {actionMessage && <p className="text-green-500">{actionMessage}</p>}
            <input
              type="number"
              value={reduceAmount}
              onChange={e => setReduceAmount(Number(e.target.value))}
              className="border p-2 mr-2 rounded w-20"
              min="1"
            />
            <button onClick={handleReduceStock} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Aplicar
            </button>
          </div>

          <div className="mt-6">
            <Link to={`/productos/edit/${product.id}`} className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
              <FaEdit className="mr-2" /> Editar Producto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
