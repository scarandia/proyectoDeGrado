import React from 'react';
import Card from '../componentes/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../componentes/Sidebar';  // Asegúrate de importar el Sidebar
import '../styles/Dashboard.css';  // Crear este archivo si es necesario

const Dashboard = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content container mt-4">
        <div className="row justify-content-around">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Número de vendedores activos" value="12" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Pedidos por entregar" value="80" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Pedidos entregados" value="120" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Ganancia mensual" value="$30,000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;