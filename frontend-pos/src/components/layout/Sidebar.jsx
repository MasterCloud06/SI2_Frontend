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

  // Estilos base
  const sidebarBg = "bg-gray-900";
  const textColor = "text-gray-200";
  const textHover = "hover:text-white";
  const itemHoverBg = "hover:bg-gray-700";
  const activeItemBg = "bg-gray-700";
  const borderColor = "border-gray-700";
  const iconColor = "text-gray-400";

  const linkBase = `flex items-center w-full px-4 py-3 ${textColor} ${textHover} ${itemHoverBg} rounded transition text-sm`;
  const activeLink = `${activeItemBg} text-white font-medium`;

  const getNavLinkClass = ({ isActive }) =>
    `${linkBase} ${isCollapsed ? 'justify-center' : ''} ${isActive ? activeLink : ''}`;

  const getSubNavLinkClass = ({ isActive }) =>
    `flex items-center py-2 pl-12 pr-4 text-xs ${textColor} ${textHover} ${itemHoverBg} rounded transition ${isActive ? activeItemBg + ' text-white' : ''}`;

  const menuItems = [
    {
      key: 'usuarios',
      label: 'Usuarios',
      icon: FaUsers,
      subItems: [
        { path: '/usuarios/list', label: 'Lista de Usuarios' },
        { path: '/usuarios/create', label: 'Crear Usuario' },
        { path: '/usuarios/manage', label: 'Gestión de Roles' }
      ]
    },
    {
      key: 'productos',
      label: 'Productos',
      icon: FaBoxOpen,
      subItems: [
        { path: '/productos/list', label: 'Lista de Productos' },
        { path: '/productos/create', label: 'Crear Producto' },
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
          <span className="mr-2">📊</span> SmartPOS
        </Link>
        <button
          onClick={toggleCollapse}
          className={`p-2 rounded ${itemHoverBg} focus:outline-none`}
          aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          <FaBars className={iconColor} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">

        <NavLink to="/dashboard" className={getNavLinkClass} title={isCollapsed ? 'Dashboard' : ''}>
          <FaTachometerAlt className={`${iconColor} ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/carrito" className={getNavLinkClass} title={isCollapsed ? 'Carrito' : ''}>
          <FaShoppingCart className={`${iconColor} ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span>Mi Carrito</span>}
        </NavLink>

        {menuItems.map((item) => (
          <div key={item.key}>
            <button
              onClick={() => handleToggleMenu(item.key)}
              className={`${linkBase} justify-between ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className={`flex items-center ${isCollapsed ? 'w-full justify-center' : ''}`}>
                <item.icon className={`${iconColor} ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
                {!isCollapsed && <span>{item.label}</span>}
              </span>
              {!isCollapsed && (
                openMenu === item.key
                  ? <FaChevronDown size="0.8em" />
                  : <FaChevronRight size="0.8em" />
              )}
            </button>
            {!isCollapsed && (
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === item.key ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <NavLink to={subItem.path} className={getSubNavLinkClass} end>
                        <span>{subItem.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className={`p-2 border-t ${borderColor}`}>
        <button
          onClick={handleLogout}
          className={`${linkBase} w-full ${isCollapsed ? 'justify-center' : ''} hover:bg-red-800`}
          title={isCollapsed ? 'Cerrar Sesión' : ''}
        >
          <FaSignOutAlt className={`${iconColor} ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size="1.2em" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
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
