// src/pages/Pago/Pago.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Pago() {
  const [tarjetaInfo, setTarjetaInfo] = useState('');

  const handlePago = () => {
    axios.post('/api/pago', { tarjeta_info: tarjetaInfo })
      .then(response => {
        console.log(response.data);
        // Redirigir a la página de confirmación
      })
      .catch(error => console.error('Error en el pago:', error));
  };

  return (
    <div>
      <h2>Pagar</h2>
      <input 
        type="text" 
        placeholder="Número de tarjeta" 
        value={tarjetaInfo}
        onChange={e => setTarjetaInfo(e.target.value)} 
      />
      <button onClick={handlePago}>Confirmar Pago</button>
    </div>
  );
}

export default Pago;
