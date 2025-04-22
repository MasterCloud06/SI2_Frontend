// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import TailwindProductCard from '../../components/common/TailwindProductCard';
import api from '../../lib/axios'; // ✅ axios centralizado

// Imágenes
import imgCafe from '../../assets/images/cafe.jpg';
import imgLaptop from '../../assets/images/laptop.jpg';
import placeholderImage from '../../assets/images/placeholder.png';

// Mapeo local de imágenes
const productImages = {
  1: imgCafe,
  2: imgLaptop,
  // ...otros productos con imágenes locales
};

function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [summaryProducts, setSummaryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        // Puedes limitar la cantidad con ?limit=4 o algo similar si tu API lo permite
        const response = await api.get('/productos/');
        const productos = Array.isArray(response.data) ? response.data : response.data.results || [];

        const productosConImagen = productos.slice(0, 4).map(p => ({
          ...p,
          imageUrl: productImages[p.id] || placeholderImage
        }));

        setSummaryProducts(productosConImagen);
      } catch (err) {
        console.error('Error al cargar productos del dashboard:', err);
        setSummaryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={setIsSidebarCollapsed} 
      />
      <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Bienvenido al Dashboard
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Resumen Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"> 
          {loading ? (
            <p className="text-gray-600 dark:text-gray-400 col-span-full">Cargando resumen...</p>
          ) : summaryProducts.length > 0 ? (
            summaryProducts.map(product => (
              <TailwindProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 col-span-full">No hay productos en el resumen.</p>
          )}

          {/* Tarjeta extra (ejemplo de estadística) */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Ventas Hoy</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">Bs. 1,234.50</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Área Principal del Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Aquí puedes colocar gráficos de ventas, tablas de datos importantes, accesos directos, etc.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
