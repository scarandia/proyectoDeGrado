import React, { useState } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const NewOrderPage = () => {
  const [producto, setProducto] = useState({
    idProducto: '',
    nombreProducto: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    proveedor: '',
    imagenURL: '',
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <BackgroundCard>
      <form>
        <h3 className="mb-4 text-center">Formulario de Producto</h3>

        {/* ID y Nombre */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="idProducto">ID del Producto</label>
              <input
                type="text"
                className="form-control"
                id="idProducto"
                name="idProducto"
                placeholder="ID del producto"
                value={producto.idProducto}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nombreProducto">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                id="nombreProducto"
                name="nombreProducto"
                placeholder="Nombre del producto"
                value={producto.nombreProducto}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Descripción y Categoría */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                placeholder="Descripción del producto"
                value={producto.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                placeholder="Categoría"
                value={producto.categoria}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Precio y Stock */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                placeholder="Precio del producto"
                value={producto.precio}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                placeholder="Stock disponible"
                value={producto.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Proveedor */}
        <div className="form-group">
          <label htmlFor="proveedor">Proveedor</label>
          <input
            type="text"
            className="form-control"
            id="proveedor"
            name="proveedor"
            placeholder="ID del fabricante (Proveedor)"
            value={producto.proveedor}
            onChange={handleChange}
          />
        </div>

        {/* Imagen y Activo */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="imagenURL">URL de la Imagen</label>
              <input
                type="url"
                className="form-control"
                id="imagenURL"
                name="imagenURL"
                placeholder="URL de la imagen"
                value={producto.imagenURL}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="activo"
                name="activo"
                checked={producto.activo}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="activo">
                Activo
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Guardar Producto
        </button>
      </form>
    </BackgroundCard>
  );
};

export default NewOrderPage;