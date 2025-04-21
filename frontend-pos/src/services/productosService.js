// src/services/productosService.js
import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/productos/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/productos/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post('/productos/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await api.put(`/productos/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/productos/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reduceStock = async (id, amount) => {
  try {
    const response = await api.post(`/productos/${id}/reduce_stock/`, { amount });
    return response.data;
  } catch (error) {
    throw error;
  }
};
