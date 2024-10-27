import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li><Link to="/home">Dashboard</Link></li>
          <li><Link to="/page1">Pagina 1</Link></li>
          <li><Link to="/page2">Pagina 2</Link></li>
          <li><Link to="/page3">Pagina 3</Link></li>
        </ul>
      </div>

      <button 
        className={`toggle-button ${isOpen ? 'open' : 'closed'}`} 
        onClick={toggleSidebar}
      >
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>
    </div>
  );
}

export default Sidebar;
