// src/components/common/TailwindProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaBoxOpen, FaTag, FaWarehouse, FaEllipsisV } from 'react-icons/fa';
import placeholderImage from '../../assets/images/placeholder.png'; 

export default function TailwindProductCard({ product }) {
  
  // --- NUEVO: Protección si product no está definido ---
  if (!product) {
    // Puedes retornar null o un componente de carga/esqueleto
    return null; 
    // Alternativa: return <div className="max-w-sm h-80 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-700 animate-pulse m-2"></div>; 
  }

  // Funciones de formato y estado (igual que antes)
  const getStockColor = (stock) => { /* ... */ };
  const stockStatusText = (stock) => { /* ... */ };
  const formatPrice = (price) => { /* ... */ };

  // Usa product.imageUrl si existe (vendrá de Home.jsx), sino usa placeholder
  const imageUrl = product.imageUrl || placeholderImage;

  return (
    // Card Container
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 m-2 flex flex-col">
        {/* Resto del código de la tarjeta (igual que la versión anterior) */}
        {/* Card Header */}
        <div className="flex items-center justify-between p-3 md:p-4">
            <div className="flex items-center overflow-hidden">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2 md:mr-3 flex-shrink-0">
                    {product.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <h3 className="text-sm md:text-md font-semibold text-gray-900 dark:text-white truncate" title={product.name}>
                    {product.name}
                    </h3>
                </div>
            </div>
            <button /* ... Botón Ellipsis ... */ > <FaEllipsisV /> </button>
        </div>

        {/* Card Media */}
        <div className="relative">
            <img 
                className="w-full h-40 md:h-48 object-cover" 
                src={imageUrl} 
                alt={product.name} 
                loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
                {formatPrice(product.price)}
            </div>
        </div>

        {/* Card Content */}
        <div className="p-3 md:p-4 flex-grow">
            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {product.description || "No hay descripción disponible."}
            </p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center text-sm font-bold text-gray-800 dark:text-white">
                <FaTag className="mr-1 text-gray-500 dark:text-gray-400" />
                {formatPrice(product.price)}
            </div>
            <div className={`flex items-center text-xs font-medium ${getStockColor(product.stock)}`}>
                <FaWarehouse className="mr-1" />
                {stockStatusText(product.stock)} ({product.stock})
            </div>
        </div>
    </div>
  );
}

// PropTypes (igual que antes, imageUrl es opcional)
TailwindProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string, // Sigue siendo opcional porque podríamos usar el placeholder
  }), // Hacemos 'product' opcional aquí también para que la comprobación inicial funcione sin error de propTypes
};