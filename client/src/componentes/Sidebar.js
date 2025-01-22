import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar({ isOpen, toggleSidebar }) {
  const [roleUser, setRoleUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [boldMenu, setBoldMenu] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const values = JSON.parse(user);
      setRoleUser(values?.role);
    }
  }, []);

  const location = useLocation();

  const toggleSubMenu = (menu) => {
    setActiveMenu((prevState) => (prevState === menu ? null : menu));
    setBoldMenu(menu);
  };

  const isActive = (path) => location.pathname === path;

  const handleMainClick = (menu) => {
    setBoldMenu(menu);
    setActiveMenu(null);
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
            <Link to="/home" onClick={() => handleMainClick('dashboard')}>
              Panel de Control
            </Link>
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
                {roleUser === "admin" && (
                  <li className={isActive('/createProduct') ? 'active' : ''}>
                    <Link to="/createProduct" onClick={() => handleSubClick('products')}>Crear Producto</Link>
                  </li>
                )}
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
          {roleUser === "admin" && (
            <>
              <li>
                <div className={`menu-item ${activeMenu === 'createUser' ? 'active' : ''} ${boldMenu === 'createUser' ? 'bold' : ''}`} onClick={() => toggleSubMenu('createUser')}>
                  <Link to="/createUser" className={`menu-link ${isActive('/createUser') ? 'active' : ''}`} onClick={() => handleMainClick('createUser')}>Crear Usuario</Link>
                </div>
              </li>
              <li>
                <div className={`menu-item ${activeMenu === 'reports' ? 'active' : ''} ${boldMenu === 'reports' ? 'bold' : ''}`} onClick={() => toggleSubMenu('reports')}>
                  <Link to="/reports" className={`menu-link ${isActive('/reports') ? 'active' : ''}`} onClick={() => handleMainClick('reports')}>Reportes</Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Botón */}
      <button
        className={`toggle-button ${isOpen ? 'open' : 'closed'}`}
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isOpen ? faAngleLeft : faAngleRight} />
      </button>
    </div>
  );
}

export default Sidebar;