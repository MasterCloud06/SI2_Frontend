// src/pages/Carrito/Carrito.jsx
import React, { useState, useEffect } from 'react';
import api from '../../lib/axios'; // ✅ Usamos axios centralizado
import CarritoItem from './CarritoItem';
import CarritoResumen from './CarritoResumen';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const usuarioId = 1; // 🔐 Reemplazar con ID dinámico del usuario autenticado (desde contexto o token)

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const response = await api.get(`/carrito/${usuarioId}/`);
        const { items, total } = response.data;
        setProductos(items);
        setTotal(total);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    };

    fetchCarrito();
  }, []);

  const handleCheckout = () => {
    console.log("Ir a pagar");
    // Aquí podrías navegar a una ruta tipo: navigate("/checkout")
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Mi Carrito</h2>

      <ul className="space-y-4">
        {productos.map(item => (
          <CarritoItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6">
        <CarritoResumen total={total} />
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Ir a Pagar
        </button>
      </div>
    </div>
  );
}

export default Carrito;
