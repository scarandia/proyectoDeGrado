import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import BackgroundCard from '../componentes/BackgroundCard';
import DetailView from './DetailView';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Lists.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pedidos');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (order.idPedido && order.idPedido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.cliente && order.cliente.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const orderFields = [
    { key: 'idPedido', label: 'Numero' },
    { key: 'cliente.nombreCliente', label: 'Cliente' },
    { key: 'estado', label: 'Estado' },
    { key: 'fecha_creado', label: 'Fecha Pedido' },
    { key: 'fecha_entrega', label: 'Fecha Entrega' },
    { key: 'direccion_entrega', label: 'Dirección Entrega' },
    { key: 'precio_total', label: 'Precio Total' },
    { key: 'notas', label: 'Notas' },
  ];

  return (
    <div className="order-list-container" style={{ width: '1900px', margin: '0 auto' }}>
      <BackgroundCard className="order-list-card">
        <div>
          <h1>Lista de Pedidos</h1>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por número de pedido o cliente"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
          {filteredOrders.length === 0 ? (
            <p>No hay pedidos disponibles</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Numero</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha Pedido</th>
                  <th scope="col">Fecha Entrega</th>
                  <th scope="col">Dirección Entrega</th>
                  <th scope="col">Precio Total</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} onClick={() => handleRowClick(order._id)} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '15px' }}>{order.idPedido}</td>
                    <td style={{ padding: '15px' }}>{order.cliente.nombreCliente}</td>
                    <td style={{ padding: '15px' }}>{order.estado}</td>
                    <td style={{ padding: '15px' }}>{new Date(order.fecha_creado).toLocaleDateString()}</td>
                    <td style={{ padding: '15px' }}>{new Date(order.fecha_entrega).toLocaleDateString()}</td>
                    <td style={{ padding: '15px' }}>{`${order.direccion_entrega.calle}, ${order.direccion_entrega.ciudad || ''}, ${order.direccion_entrega.codigo_postal || ''}, ${order.direccion_entrega.pais || ''}`}</td>
                    <td style={{ padding: '15px' }}>{order.precio_total ? order.precio_total.toFixed(2) : 'N/A'}</td>
                    <td style={{ padding: '15px' }}>{order.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrderId && (
              <DetailView
                entityType="Pedido"
                apiEndpoint="http://localhost:5000/api/pedidos"
                fields={orderFields}
                id={selectedOrderId}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </BackgroundCard>
    </div>
  );
};

export default OrderList;