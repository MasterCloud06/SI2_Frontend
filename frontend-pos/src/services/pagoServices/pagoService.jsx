// src/services/pagoService.jsx
import api from '../lib/axios';

export const realizarPago = (total, tarjetaInfo) => {
  return api.post('/pago/', {
    total,
    tarjeta_info: tarjetaInfo,
  });
};
