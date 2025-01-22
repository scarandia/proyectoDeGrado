import React, { useState } from 'react';
import './styles/App.css';
import './styles/Create.css';
import Sidebar from './componentes/Sidebar';
import Login from './vistas/Login';
import Default from './vistas/Default';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from './componentes/ProtectedRoute';

import NewClient from './vistas/NewClient';
import ClientList from './vistas/ClientList';
import DetailView from './vistas/DetailView';

import NewOrder from './vistas/NewOrder';
import OrderList from './vistas/OrderList';

import NewProduct from './vistas/NewProduct';
import ProductList from './vistas/ProductList';

import NewVendor from './vistas/NewVendor';
import VendorList from './vistas/VendorList';

import CreateUser from './vistas/CreateUser';
import Dashboard from './vistas/Dashboard';
import Reports from './vistas/Reports';
import Unauthorized from './vistas/Unauthorized';

function App() {
  console.log(localStorage.getItem('user'));

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const clientFields = [
    { key: 'nombreCliente', label: 'Nombre' },
    { key: 'apellidoCliente', label: 'Apellido' },
    { key: 'tipoNegocio', label: 'Tipo de Negocio' },
    { key: 'nombreNegocio', label: 'Nombre de Negocio' },
    { key: 'contacto.telefono', label: 'Contacto' },
    { key: 'contacto.email', label: 'Correo' },
    { key: 'direccion.calle', label: 'Dirección' },
  ];

  const orderFields = [
    { key: 'orderId', label: 'ID de Orden' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'productos', label: 'Productos' },
    { key: 'total', label: 'Total' },
    { key: 'fecha', label: 'Fecha' },
  ];

  const productFields = [
    { key: 'nombreProducto', label: 'Nombre del Producto' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'precio', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'descripcion', label: 'Descripción' },
  ];

  const vendorFields = [
    { key: 'nombreVendedor', label: 'Nombre del Vendedor' },
    { key: 'empresa', label: 'Empresa' },
    { key: 'contacto.telefono', label: 'Contacto' },
    { key: 'contacto.email', label: 'Correo' },
    { key: 'direccion.calle', label: 'Dirección' },
  ];

  const showSidebar = location.pathname !== '/' && location.pathname !== '/404' && location.pathname !== '/unauthorized';

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
        <Route path="/client/:id" element={
          <ProtectedRoute>
            <DetailView entityType="Cliente" apiEndpoint="http://localhost:5000/api/clientes" fields={clientFields} />
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
        <Route path="/order/:id" element={
          <ProtectedRoute>
            <DetailView entityType="Pedido" apiEndpoint="http://localhost:5000/api/orders" fields={orderFields} />
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
        <Route path="/product/:id" element={
          <ProtectedRoute>
            <DetailView entityType="Producto" apiEndpoint="http://localhost:5000/api/products" fields={productFields} />
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
        <Route path="/vendor/:id" element={
          <ProtectedRoute>
            <DetailView entityType="Vendedor" apiEndpoint="http://localhost:5000/api/vendors" fields={vendorFields} />
          </ProtectedRoute>
        } />
        <Route path="/createVendor" element={
          // <ProtectedRoute requiredRole="admin">
          <NewVendor />
          // </ProtectedRoute>
        } />
        <Route path="/createUser" element={
          // <ProtectedRoute requiredRole="admin">
          <CreateUser />
          // </ProtectedRoute>
        } />
        <Route path="/reports" element={
          // <ProtectedRoute requiredRole="admin">
          <Reports />
          // </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={
          // <ProtectedRoute requiredRole="admin">
          <Unauthorized />
          // </ProtectedRoute>
        } />
        <Route path="/404" element={<Default />} />

        {/*redirigir a /404 si no existe la ruta*/}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;