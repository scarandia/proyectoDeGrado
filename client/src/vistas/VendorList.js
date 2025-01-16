import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import BackgroundCard from '../componentes/BackgroundCard';
import DetailView from './DetailView';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Lists.css';

const VendedorList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendedorId, setSelectedVendedorId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendedores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendedores');
        setVendedores(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los vendedores');
        setLoading(false);
      }
    };

    fetchVendedores();
  }, []);

  if (loading) return <p>Cargando vendedores...</p>;
  if (error) return <p>{error}</p>;

  const handleRowClick = (vendedorId) => {
    setSelectedVendedorId(vendedorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendedorId(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVendedores = vendedores.filter((vendedor) => {
    return (
      (vendedor.nombre && vendedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vendedor.apellido && vendedor.apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vendedor.ciVendedor && vendedor.ciVendedor.includes(searchTerm))
    );
  });

  const vendedorFields = [
    { key: 'idVendedor', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'ciVendedor', label: 'CI' },
    { key: 'contacto.telefono', label: 'Teléfono' },
    { key: 'contacto.email', label: 'Email' },
    { key: 'activo', label: 'Activo' },
  ];

  return (
    <div className="vendedor-list-container" style={{ width: '1500px', margin: '0 auto' }}>
      <BackgroundCard className="vendedor-list-card">
        <div>
          <h1>Lista de Vendedores</h1>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre, apellido o CI"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
          {filteredVendedores.length === 0 ? (
            <p>No hay vendedores disponibles</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">CI</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Email</th>
                  <th scope="col">Activo</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendedores.map((vendedor) => (
                  <tr key={vendedor._id} onClick={() => handleRowClick(vendedor._id)} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '15px' }}>{vendedor.idVendedor}</td>
                    <td style={{ padding: '15px' }}>{vendedor.nombre}</td>
                    <td style={{ padding: '15px' }}>{vendedor.apellido}</td>
                    <td style={{ padding: '15px' }}>{vendedor.ciVendedor}</td>
                    <td style={{ padding: '15px' }}>{vendedor.contacto.telefono}</td>
                    <td style={{ padding: '15px' }}>{vendedor.contacto.email}</td>
                    <td style={{ padding: '15px' }}>
                      <span className={`circle ${vendedor.activo ? 'green' : 'red'}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Vendedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVendedorId && (
              <DetailView
                entityType="Vendedor"
                apiEndpoint="http://localhost:5000/api/vendedores"
                fields={vendedorFields}
                id={selectedVendedorId}
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

export default VendedorList;