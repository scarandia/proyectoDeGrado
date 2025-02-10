import React, { useState, useEffect } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';
import axios from 'axios';

const NewClientPage = () => {
  const [client, setClient] = useState({
    idCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    CI: '',
    nombreNegocio: '',
    tipoNegocio: '',
    otroTipoNegocio: '',
    direccion: {
      calle: '',
      ciudad: '',
      codigo_postal: '',
      pais: '',
    },
    contacto: {
      telefono: '',
      email: '',
    },
    historialPedidos: [],
    deuda: 0, // Deuda por defecto
    notas: '',
  });

  const [ciExists, setCiExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedClient = localStorage.getItem('newClient');
    if (savedClient) {
      setClient(JSON.parse(savedClient));
    }
  }, []);

  // Guardar datos en localStorage cada vez que el estado cambie
  useEffect(() => {
    localStorage.setItem('newClient', JSON.stringify(client));
  }, [client]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');

    if (key) {
      setClient((prevClient) => ({
        ...prevClient,
        [section]: {
          ...prevClient[section],
          [key]: value,
        },
      }));
    } else {
      setClient({
        ...client,
        [name]: value,
      });
    }

    // Verificar si el CI ya existe
    if (name === 'CI' && value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/clientes/checkCI/${value}`);
        setCiExists(response.data.exists);
      } catch (error) {
        console.error('Error al verificar el CI:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ciExists) {
      alert('El cliente ya existe. Por favor, use uno diferente.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/clientes', client);
      console.log('Cliente creado:', response.data);
      alert('Cliente creado exitosamente');
      // Limpiar el formulario y localStorage después de enviar
      setClient({
        idCliente: '',
        nombreCliente: '',
        apellidoCliente: '',
        CI: '',
        nombreNegocio: '',
        tipoNegocio: '',
        otroTipoNegocio: '',
        direccion: {
          calle: '',
          ciudad: '',
          codigo_postal: '',
          pais: '',
        },
        contacto: {
          telefono: '',
          email: '',
        },
        historialPedidos: [],
        deuda: 0,
        notas: '',
      });
      localStorage.removeItem('newClient');
      setCiExists(false);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  return (
    <div className="order-list-container" style={{ width: '1100px', margin: '0 auto' }}>
      <BackgroundCard className="client-list-card">
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Crear Nuevo Cliente</h2>
        <form onSubmit={handleSubmit} className="centered-form">
          <h3>Información Representante</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="CI">Carnet de Identidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="CI"
                  name="CI"
                  placeholder="CI"
                  value={client.CI}
                  onChange={handleChange}
                  required
                />
                {ciExists && <small className="text-danger">El carnet de identidad ya existe.</small>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nombreCliente">Nombre(s)</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreCliente"
                  name="nombreCliente"
                  placeholder="Nombre(s)"
                  value={client.nombreCliente}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="apellidoCliente">Apellido(s)</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidoCliente"
                  name="apellidoCliente"
                  placeholder="Apellido(s)"
                  value={client.apellidoCliente}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tipoNegocio">Tipo de Negocio</label>
            <select
              className="form-control"
              id="tipoNegocio"
              name="tipoNegocio"
              value={client.tipoNegocio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo de negocio</option>
              <option value="Tienda de Barrio">Tienda de Barrio</option>
              <option value="Minorista">Minorista</option>
              <option value="Mayorista">Mayorista</option>
              <option value="Supermercado">Supermercado</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {client.tipoNegocio === 'Otro' && (
            <div className="form-group">
              <label htmlFor="otroTipoNegocio">Otro Tipo de Negocio</label>
              <input
                type="text"
                className="form-control"
                id="otroTipoNegocio"
                name="otroTipoNegocio"
                placeholder="Especifique el tipo de negocio"
                value={client.otroTipoNegocio}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nombreNegocio">Nombre del Negocio</label>
            <input
              type="text"
              className="form-control"
              id="nombreNegocio"
              name="nombreNegocio"
              placeholder="Nombre del negocio"
              value={client.nombreNegocio}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Contacto</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contacto.telefono">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="contacto.telefono"
                  name="contacto.telefono"
                  placeholder="Teléfono"
                  value={client.contacto.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contacto.email">Email (opcional)</label>
                <input
                  type="email"
                  className="form-control"
                  id="contacto.email"
                  name="contacto.email"
                  placeholder="Email"
                  value={client.contacto.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <h3>Dirección</h3>
          <div className="form-group">
            <label htmlFor="direccion.calle">Direccion</label>
            <input
              type="text"
              className="form-control"
              id="direccion.calle"
              name="direccion.calle"
              placeholder="Calle"
              value={client.direccion.calle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion.ciudad">Ciudad (opcional)</label>
            <input
              type="text"
              className="form-control"
              id="direccion.ciudad"
              name="direccion.ciudad"
              placeholder="Ciudad"
              value={client.direccion.ciudad}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion.pais">País (opcional) </label>
            <input
              type="text"
              className="form-control"
              id="direccion.pais"
              name="direccion.pais"
              placeholder="País"
              value={client.direccion.pais}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas (opcional)</label>
            <textarea
              className="form-control"
              id="notas"
              name="notas"
              placeholder="Notas"
              value={client.notas}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary mt-3 w-100" disabled={ciExists}>
              Crear Cliente
            </button>
          </div>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default NewClientPage;