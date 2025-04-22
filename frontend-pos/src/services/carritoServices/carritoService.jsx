// src/services/carritoService.jsx
import api from '../lib/axios';

export const getCarrito = (usuarioId) => {
  return api.get(`/carrito/${usuarioId}/`);
};

export const agregarProducto = (usuarioId, productoId, cantidad) => {
  return api.post(`/carrito/${usuarioId}/`, {
    producto_id: productoId,
    cantidad,
  });
};
