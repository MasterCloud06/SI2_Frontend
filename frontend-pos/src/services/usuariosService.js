// src/services/usuariosService.js
import api from '../lib/axios';

export const loginUser = (data) => api.post('/usuarios/login/', data).then(res => res.data);
export const registerUser = (data) => api.post('/usuarios/register/', data).then(res => res.data);
