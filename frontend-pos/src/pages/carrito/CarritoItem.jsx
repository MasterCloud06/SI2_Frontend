// src/pages/Carrito/CarritoItem.jsx
import React from 'react';

function CarritoItem({ item }) {
  return (
    <li className="border p-4 rounded-md shadow-sm">
      <span className="font-medium">{item.producto_nombre}</span> x <strong>{item.cantidad}</strong> – 
      <span className="ml-2">Bs. {item.producto_precio}</span>
    </li>
  );
}

export default CarritoItem;
