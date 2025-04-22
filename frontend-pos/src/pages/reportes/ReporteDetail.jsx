// src/pages/reportes/ReporteDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/axios';

function ReporteDetail() {
  const { reporteId } = useParams();
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await api.get(`/reportes/${reporteId}/`);
        setReporte(response.data);
      } catch (err) {
        setError('Error al cargar el reporte');
      }
    };
    fetchReporte();
  }, [reporteId]);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Detalle del Reporte</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {reporte && (
        <div>
          <p><strong>Título:</strong> {reporte.titulo}</p>
          <p><strong>Descripción:</strong> {reporte.descripcion}</p>
          <p><strong>Tipo de Reporte:</strong> {reporte.tipo_reporte}</p>
          <p><strong>Fecha Generado:</strong> {new Date(reporte.fecha_generado).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default ReporteDetail;
