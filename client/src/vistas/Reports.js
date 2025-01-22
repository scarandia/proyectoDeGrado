import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BackgroundCard from '../componentes/BackgroundCard';

const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportStatus, setReportStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Obtener y mostrar datos del reporte basado en el rango de fechas o mes seleccionado
    if (startDate && endDate) {
      // Obtener datos para el rango de fechas
      console.log(`Obteniendo datos desde ${startDate} hasta ${endDate}`);
    } else if (selectedMonth) {
      // Obtener datos para el mes seleccionado
      console.log(`Obteniendo datos para el mes: ${selectedMonth}`);
    }
  };

  return (
    <div className="product-list-container" style={{ width: '1900px', margin: '0 auto' }}>
        <BackgroundCard style={{ height: '900px', width: '2000px', padding: '20px', margin: '20px' }}>
          <h1>Reportes</h1>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="reportName">
              <Form.Group controlId="reportStatus">
                <Form.Label>Categoría de Reporte</Form.Label>
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
              </Form.Group>
              <Form.Group controlId="reportDate">
                <Form.Label>Fecha del Reporte</Form.Label>
                <Form.Control
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="reportStatus">
                <Form.Label>Estado del Reporte</Form.Label>
                <Form.Control
                  as="select"
                  value={reportStatus}
                  onChange={(e) => setReportStatus(e.target.value)}
                  required
                >
                  <option value="">Selecciona el estado</option>
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completado</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="dateRange">
                <Form.Label>Rango de Fechas</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Fecha de Inicio"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Fecha de Fin"
                />
              </Form.Group>
              <Form.Group controlId="monthPicker">
                <Form.Label>Seleccionar Mes</Form.Label>
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date) => setSelectedMonth(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="Seleccionar Mes"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Generar Reporte
              </Button>
            </Form>
          </Card.Body>
        </BackgroundCard>
    </div>
  );
};

export default Reports;