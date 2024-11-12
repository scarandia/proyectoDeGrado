import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {

  //  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento 

  useEffect(() => {
    console.log("useEffect Sidebar");
    const user = localStorage.getItem('user');
    const values = JSON.parse(user);

    console.log("user2");
    //console.log(values?.user?.email);
    setRoleUser(values?.user?.role);
    //console.log(user?.user?.email);
  }, []);

  const location = useLocation();
  const [roleUser, setRoleUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [boldMenu, setBoldMenu] = useState(null); // Nuevo estado para el elemento en negrita

  const toggleSubMenu = (menu) => {
    setActiveMenu((prevState) => (prevState === menu ? null : menu));
  };

  const isActive = (path) => location.pathname === path;

  const handleMainClick = (menu) => {
    setBoldMenu(menu);
  };

  const handleSubClick = (parentMenu) => {
    setBoldMenu(null);
    setActiveMenu(parentMenu); // mantener submenú abierto
  };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className={`${isActive('/home') ? 'active' : ''} ${boldMenu === 'dashboard' ? 'bold' : ''}`}>
            <Link to="/home" onClick={() => handleMainClick('dashboard')}>Dashboard</Link>
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'clients' ? 'active' : ''} ${boldMenu === 'clients' ? 'bold' : ''}`}
              onClick={() => toggleSubMenu('clients')}
            >
              <Link to="/clients" className={`menu-link ${isActive('/clients') ? 'active' : ''}`} onClick={() => handleMainClick('clients')}>
                Clientes
              </Link>
            </div>
            {roleUser=="admin" && activeMenu === 'clients' && (
              <ul className="sub-menu">
                <li className={isActive('/createClient') ? 'active' : ''}>
                  <Link to="/createClient" className={isActive('/createClient') ? 'active' : ''} onClick={() => handleSubClick('clients')}>
                    Crear Cliente
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'orders' ? 'active' : ''} ${boldMenu === 'orders' ? 'bold' : ''}`}
              onClick={() => toggleSubMenu('orders')}
            >
              <Link to="/orders" className={`menu-link ${isActive('/orders') ? 'active' : ''}`} onClick={() => handleMainClick('orders')}>
                Pedidos
              </Link>
            </div>
            {activeMenu === 'orders' && (
              <ul className="sub-menu">
                <li className={isActive('/createOrder') ? 'active' : ''}>
                  <Link to="/createOrder" className={isActive('/createOrder') ? 'active' : ''} onClick={() => handleSubClick('orders')}>
                    Crear Pedido
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'products' ? 'active' : ''} ${boldMenu === 'products' ? 'bold' : ''}`}
              onClick={() => toggleSubMenu('products')}
            >
              <Link to="/products" className={`menu-link ${isActive('/products') ? 'active' : ''}`} onClick={() => handleMainClick('products')}>
                Productos
              </Link>
            </div>
            {activeMenu === 'products' && (
              <ul className="sub-menu">
                <li className={isActive('/createProduct') ? 'active' : ''}>
                  <Link to="/createProduct" className={isActive('/createProduct') ? 'active' : ''} onClick={() => handleSubClick('products')}>
                    Crear Producto
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`menu-item ${activeMenu === 'vendors' ? 'active' : ''} ${boldMenu === 'vendors' ? 'bold' : ''}`}
              onClick={() => toggleSubMenu('vendors')}
            >
              <Link to="/vendors" className={`menu-link ${isActive('/vendors') ? 'active' : ''}`} onClick={() => handleMainClick('vendors')}>
                Vendedores
              </Link>
            </div>
            { roleUser == "admin" && activeMenu === 'vendors' && (
              <ul className="sub-menu">
                <li className={isActive('/createVendor') ? 'active' : ''}>
                  <Link to="/createVendor" className={isActive('/createVendor') ? 'active' : ''} onClick={() => handleSubClick('vendors')}>
                    Crear Vendedor
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {
            roleUser == "admin" ? 
            <li>
              <div
                className={`menu-item ${activeMenu === 'vendors' ? 'active' : ''} ${boldMenu === 'vendors' ? 'bold' : ''}`}
                onClick={() => toggleSubMenu('vendors')}
              >
                <Link to="/vendors" className={`menu-link ${isActive('/vendors') ? 'active' : ''}`} onClick={() => handleMainClick('vendors')}>
                  Configuración
                </Link>
              </div>              
            </li>
            : null
          }
          
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