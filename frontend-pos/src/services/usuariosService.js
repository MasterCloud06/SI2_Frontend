// src/services/usuariosService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Asegúrate de que tu backend esté corriendo en este puerto y URL
});

export const loginUser = async (data) => {
  try {
    const response = await api.post('/usuarios/login/', data);
    return response.data;
  } catch (error) {
    // Puedes implementar un manejo de errores más específico
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post('/usuarios/register/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
