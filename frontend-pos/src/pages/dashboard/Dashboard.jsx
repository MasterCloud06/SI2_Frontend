  import React, { useState, useEffect } from 'react'; 
  import Sidebar from '../../components/layout/Sidebar';
  import TailwindProductCard from '../../components/common/TailwindProductCard'; // Importar tarjeta de producto

  // Importar imágenes o usar placeholder
  import imgCafe from '../../assets/images/cafe.jpg';     
  import imgLaptop from '../../assets/images/laptop.jpg'; 
  import imgPlaceholder from '../../assets/images/placeholder.png'; 

  // Mapeo de imágenes (como en Home.jsx, ajusta según sea necesario)
  const productImages = {
    1: imgCafe,
    2: imgLaptop,
    // ... más mapeos
  };

  function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [summaryProducts, setSummaryProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de carga de datos para el resumen del dashboard
        const fetchSummaryData = async () => {
            setLoading(true);
            // Aquí podrías llamar a un endpoint específico del dashboard
            // o reutilizar la llamada a /api/products/ y tomar algunos
            const sampleDataFromApi = [
              { id: 1, name: "Café Americano", description: "Café clásico...", price: "15.00", stock: 55 },
              { id: 2, name: "Laptop Ultrabook", description: "Potente y ligera...", price: "7500.50", stock: 8 },
              // Puedes añadir más o menos productos para el resumen
            ];

            const productsWithImages = sampleDataFromApi.map(p => ({
                ...p,
                imageUrl: productImages[p.id] || placeholderImage 
            }));

            setSummaryProducts(productsWithImages);
            setLoading(false);
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
              {/* Puedes añadir otras tarjetas de resumen aquí */}
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
              {/* Ejemplo: Añadir un gráfico o tabla aquí */}
          </div>
        </main>
      </div>
    );
  }

  export default Dashboard;