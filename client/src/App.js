import React, { useState } from 'react';
import Sidebar from './componentes/Sidebar';
import Content from './componentes/Content';
import Dashboard from './componentes/Dashboard';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Content isSidebarOpen={isSidebarOpen} />
      <Dashboard />
    </div>
  );
}

export default App;
