import React, { useState } from 'react';
import './styles/App.css';
import './styles/Create.css';
import Sidebar from './componentes/Sidebar';
import Login from './vistas/Login';
import Default from './vistas/Default';
import { Routes, Route, useLocation } from "react-router-dom";

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

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // No renderizar la barra de navegación en la página de login
  const showSidebar = location.pathname !== '/';

  console.log('Location:', location.pathname);
  console.log('Show Sidebar:', showSidebar);

  return (
    <>
      {showSidebar && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />

        <Route path="/clients" element={<ClientList />} />
        <Route path="/createClient" element={<NewClient />} />

        <Route path="/orders" element={<OrderList />} />
        <Route path="/createOrder" element={<NewOrder />} />

        <Route path="/products" element={<ProductList />} />
        <Route path="/createProduct" element={<NewProduct />} />

        <Route path="/vendors" element={<VendorList />} />
        <Route path="/createVendor" element={<NewVendor />} />
        
        <Route path="/createUser" element={<CreateUser />} />

        <Route path="*" element={<Default />} />
      </Routes>
    </>
  );
}

export default App;