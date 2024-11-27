import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';
import '../styles/Lists.css'; // Suponiendo que creas un archivo CSS para los estilos

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Jala lista de clientes desde API
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

  return (
    <BackgroundCard>
      <div>
        <h1>Lista de Clientes</h1>
        {clients.length === 0 ? (
          <p>No hay clientes disponibles</p>
        ) : (
          <div className="information-list">
            {clients.map((client) => (
              <div className="information-card" key={client._id}>
                <h3>{client.nombreCliente} {client.apellidoCliente}</h3>
                <p><strong>Tipo de Negocio:</strong> {client.tipoNegocio}</p>
                <p><strong>Nombre de Negocio:</strong> {client.nombreNegocio}</p>
                <p><strong>Contacto:</strong> {client.contacto.telefono} </p>
                <p><strong>Correo: </strong>{client.contacto.email}</p>
                <p><strong>Dirección:</strong> {client.direccion.calle}, {client.direccion.ciudad || ''}, {client.direccion.codigo_postal || ''}, {client.direccion.pais || ''}</p>
                <p><strong>Deuda:</strong> {client.deuda}</p>
                <p><strong>Historial de Pedidos:</strong> {client.historialPedidos.length > 0 ? client.historialPedidos.join(', ') : 'Ninguno'}</p>
                <p><strong>Notas:</strong> {client.notas}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BackgroundCard>
  );
};

export default ClientList;
