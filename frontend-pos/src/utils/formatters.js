// src/utils/formatters.js

export const formatPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) {
      return 'Bs. ---';
    }
    return `Bs. ${numericPrice.toFixed(2)}`;
  };
  
  export const stockStatusText = (stock) => {
    if (stock === null || stock === undefined || isNaN(stock)) return 'Stock N/A';
    if (stock > 20) return 'En Stock';
    if (stock > 0) return 'Stock Bajo';
    return 'Agotado';
  };
  
  export const getStockColor = (stock) => {
    if (stock === null || stock === undefined || isNaN(stock)) return 'text-gray-500 dark:text-gray-400';
    if (stock > 20) return 'text-green-600 dark:text-green-400';
    if (stock > 0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  