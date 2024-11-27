import React, { useState } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const NewVendorPage = () => {
  const [vendedor, setVendedor] = useState({
    idVendedor: '',
    nombre: '',
    apellido: '',
    ciVendedor: '',
    contacto: {
      telefono: '',
      email: '',
    },
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('contacto')) {
      const contactoField = name.split('.')[1];
      setVendedor({
        ...vendedor,
        contacto: { ...vendedor.contacto, [contactoField]: value },
      });
    } else {
      setVendedor({
        ...vendedor,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  return (
    <BackgroundCard>
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
                value={vendedor.idVendedor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Nombre del vendedor"
                value={vendedor.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Apellido y CI */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                placeholder="Apellido del vendedor"
                value={vendedor.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ciVendedor">C.I. del Vendedor</label>
              <input
                type="text"
                className="form-control"
                id="ciVendedor"
                name="ciVendedor"
                placeholder="C.I. del vendedor"
                value={vendedor.ciVendedor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Teléfono y Email */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="contacto.telefono">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="contacto.telefono"
                name="contacto.telefono"
                placeholder="Teléfono de contacto"
                value={vendedor.contacto.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="contacto.email">Email</label>
              <input
                type="email"
                className="form-control"
                id="contacto.email"
                name="contacto.email"
                placeholder="Email de contacto"
                value={vendedor.contacto.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Estado Activo */}
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="activo"
                name="activo"
                checked={vendedor.activo}
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
  );
};

export default NewVendorPage;