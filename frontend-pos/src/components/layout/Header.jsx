// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="header-logo text-2xl font-semibold">
          <span>SmartPOS</span>
        </div>
        <nav className="header-nav space-x-6">
          <Link to="/features" className="hover:text-gray-300">Características</Link>
          <Link to="/pricing" className="hover:text-gray-300">Precios</Link>
          <Link to="/support" className="hover:text-gray-300">Soporte</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
