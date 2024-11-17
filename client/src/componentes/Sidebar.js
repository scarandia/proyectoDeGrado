import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  useEffect(() => {
    const user = localStorage.getItem('user');
    const values = JSON.parse(user);
    setRoleUser(values?.user?.role);
  }, []);

  const location = useLocation();
  const [roleUser, setRoleUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [boldMenu, setBoldMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setActiveMenu((prevState) => (prevState === menu ? null : menu));
  };

  const isActive = (path) => location.pathname === path;

  const handleMainClick = (menu) => {
    setBoldMenu(menu);
  };

  const handleSubClick = (parentMenu) => {
    setBoldMenu(null);
    setActiveMenu(parentMenu);
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          {/* Dashboard */}
          <li className={`${isActive('/home') ? 'active' : ''} ${boldMenu === 'dashboard' ? 'bold' : ''}`}>
            <Link to="/home" onClick={() => handleMainClick('dashboard')}>Dashboard</Link>
          </li>

          {/* Clientes */}
          <li>
            <div className={`menu-item ${activeMenu === 'clients' ? 'active' : ''} ${boldMenu === 'clients' ? 'bold' : ''}`} onClick={() => toggleSubMenu('clients')}>
              <Link to="/clients" className={`menu-link ${isActive('/clients') ? 'active' : ''}`} onClick={() => handleMainClick('clients')}>Clientes</Link>
            </div>
            {activeMenu === 'clients' && (
              <ul className="sub-menu">
                <li className={isActive('/createClient') ? 'active' : ''}>
                  <Link to="/createClient" onClick={() => handleSubClick('clients')}>Crear Cliente</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Pedidos */}
          <li>
            <div className={`menu-item ${activeMenu === 'orders' ? 'active' : ''} ${boldMenu === 'orders' ? 'bold' : ''}`} onClick={() => toggleSubMenu('orders')}>
              <Link to="/orders" className={`menu-link ${isActive('/orders') ? 'active' : ''}`} onClick={() => handleMainClick('orders')}>Pedidos</Link>
            </div>
            {activeMenu === 'orders' && (
              <ul className="sub-menu">
                <li className={isActive('/createOrder') ? 'active' : ''}>
                  <Link to="/createOrder" onClick={() => handleSubClick('orders')}>Crear Pedido</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Productos */}
          <li>
            <div className={`menu-item ${activeMenu === 'products' ? 'active' : ''} ${boldMenu === 'products' ? 'bold' : ''}`} onClick={() => toggleSubMenu('products')}>
              <Link to="/products" className={`menu-link ${isActive('/products') ? 'active' : ''}`} onClick={() => handleMainClick('products')}>Productos</Link>
            </div>
            {activeMenu === 'products' && (
              <ul className="sub-menu">
                <li className={isActive('/createProduct') ? 'active' : ''}>
                  <Link to="/createProduct" onClick={() => handleSubClick('products')}>Crear Producto</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Vendedores */}
          <li>
            <div className={`menu-item ${activeMenu === 'vendors' ? 'active' : ''} ${boldMenu === 'vendors' ? 'bold' : ''}`} onClick={() => toggleSubMenu('vendors')}>
              <Link to="/vendors" className={`menu-link ${isActive('/vendors') ? 'active' : ''}`} onClick={() => handleMainClick('vendors')}>Vendedores</Link>
            </div>
            {roleUser === "admin" && activeMenu === 'vendors' && (
              <ul className="sub-menu">
                <li className={isActive('/createVendor') ? 'active' : ''}>
                  <Link to="/createVendor" onClick={() => { handleSubClick('vendors'); console.log('Navegando a Crear Vendedor'); }}>
                    Crear Vendedor
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {roleUser === 'admin' && (
            <div className="sidebar-bottom">
              <li className={isActive('/config') ? 'active' : ''}>
                <Link to="/config" className={isActive('/config') ? 'active' : ''}>
                  Configuración
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>

      <button className="toggle-button" onClick={toggleSidebar} style={{ display: isOpen ? 'none' : 'block' }}>Abrir</button>
      <button className="toggle-button" onClick={toggleSidebar} style={{ display: isOpen ? 'block' : 'none' }}>Cerrar</button>
    </div>
  );
}

export default Sidebar;