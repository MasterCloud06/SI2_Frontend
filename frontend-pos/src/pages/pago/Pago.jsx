// src/pages/Pago/Pago.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Pago() {
  const paypalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Renderiza el botón de PayPal
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '20.00', // 💲 Reemplaza con el total dinámico
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          console.log('Pago aprobado:', details);

          // 🔁 Aquí puedes hacer un POST a tu backend para registrar la venta
          // await api.post('/ventas/', { total: details.purchase_units[0].amount.value });

          navigate('/confirmacion');
        },
        onError: (err) => {
          console.error('Error en el pago:', err);
        },
      }).render(paypalRef.current);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Confirmar Pago</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Selecciona tu método de pago</p>
        <div ref={paypalRef}></div>
      </div>
    </div>
  );
}

export default Pago;
