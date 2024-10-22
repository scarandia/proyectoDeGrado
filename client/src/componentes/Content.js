import React from 'react';
import '../styles/Content.css';

function Content({ isSidebarOpen }) {
  return (
    <div className={`content ${isSidebarOpen ? 'content-shift' : ''}`}>
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el contenido principal.</p>
    </div>
  );
}

export default Content;
