import React, { useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';

const NewVendorPage = () => {
  const [vendor, setVendor] = useState({
    nombreVendedor: '',
    apellidoVendedor: '',
    ciVendedor: '',
    contactoTelefono: '',
    contactoEmail: '',
    direccion: '',
    activo: true,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendor({
      ...vendor,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/vendedores', vendor);
      if (response.status === 201) {
        alert('Vendedor creado exitosamente');
        setVendor({
          nombreVendedor: '',
          apellidoVendedor: '',
          ciVendedor: '',
          contactoTelefono: '',
          contactoEmail: '',
          direccion: '',
          activo: true,
        });
        setErrorMessage(''); // Clear any previous error message
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error al crear el vendedor';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="vendor-list-container" style={{ width: '1200px', margin: '0 auto' }}>
      <BackgroundCard className="vendor-list-card">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Formulario de Vendedor</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <h3>Información Personal</h3>
          {/* Nombre y Apellido */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nombreVendedor">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreVendedor"
                  name="nombreVendedor"
                  placeholder="Nombre del vendedor"
                  value={vendor.nombreVendedor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="apellidoVendedor">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidoVendedor"
                  name="apellidoVendedor"
                  placeholder="Apellido del vendedor"
                  value={vendor.apellidoVendedor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* CI y Contacto */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="ciVendedor">Carnet de Identidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="ciVendedor"
                  name="ciVendedor"
                  placeholder="CI"
                  value={vendor.ciVendedor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactoTelefono">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactoTelefono"
                  name="contactoTelefono"
                  placeholder="Teléfono de contacto"
                  value={vendor.contactoTelefono}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <h3>Contacto</h3>
          {/* Email y Dirección */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactoEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="contactoEmail"
                  name="contactoEmail"
                  placeholder="Email de contacto"
                  value={vendor.contactoEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  placeholder="Dirección"
                  value={vendor.direccion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Guardar Vendedor
          </button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default NewVendorPage;