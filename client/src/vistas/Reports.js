import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import BackgroundCard from '../componentes/BackgroundCard';
import OrdersByDate from '../Reports/OrdersByDate';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [reportOption, setReportOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getOptions = () => {
    switch (reportType) {
      case 'cliente':
        return [
          'Lista de clientes que realizaron pedidos',
          'Clientes con deudas activas',
        ];
      case 'pedido':
        return [
          'Pedidos pendientes',
          'Pedidos completados',
          'Pedidos por cliente',
        ];
      case 'producto':
        return [
          'Reporte de inventario actual',
          'Productos más vendidos en un rango de tiempo',
        ];
      case 'vendedor':
        return [
          'Ventas por vendedor',
          'Lista de nuevos clientes registrados por cada vendedor',
        ];
      default:
        return [];
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Tipo:', reportType, 'Opción:', reportOption);
    console.log('Fecha Inicio:', startDate, 'Fecha Fin:', endDate);
  };

  return (
    <div className="product-list-container" style={{ width: '1900px', margin: '0 auto' }}>
      <BackgroundCard style={{ height: '900px', width: '2000px', padding: '20px', margin: '20px' }}>
        <h1>Reportes</h1>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="reportCategory">
              <Form.Label style={{ fontWeight: 'bold' }}>Categoría de Reporte</Form.Label>
              <Form.Control
                as="select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                required
              >
                <option value="">Elige una categoría de reporte</option>
                <option value="cliente">Cliente</option>
                <option value="pedido">Pedido</option>
                <option value="producto">Producto</option>
                <option value="vendedor">Vendedor</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="reportOption" className="mt-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Opciones de Reporte</Form.Label>
              <Form.Control
                as="select"
                value={reportOption}
                onChange={(e) => setReportOption(e.target.value)}
              >
                <option value="">Elige una opción</option>
                {getOptions().map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-between mt-3">
              <Form.Group controlId="dateStart" style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label style={{ fontWeight: 'bold' }}>Fecha de Inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dateEnd" style={{ flex: 1, marginLeft: '10px' }}>
                <Form.Label style={{ fontWeight: 'bold' }}>Fecha de Fin</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

          </Form>

          {/* Render the OrdersByDate component if user selects that option */}
          {reportType === 'cliente' && reportOption === 'Lista de clientes que realizaron pedidos' && (
            <OrdersByDate startDate={startDate} endDate={endDate} />
          )}
        </Card.Body>
      </BackgroundCard>
    </div>
  );
};

export default Reports;