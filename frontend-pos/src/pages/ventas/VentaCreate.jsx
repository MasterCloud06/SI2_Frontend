// src/pages/ventas/VentaCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';

function VentaCreate() {
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/ventas/', {
        total,
        status,
      });
      setMessage('Venta creada exitosamente');
      console.log(response.data);
    } catch (err) {
      setError('Error al crear la venta');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Crear Venta</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="total" className="block text-sm">Total</label>
          <input
            type="number"
            id="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Crear Venta</button>
      </form>
    </div>
  );
}

export default VentaCreate;
