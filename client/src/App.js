import React, { useState } from 'react';
import './styles/App.css';
import './styles/Create.css';
import Sidebar from './componentes/Sidebar';
import Login from './vistas/Login';
import Default from './vistas/Default';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from './componentes/ProtectedRoute'; // Asegúrate de importar el componente ProtectedRoute

import NewClient from './vistas/NewClient';
import ClientList from './vistas/ClientList';

import NewOrder from './vistas/NewOrder';
import OrderList from './vistas/OrderList';

import NewProduct from './vistas/NewProduct';
import ProductList from './vistas/ProductList';

import NewVendor from './vistas/NewVendor';
import VendorList from './vistas/VendorList';

import CreateUser from './vistas/CreateUser';
import Dashboard from './vistas/Dashboard';
import Config from './vistas/Config';

function App() {
  console.log(localStorage.getItem('user'));


  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // No renderizar la barra de navegación en la página de login y 404
  const showSidebar = location.pathname !== '/' && location.pathname !== '/404';

  console.log('Location:', location.pathname);
  console.log('Show Sidebar:', showSidebar);

  return (
    <>
      {showSidebar && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/clients" element={
          <ProtectedRoute>
            <ClientList />
          </ProtectedRoute>
        } />
        <Route path="/createClient" element={
          <ProtectedRoute>
            <NewClient />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        } />
        <Route path="/createOrder" element={
          <ProtectedRoute>
            <NewOrder />
          </ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path="/createProduct" element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        } />
        <Route path="/vendors" element={
          <ProtectedRoute>
            <VendorList />
          </ProtectedRoute>
        } />
        <Route path="/createVendor" element={
          <ProtectedRoute requiredRole="admin">
            <NewVendor />
          </ProtectedRoute>
        } />
        <Route path="/createUser" element={
          <ProtectedRoute requiredRole="admin">
            <CreateUser />
          </ProtectedRoute>
        } />
        <Route path="/config" element={
          <ProtectedRoute requiredRole="admin">
            <Config />
          </ProtectedRoute>
        } />
        <Route path="/404" element={<Default />} />

        {/*redirigir a /404 si no existe la ruta*/}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;