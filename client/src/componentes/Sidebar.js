import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setActiveMenu((prevState) => (prevState === menu ? null : menu));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className={isActive('/home') ? 'active' : ''}>
            <Link to="/home">Dashboard</Link>
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'clients' ? 'active' : ''}`}
              onClick={() => toggleSubMenu('clients')}
            >
              <Link to="/clients" className={`menu-link ${isActive('/clients') ? 'active' : ''}`}>
                Clientes
              </Link>
            </div>
            {activeMenu === 'clients' && (
              <ul className="sub-menu">
                <li className={isActive('/createClient') ? 'active' : ''}>
                  <Link to="/createClient" className={isActive('/createClient') ? 'active' : ''}>
                    Crear Cliente
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'orders' ? 'active' : ''}`}
              onClick={() => toggleSubMenu('orders')}
            >
              <Link to="/orders" className={`menu-link ${isActive('/orders') ? 'active' : ''}`}>
                Pedidos
              </Link>
            </div>
            {activeMenu === 'orders' && (
              <ul className="sub-menu">
                <li className={isActive('/createOrder') ? 'active' : ''}>
                  <Link to="/createOrder" className={isActive('/createOrder') ? 'active' : ''}>
                    Crear Pedido
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'products' ? 'active' : ''}`}
              onClick={() => toggleSubMenu('products')}
            >
              <Link to="/products" className={`menu-link ${isActive('/products') ? 'active' : ''}`}>
                Productos
              </Link>
            </div>
            {activeMenu === 'products' && (
              <ul className="sub-menu">
                <li className={isActive('/createProduct') ? 'active' : ''}>
                  <Link to="/createProduct" className={isActive('/createProduct') ? 'active' : ''}>
                    Crear Producto
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'vendors' ? 'active' : ''}`}
              onClick={() => toggleSubMenu('vendors')}
            >
              <Link to="/vendors" className={`menu-link ${isActive('/vendors') ? 'active' : ''}`}>
                Vendedores
              </Link>
            </div>
            {activeMenu === 'vendors' && (
              <ul className="sub-menu">
                <li className={isActive('/createVendor') ? 'active' : ''}>
                  <Link to="/createVendor" className={isActive('/createVendor') ? 'active' : ''}>
                    Crear Vendedor
                  </Link>
                </li>
              </ul>
            )}
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
