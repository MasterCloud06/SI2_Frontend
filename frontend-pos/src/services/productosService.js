// src/services/productosService.js
import api from '../lib/axios';

export const getProducts = () => api.get('/productos/').then(res => res.data);
export const getProductById = (id) => api.get(`/productos/${id}/`).then(res => res.data);
export const createProduct = (data) => api.post('/productos/', data).then(res => res.data);
export const updateProduct = (id, data) => api.put(`/productos/${id}/`, data).then(res => res.data);
export const deleteProduct = (id) => api.delete(`/productos/${id}/`).then(res => res.data);
export const reduceStock = (id, amount) =>
  api.post(`/productos/${id}/reduce_stock/`, { amount }).then(res => res.data);
