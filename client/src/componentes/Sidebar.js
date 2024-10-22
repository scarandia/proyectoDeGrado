import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li><a href="/home">Dashboard</a></li>
          <li><a href="/page1">Pagina 1</a></li>
          <li><a href="/page2">Pagina 2</a></li>
          <li><a href="/page3">Pagina 3</a></li>
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
