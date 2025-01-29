import React, { useState } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const NewVendorPage = () => {
  const [vendor, setVendor] = useState({
    idVendedor: '',
    nombreVendedor: '',
    empresa: '',
    contactoTelefono: '',
    contactoEmail: '',
    direccion: '',
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendor({
      ...vendor,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="vendor-list-container" style={{ width: '1200px', margin: '0 auto' }}>
      <BackgroundCard className="vendor-list-card">
        <form>
          <h3 className="mb-4 text-center">Formulario de Vendedor</h3>

          {/* ID y Nombre */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="idVendedor">ID del Vendedor</label>
                <input
                  type="text"
                  className="form-control"
                  id="idVendedor"
                  name="idVendedor"
                  placeholder="ID del vendedor"
                  value={vendor.idVendedor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nombreVendedor">Nombre del Vendedor</label>
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
          </div>

          {/* Empresa y Contacto */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="empresa">Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  id="empresa"
                  name="empresa"
                  placeholder="Empresa"
                  value={vendor.empresa}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactoTelefono">Teléfono de Contacto</label>
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

          {/* Email y Dirección */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactoEmail">Email de Contacto</label>
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

          {/* Activo */}
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={vendor.activo}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="activo">
                  Activo
                </label>
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