import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className={location.pathname === '/home' ? 'active' : ''}>
            <Link to="/home">Dashboard</Link>
          </li>
          <li className={location.pathname === '/clients' ? 'active' : ''}>
            <Link to="/clients">Clientes</Link>
          </li>
          <li className={location.pathname === '/orders' ? 'active' : ''}>
            <Link to="/orders">Pedidos</Link>
          </li>
          <li className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">Productos</Link>
          </li>
          <li className={location.pathname === '/vendors' ? 'active' : ''}>
            <Link to="/vendors">Vendedores</Link>
          </li>
        </ul>
        <button
          className="toggle-button"
          onClick={toggleSidebar}
        >
          {isOpen ? 'Cerrar' : 'Abrir'}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
