import React, { useState, useEffect } from 'react';
import Card from '../componentes/Card';
import { Line, Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card as BootstrapCard } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders data (replace with your actual API endpoint)
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pedidos', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los datos de pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Example data for the graph
  const lineData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Órdenes en el último mes',
        data: [12, 19, 3, 5], // Replace with actual data
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barData = {
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
    datasets: [
      {
        label: 'Ventas',
        data: [65, 59, 80, 81], // Replace with actual data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container fluid className="mt-4 mb-4" style={{ marginLeft: '200px' }}>
      <BootstrapCard className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <Row className="mb-4">
          <Col md={4}>
            <Card title="Órdenes Totales" value={orders.length} />
          </Col>
          <Col md={4}>
            <Card title="Órdenes Pendientes" value={orders.filter(order => order.status === 'pending').length} />
          </Col>
          <Col md={4}>
            <Card title="Órdenes Completadas" value={orders.filter(order => order.status === 'completed').length} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BootstrapCard className="mb-4" style={{ height: '85%' }}>
              <BootstrapCard.Body>
                <BootstrapCard.Title>Órdenes en el último mes</BootstrapCard.Title>
                <div style={{ height: '600px', width: '85%' }}>
                  <Line data={lineData} options={options} />
                </div>
              </BootstrapCard.Body>
            </BootstrapCard>
          </Col>
          <Col md={6}>
            <BootstrapCard className="mb-4" style={{ height: '85%' }}>
              <BootstrapCard.Body>
                <BootstrapCard.Title>Ventas por producto</BootstrapCard.Title>
                <div style={{ height: '600px', width: '85%' }}>
                  <Bar data={barData} options={options} />
                </div>
              </BootstrapCard.Body>
            </BootstrapCard>
          </Col>
        </Row>
      </BootstrapCard>
    </Container>
  );
};

export default Dashboard;