// src/services/carritoService.jsx
import axios from 'axios';

export const getCarrito = (usuarioId) => {
  return axios.get(`/api/carrito/${usuarioId}`);
};

export const agregarProducto = (usuarioId, productoId, cantidad) => {
  return axios.post(`/api/carrito/${usuarioId}`, { producto_id: productoId, cantidad });
};
