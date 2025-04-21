// src/services/pagoService.jsx
import axios from 'axios';

export const realizarPago = (total, tarjetaInfo) => {
  return axios.post('/api/pago', { tarjeta_info: tarjetaInfo });
};
