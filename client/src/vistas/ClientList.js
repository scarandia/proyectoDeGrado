import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    return (
      (client.nombreCliente && client.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.CI && client.CI.includes(searchTerm))
    );
  });

  const clientFields = [
    { key: 'nombreCliente', label: 'Nombre' },
    { key: 'apellidoCliente', label: 'Apellido' },
    { key: 'CI', label: 'CI' },
    { key: 'nombreNegocio', label: 'Nombre de Negocio' },
    { key: 'tipoNegocio', label: 'Tipo de Negocio' },
    { key: 'deuda', label: 'Deuda' },
    { key: 'notas', label: 'Notas' },
  ];

  return (
    <div className="client-list-container" style={{ width: '1500px', margin: '0 auto' }}>
      <BackgroundCard className="client-list-card">
        <div>
          <h1>Lista de Clientes</h1>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o CI"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
          {filteredClients.length === 0 ? (
            <p>No hay clientes disponibles</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">CI</th>
                  <th scope="col">Nombre de Negocio</th>
                  <th scope="col">Tipo de Negocio</th>
                  <th scope="col">Deuda</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client._id} onClick={() => handleRowClick(client._id)} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '15px' }}>{client.nombreCliente}</td>
                    <td style={{ padding: '15px' }}>{client.apellidoCliente}</td>
                    <td style={{ padding: '15px' }}>{client.CI}</td>
                    <td style={{ padding: '15px' }}>{client.nombreNegocio}</td>
                    <td style={{ padding: '15px' }}>{client.tipoNegocio}</td>
                    <td style={{ padding: '15px' }}>{client.deuda}</td>
                    <td style={{ padding: '15px' }}>{client.notas}</td>
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