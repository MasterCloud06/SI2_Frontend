// src/pages/Carrito/CarritoItem.jsx
import React from 'react';

function CarritoItem({ item }) {
  return (
    <li>
      {item.producto_nombre} x {item.cantidad} - ${item.producto_precio}
    </li>
  );
}

export default CarritoItem;
