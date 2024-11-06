import React, { useState } from 'react';
import './styles/App.css';
import Sidebar from './componentes/Sidebar';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import Default from './componentes/Default';
import { Routes, Route } from "react-router-dom";

import NewClient from './componentes/NewClient';
import ClientList from './componentes/ClientList';

import NewOrder from './componentes/NewOrder';
import OrderList from './componentes/OrderList';

import NewProduct from './componentes/NewProduct';
import ProductList from './componentes/ProductList';

import NewVendor from './componentes/NewVendor';
import VendorList from './componentes/VendorList';




function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
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
        


        <Route path="*" element={<Default />} />
      </Routes>
    </>
  );
}

export default App;
