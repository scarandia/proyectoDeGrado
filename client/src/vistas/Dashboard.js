import React from 'react';
import Card from '../componentes/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Dashboard.css';

const Dashboard = ({ }) => {
  return (
    <div className="d-flex">
      <div className="main-content container mt-4">
        <div className="row mb-">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Juan Perez</td>
                  <td>juan.perez@example.com</td>
                  <td>Vendedor</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Maria Lopez</td>
                  <td>maria.lopez@example.com</td>
                  <td>Cliente</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Carlos Garcia</td>
                  <td>carlos.garcia@example.com</td>
                  <td>Administrador</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Número de vendedores activos" value="12" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Número de productos vendidos" value="34" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Ingresos totales" value="$1234" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Card title="Clientes nuevos" value="8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;