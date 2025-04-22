// src/pages/ventas/VentaList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';

function VentaList() {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await api.get('/ventas/');
        setVentas(response.data);
      } catch (err) {
        setError('Error al cargar las ventas');
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Lista de Ventas</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td className="px-4 py-2 border">{venta.id}</td>
              <td className="px-4 py-2 border">Bs. {venta.total}</td>
              <td className="px-4 py-2 border">{venta.status}</td>
              <td className="px-4 py-2 border">{new Date(venta.created_at).toLocaleString()}</td>
              <td className="px-4 py-2 border">
                <Link to={`/ventas/detail/${venta.id}`} className="text-blue-600 hover:text-blue-800">Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VentaList;
