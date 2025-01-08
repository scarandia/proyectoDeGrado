import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import BackgroundCard from '../componentes/BackgroundCard';
import DetailView from './DetailView';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Lists.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clientes');
        setClients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los clientes');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  const handleRowClick = (clientId) => {
    setSelectedClientId(clientId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClientId(null);
  };

  const clientFields = [
    { key: 'nombreCliente', label: 'Nombre' },
    { key: 'apellidoCliente', label: 'Apellido' },
    { key: 'tipoNegocio', label: 'Tipo de Negocio' },
    { key: 'nombreNegocio', label: 'Nombre de Negocio' },
    { key: 'contacto.telefono', label: 'Contacto' },
    { key: 'contacto.email', label: 'Correo' },
    { key: 'direccion.calle', label: 'Dirección' },
    { key: 'deuda', label: 'Deuda' },
    { key: 'historialPedidos', label: 'Historial de Pedidos' },
    { key: 'notas', label: 'Notas' },
  ];

  return (
    <div className="client-list-container">
      <BackgroundCard className="client-list-card">
        <div>
          <h1>Lista de Clientes</h1>
          {clients.length === 0 ? (
            <p>No hay clientes disponibles</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Tipo de Negocio</th>
                  <th scope="col">Nombre de Negocio</th>
                  <th scope="col">Contacto</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} onClick={() => handleRowClick(client._id)} style={{ cursor: 'pointer' }}>
                    <td>{client.nombreCliente} {client.apellidoCliente}</td>
                    <td>{client.tipoNegocio}</td>
                    <td>{client.nombreNegocio}</td>
                    <td>{client.contacto.telefono}</td>
                    <td>{client.contacto.email}</td>
                    <td>{client.direccion.calle}, {client.direccion.ciudad || ''}, {client.direccion.codigo_postal || ''}, {client.direccion.pais || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedClientId && (
              <DetailView
                entityType="Cliente"
                apiEndpoint="http://localhost:5000/api/clientes"
                fields={clientFields}
                id={selectedClientId}
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

export default ClientList;