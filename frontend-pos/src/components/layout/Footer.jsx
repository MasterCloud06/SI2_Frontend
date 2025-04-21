// Footer.jsx
import React from 'react';


function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>SmartPOS</span>
            </div>
            <p className="text-gray-500 mb-4">
              Sistema de punto de venta inteligente con tecnología avanzada de reconocimiento de voz y recomendaciones personalizadas.
            </p>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white text-lg mb-2">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Características</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Precios</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Testimonios</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Clientes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Integraciones</a></li>
            </ul>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white text-lg mb-2">Soporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Documentación</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contacto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Estado del Sistema</a></li>
            </ul>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white text-lg mb-2">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Acerca de</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Carreras</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Prensa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500">© 2025 SmartPOS. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-300 hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
