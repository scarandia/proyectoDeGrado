import React, { useState } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const NewSellerPage = () => {
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
    const { name, value } = e.target;
    setVendedor({ ...vendedor, [name]: value });
  };

  const handleContactoChange = (e) => {
    const { name, value } = e.target;
    setVendedor({
      ...vendedor,
      contacto: { ...vendedor.contacto, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/vendedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendedor),
      });

      if (response.ok) {
        alert('Vendedor creado exitosamente');
        setVendedor({
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
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'No se pudo crear el vendedor'}`);
      }
    } catch (error) {
      console.error('Error al crear vendedor:', error);
      alert('Hubo un error al intentar guardar el vendedor.');
    }
  };

  return (
    <BackgroundCard>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Crear Nuevo Vendedor</h1>

          {/* ID Vendedor */}
          <div className="form-group">
            <label htmlFor="idVendedor">ID del Vendedor</label>
            <input
              type="text"
              className="form-control"
              id="idVendedor"
              name="idVendedor"
              placeholder="ID único del vendedor"
              value={vendedor.idVendedor}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nombre y Apellido */}
          <div className="row">
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
          </div>

          {/* CI Vendedor */}
          <div className="form-group">
            <label htmlFor="ciVendedor">CI del Vendedor</label>
            <input
              type="text"
              className="form-control"
              id="ciVendedor"
              name="ciVendedor"
              placeholder="Cédula de Identidad del vendedor"
              value={vendedor.ciVendedor}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contacto */}
          <div className="form-group">
            <label>Contacto</label>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={vendedor.contacto.telefono}
                  onChange={handleContactoChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={vendedor.contacto.email}
                  onChange={handleContactoChange}
                />
              </div>  
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Guardar Vendedor
          </button>
        </form>
      </div>
    </BackgroundCard>
  );
};

export default NewSellerPage;
