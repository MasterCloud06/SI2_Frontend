import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Páginas
import Home from '../pages/Home.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
// Añadí esto con los otros imports de páginas:
import Profile from '../pages/auth/Profile.jsx';

import Dashboard from '../pages/dashboard/Dashboard.jsx';

// Layouts
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

// CRUD de Usuarios
import UserList from '../pages/usuarios/UserList';
import UserDetail from '../pages/usuarios/UserDetail';
import RoleManage from '../pages/usuarios/RoleManage';
import UserCreate from '../pages/usuarios/UserCreate';
import UserEdit from '../pages/usuarios/UserEdit';

// Productos
import ProductList from '../pages/productos/ProductList';
import ProductDetail from '../pages/productos/ProductDetail';
import ProductManage from '../pages/productos/ProductManage';

//Categorias
import CategoryList from '../pages/categorias/CategoryList.jsx';
import CategoryManage from '../pages/categorias/CategoryManage.jsx';

// Ventas
import VentaList from '../pages/ventas/VentaList';
import VentaCreate from '../pages/ventas/VentaCreate';
import VentaDetail from '../pages/ventas/VentaDetail';

// Reportes
import ReporteList from '../pages/reportes/ReporteList';
import ReporteCreate from '../pages/reportes/ReporteCreate';
import ReporteDetail from '../pages/reportes/ReporteDetail';

import Carrito from '../pages/carrito/Carrito.jsx';
import Pago from '../pages/pago/Pago.jsx';
import Confirmacion from '../pages/confirmacion/confirmacion.jsx';

function AppRoutes() {
  return (
      <LayoutWrapper />
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const showFooter = location.pathname === '/';
  const showHeader = true; // Puedes ajustar esto si quieres ocultar el Header en alguna ruta

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Rutas para el CRUD de Usuarios */}
        <Route path="/usuarios/list" element={<UserList />} />
        <Route path="/usuarios/detail" element={<UserDetail />} />
        <Route path="/usuarios/manage" element={<RoleManage />} />
        <Route path="/usuarios" element={<UserList />} />
        <Route path="/usuarios/create" element={<UserCreate />  } />
        <Route path="/usuarios/edit/:id" element={<UserEdit />} />  

        {/* Rutas para Productos */}
        <Route path="/productos/list" element={<ProductList />} />
        <Route path="/productos/detail" element={<ProductDetail />} />
        <Route path="/productos/manage" element={<ProductManage />} />

        {/* Rutas para Productos */}
        <Route path="/categoria/list" element={<CategoryList />} />
        <Route path="/categoria/manage" element={<CategoryManage />} />


                {/* Rutas para Ventas */}
         <Route path="/ventas/list" element={<VentaList />} />
        <Route path="/ventas/create" element={<VentaCreate />} />
        <Route path="/ventas/detail/:ventaId" element={<VentaDetail />} />

         {/* Rutas para Reportes */}
        <Route path="/reportes/list" element={<ReporteList />} />
        <Route path="/reportes/create" element={<ReporteCreate />} />
        <Route path="/reportes/detail/:reporteId" element={<ReporteDetail />} />

      {/* Rutas de Carrito, Pago y Confirmación */}
      <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default AppRoutes;
