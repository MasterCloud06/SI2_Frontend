import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';

function Sidebar({ isCollapsed, onToggleCollapse }) {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleToggleMenu = (menuKey) => {
    if (!isCollapsed) {
      setOpenMenu(openMenu === menuKey ? null : menuKey);
    }
  };

  const toggleCollapse = () => {
    onToggleCollapse(!isCollapsed);
    setOpenMenu(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Clases de estilo
  const sidebarBg = "bg-gray-900";
  const itemHoverBg = "hover:bg-gray-700";
  const itemActiveBg = "bg-gray-700";
  const textColor = "text-gray-200";
  const textHoverColor = "hover:text-white";
  const textActiveColor = "text-white";
  const iconColor = "text-gray-400";
  const borderColor = "border-gray-700";
  const linkBaseClasses = `flex items-center w-full px-4 py-3 ${textColor} ${textHoverColor} ${itemHoverBg} rounded transition duration-150 ease-in-out text-sm`;
  const activeLinkClasses = `${itemActiveBg} ${textActiveColor} font-medium`;
  const subLinkBaseClasses = `flex items-center py-2 pl-12 pr-4 ${textColor} ${textHoverColor} ${itemHoverBg} rounded transition duration-150 ease-in-out text-xs`;
  const activeSubLinkClasses = `${itemActiveBg} ${textActiveColor}`;

  const getNavLinkClass = ({ isActive }) =>
    `${linkBaseClasses} ${isCollapsed ? 'justify-center' : ''} ${isActive ? activeLinkClasses : ''}`;

  const getSubNavLinkClass = ({ isActive }) =>
    `${subLinkBaseClasses} ${isActive ? activeSubLinkClasses : ''}`;

  // Menú desplegable
  const menuItems = [
    {
      key: 'usuarios',
      label: 'Usuarios',
      icon: FaUsers,
      subItems: [
        { path: '/usuarios/list', label: 'Lista de Usuarios' },
        { path: '/usuarios/create', label: 'Crear Usuario' },
        { path: '/usuarios/detail', label: 'Detalle del Usuario' },
        { path: '/usuarios/manage', label: 'Gestión de Roles' },
      ]
    },
    {
      key: 'productos',
      label: 'Productos',
      icon: FaBoxOpen,
      subItems: [
        { path: '/productos/list', label: 'Lista de Productos' },
        { path: '/productos/detail', label: 'Detalle del Producto' },
        { path: '/productos/manage', label: 'Gestión de Productos' },
      ]
    },
    {
      key: 'ventas',
      label: 'Ventas',
      icon: FaShoppingCart,
      subItems: [
        { path: '/ventas/list', label: 'Lista de Ventas' },
        { path: '/ventas/create', label: 'Crear Venta' },
      ]
    },
    {
      key: 'reportes',
      label: 'Reportes',
      icon: FaChartBar,
      subItems: [
        { path: '/reportes/list', label: 'Lista de Reportes' },
        { path: '/reportes/create', label: 'Crear Reporte' },
      ]
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${sidebarBg} ${textColor} transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 h-16 border-b ${borderColor}`}>
        <Link to="/" className={`flex items-center text-xl font-semibold text-white hover:text-gray-300 ${isCollapsed ? 'hidden' : 'block'}`}>
          <span className="mr-2">📊</span>
          SmartPOS
        </Link>
        <button
          onClick={toggleCollapse}
          className={`p-2 rounded ${itemHoverBg} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
          aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          <FaBars className={`${iconColor}`} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={getNavLinkClass}
          title={isCollapsed ? 'Dashboard' : ''}
        >
          <FaTachometerAlt className={`${iconColor} group-hover:text-white ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span className="truncate">Dashboard</span>}
        </NavLink>

        {/* Enlace al Carrito */}
        <NavLink
          to="/carrito"
          className={getNavLinkClass}
          title={isCollapsed ? 'Carrito' : ''}
        >
          <FaShoppingCart className={`${iconColor} group-hover:text-white ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span className="truncate">Mi Carrito</span>}
        </NavLink>

        {/* Menús desplegables */}
        {menuItems.map((item) => (
          <div key={item.key}>
            <button
              onClick={() => handleToggleMenu(item.key)}
              className={`${linkBaseClasses} justify-between focus:outline-none ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className={`flex items-center ${isCollapsed ? 'w-full justify-center' : ''}`}>
                <item.icon className={`${iconColor} group-hover:text-white ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </span>
              {!isCollapsed && (
                openMenu === item.key ? <FaChevronDown size="0.8em" /> : <FaChevronRight size="0.8em" />
              )}
            </button>
            {!isCollapsed && (
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === item.key ? 'max-h-96' : 'max-h-0'}`}
                style={{ transitionProperty: 'max-height' }}
              >
                <ul className="pt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <NavLink to={subItem.path} className={getSubNavLinkClass} end>
                        <span className="truncate">{subItem.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className={`p-2 border-t ${borderColor}`}>
        <button
          onClick={handleLogout}
          className={`${linkBaseClasses} w-full ${isCollapsed ? 'justify-center' : ''} hover:bg-red-800`}
          title={isCollapsed ? 'Cerrar Sesión' : ''}
        >
          <FaSignOutAlt className={`${iconColor} group-hover:text-white ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span className="truncate">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};

export default Sidebar;
