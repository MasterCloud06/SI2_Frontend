// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import TailwindProductCard from '../components/common/TailwindProductCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Imágenes
import imgCafe from '../assets/images/cafe.jpg';
import imgLaptop from '../assets/images/laptop.jpg';
import imgCamisa from '../assets/images/camisa.jpg';
import imgTeclado from '../assets/images/teclado.jpg';
import imgMonitor from '../assets/images/monitor.jpg';
import placeholderImage from '../assets/images/placeholder.png';

const productImages = {
  1: imgCafe,
  2: imgLaptop,
  3: imgCamisa,
  4: imgTeclado,
  5: imgMonitor,
};

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedIn, user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/productos/');
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        const withImages = data.map(p => ({
          ...p,
          imageUrl: productImages[p.id] || placeholderImage,
        }));
        setProducts(withImages);
      } catch (err) {
        console.error("Error en fetchProducts:", err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <nav className={`fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
          <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-semibold">SmartPOS</div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="hover:text-gray-300">Características</a>
              <a href="#ai-features" className="hover:text-gray-300">IA</a>
              <a href="#pricing" className="hover:text-gray-300">Precios</a>
              <a href="#support" className="hover:text-gray-300">Soporte</a>
              <a href="#support" className="hover:text-gray-300">Soporte2fg</a>
            </div>
            <div className="flex space-x-4">
              {!loggedIn ? (
                <>
                  <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">Iniciar Sesión</Link>
                  <Link to="/register" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Registrarse</Link>
                </>
              ) : (
                <span className="text-sm text-gray-300">Hola, {user?.username || 'Usuario'} 👋</span>
              )}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="pt-20">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-16 md:py-24 px-4">
            <div className="max-w-screen-lg mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Sistema POS <span className="text-yellow-300">Inteligente</span>
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Revoluciona tu punto de venta con reconocimiento de voz y recomendaciones personalizadas potenciadas por IA.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-400 inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Comenzar Ahora
                </Link>
                <button className="bg-transparent text-white py-2 px-6 rounded border-2 border-white hover:bg-white hover:text-gray-800">
                  Ver Demostración
                </button>
              </div>
            </div>
          </div>

          {/* Productos */}
          <section id="products" className="py-12 md:py-16 px-4 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-8 md:mb-12">
                Nuestros Productos Destacados
              </h2>

              {loading && <p className="text-center text-gray-600 dark:text-gray-400">Cargando productos...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && !error && products.length === 0 && (
                <p className="text-center text-gray-600 dark:text-gray-400">No hay productos para mostrar.</p>
              )}
              {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                  {products.map(product => (
                    <TailwindProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;