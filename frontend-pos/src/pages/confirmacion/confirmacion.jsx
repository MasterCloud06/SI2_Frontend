// src/pages/Confirmacion/Confirmacion.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Confirmacion() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">¡Gracias por tu compra!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Tu pago ha sido procesado exitosamente.
        </p>
        <Link
          to="/productos/list"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Volver a productos
        </Link>
      </div>
    </div>
  );
}

export default Confirmacion;
