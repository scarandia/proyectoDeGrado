import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';
import DetailView from './DetailView';
import { Modal, Button, Form } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pedidos');
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOrders(value, filterStatus);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    filterOrders(searchTerm, status);
  };

  const filterOrders = (term, status) => {
    const filtered = orders.filter((order) =>
      ((order.idPedido && order.idPedido.toLowerCase().includes(term.toLowerCase())) ||
      (order.cliente?.nombreCliente && order.cliente.nombreCliente.toLowerCase().includes(term.toLowerCase())) ||
      (order.estado && order.estado.toLowerCase().includes(term.toLowerCase()))) &&
      (status === '' || order.estado === status)
    );
    setFilteredOrders(filtered);
  };

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  const orderFields = [
    { key: 'idPedido', label: 'Numero' },
    { key: 'cliente.nombreCliente', label: 'Nombre' },
    { key: 'cliente.apellidoCliente', label: 'Apellido' },
    { key: 'estado', label: 'Estado' },
    { key: 'createdAt', label: 'Fecha Pedido' },
    { key: 'fechaEntrega', label: 'Fecha Entrega' },
    { key: 'direccionEntrega.calle', label: 'Dirección Entrega' },
    { key: 'precioTotal', label: 'Precio Total' },
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
            <Form.Group controlId="status">
              <Form.Label>Estado del Pedido</Form.Label>
              <Form.Control as="select" value={filterStatus} onChange={handleStatusChange}>
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {filteredOrders.length > 0 ? (
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
                    <td style={{ padding: '15px' }}>
                      {order.cliente ? `${order.cliente.nombreCliente} ${order.cliente.apellidoCliente || ''}` : 'Sin cliente'}
                    </td>
                    <td style={{ padding: '15px' }}>{order.estado}</td>
                    <td style={{ padding: '15px' }}>
                      {new Date(order.createdAt).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={{ padding: '15px' }}>
                      {new Date(order.fechaEntrega).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={{ padding: '15px' }}>
                      {order.direccionEntrega ? (
                        `${order.direccionEntrega.calle || 'Sin calle'}`
                      ) : (
                        'Dirección no especificada'
                      )}
                    </td>
                    <td style={{ padding: '15px' }}>
                      Bs.
                      {order.productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0).toFixed(2)}
                    </td>
                    <td style={{ padding: '15px' }}>{order.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se encontraron pedidos.</p>
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