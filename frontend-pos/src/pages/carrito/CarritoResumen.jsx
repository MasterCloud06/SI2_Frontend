// src/pages/Carrito/CarritoResumen.jsx
import React from 'react';

function CarritoResumen({ total }) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-inner">
      <h3 className="text-lg font-semibold">Resumen</h3>
      <p className="text-xl mt-2">Total: <strong>Bs. {total.toFixed(2)}</strong></p>
    </div>
  );
}

export default CarritoResumen;
