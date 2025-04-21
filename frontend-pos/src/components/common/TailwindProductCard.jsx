// src/components/TailwindProductCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';
import { FaTag, FaWarehouse, FaEllipsisV, FaShoppingCart } from 'react-icons/fa';

import placeholderImage from '../../assets/images/placeholder.png';
import { formatPrice, stockStatusText, getStockColor } from '../../utils/formatters';

export default function TailwindProductCard({ product }) {
  const navigate = useNavigate();
  const { loggedIn, user } = useAuth();

  const imageUrl     = product.imageUrl || placeholderImage;
  const currentStock = product.stock ?? -1;

  const handleAddToCart = async () => {
    if (!loggedIn) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      navigate('/login');
      return;
    }

    const usuarioId = user?.id;
    if (!usuarioId) {
      console.error('ID de usuario no disponible');
      return;
    }

    try {
      await api.post(
        `/carrito/${usuarioId}/`,
        { producto_id: product.id, cantidad: 1 }
      );
      alert(`${product.name} añadido al carrito`);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('No se pudo añadir al carrito');
    }
  };

  if (!product) return null;

  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 m-2 flex flex-col transition-shadow duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center overflow-hidden mr-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2 md:mr-3">
            {product.name?.charAt(0).toUpperCase() || '?' }
          </div>
          <h3
            className="text-sm md:text-md font-semibold text-gray-900 dark:text-white truncate"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>
        <button
          className="p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          onClick={e => { e.stopPropagation(); console.log('Opciones para producto ID:', product.id); }}
          aria-label="Opciones del producto"
        >
          <FaEllipsisV />
        </button>
      </div>

      {/* Imagen */}
      <div className="relative group">
        <img
          className="w-full h-40 md:h-48 object-cover"
          src={imageUrl}
          alt={product.name}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded shadow">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Descripción */}
      <div className="p-3 md:p-4 flex-grow">
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {product.description || 'No hay descripción disponible.'}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 px-3 md:px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center text-sm font-bold text-gray-800 dark:text-white"
            title={`Precio: ${formatPrice(product.price)}`}
          >
            <FaTag className="mr-1 text-gray-500 dark:text-gray-400" />
            {formatPrice(product.price)}
          </div>
          <div
            className={`flex items-center text-xs font-medium ${getStockColor(currentStock)}`}
            title={`Stock: ${currentStock >= 0 ? currentStock : 'N/A'}`}
          >
            <FaWarehouse className="mr-1" />
            {stockStatusText(currentStock)}
            {currentStock >= 0 ? ` (${currentStock})` : ''}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
        >
          <FaShoppingCart className="mr-2" />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

TailwindProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    stock: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
};
