// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white hover:text-gray-300">
            SmartPOS
          </Link>
        </div>
        
        {/* Enlaces de navegación */}
        <div className="hidden md:flex space-x-6">
          <Link to="/features" className="hover:text-gray-300">Características</Link>
          <Link to="/pricing" className="hover:text-gray-300">Precios</Link>
          <Link to="/support" className="hover:text-gray-300">Soporte</Link>
        </div>

        {/* Icono de menú para dispositivos móviles */}
        <div className="md:hidden">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
