// src/pages/reportes/ReporteList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReporteList() {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reportes/');
        setReportes(response.data);
      } catch (err) {
        setError('Error al cargar los reportes');
        console.error(err);
      }
    };

    fetchReportes();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Lista de Reportes</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Título</th>
            <th className="px-4 py-2 border">Tipo de Reporte</th>
            <th className="px-4 py-2 border">Fecha Generado</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td className="px-4 py-2 border">{reporte.id}</td>
              <td className="px-4 py-2 border">{reporte.titulo}</td>
              <td className="px-4 py-2 border">{reporte.tipo_reporte}</td>
              <td className="px-4 py-2 border">{new Date(reporte.fecha_generado).toLocaleString()}</td>
              <td className="px-4 py-2 border">
                <Link to={`/reportes/detail/${reporte.id}`} className="text-blue-600 hover:text-blue-800">Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReporteList;
