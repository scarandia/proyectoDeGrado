import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
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

  const orderFields = [
    { key: 'idPedido', label: 'ID de Orden' },
    { key: 'cliente', label: 'Cliente' },
    { key: 'estado', label: 'Estado' },
    { key: 'fecha_creado', label: 'Fecha Creación' },
    { key: 'fecha_entrega', label: 'Fecha Entrega' },
    { key: 'direccion_entrega.calle', label: 'Dirección Entrega' },
    { key: 'precio_total', label: 'Precio Total' },
    { key: 'notas', label: 'Notas' },
  ];

  return (
    <div className="order-list-container">
      <BackgroundCard className="order-list-card">
        <div>
          <h1>Lista de Pedidos</h1>
          {orders.length === 0 ? (
            <p>No hay pedidos disponibles</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID de Orden</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha Creación</th>
                  <th scope="col">Fecha Entrega</th>
                  <th scope="col">Dirección Entrega</th>
                  <th scope="col">Precio Total</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} onClick={() => handleRowClick(order._id)} style={{ cursor: 'pointer' }}>
                    <td>{order.idPedido}</td>
                    <td>{order.cliente}</td>
                    <td>{order.estado}</td>
                    <td>{new Date(order.fecha_creado).toLocaleDateString()}</td>
                    <td>{new Date(order.fecha_entrega).toLocaleDateString()}</td>
                    <td>{`${order.direccion_entrega.calle}, ${order.direccion_entrega.ciudad || ''}, ${order.direccion_entrega.codigo_postal || ''}, ${order.direccion_entrega.pais || ''}`}</td>
                    <td>${order.precio_total.toFixed(2)}</td>
                    <td>{order.notas || 'Ninguna'}</td>
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