// src/pages/reportes/ReporteCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ReporteCreate() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoReporte, setTipoReporte] = useState('PDF');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/reportes/', {
        titulo,
        descripcion,
        tipo_reporte: tipoReporte,
      });
      setMessage('Reporte creado exitosamente');
      console.log(response.data);
    } catch (err) {
      setError('Error al crear el reporte');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl mb-4">Crear Reporte</h1>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
      {message && <div className="bg-green-200 text-green-800 p-2 mb-4">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tipo_reporte" className="block text-sm">Tipo de Reporte</label>
          <select
            id="tipo_reporte"
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">Crear Reporte</button>
      </form>
    </div>
  );
}

export default ReporteCreate;
