import React, { useState } from 'react';
import './styles/App.css';
import './styles/Create.css';
import Sidebar from './componentes/Sidebar';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import Default from './componentes/Default';
import { Routes, Route, useLocation } from "react-router-dom";

import NewClient from './componentes/NewClient';
import ClientList from './componentes/ClientList';

import NewOrder from './componentes/NewOrder';
import OrderList from './componentes/OrderList';

import NewProduct from './componentes/NewProduct';
import ProductList from './componentes/ProductList';

import NewVendor from './componentes/NewVendor';
import VendorList from './componentes/VendorList';
import CreateUser from './componentes/CreateUser';

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
        <Route path="/home" element={<Inicio />} />

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