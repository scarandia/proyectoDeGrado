import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';

const NewProduct = () => {
  const [producto, setProducto] = useState({
    nombreProducto: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    imagenURL: '',
    activo: true,
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/productos', producto);
      console.log('Producto creado:', response.data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className="order-list-container" style={{ width: '1200px', margin: '0 auto' }}>
      <BackgroundCard className="product-list-card">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Formulario de Producto</h3>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <select
                className="form-control"
                id="categoria"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.nombreCategoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                  className="form-control"
                  id="categoria"
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombreCategoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
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
                  placeholder="Stock del producto"
                  value={producto.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="imagenURL">URL de la Imagen</label>
            <input
              type="text"
              className="form-control"
              id="imagenURL"
              name="imagenURL"
              placeholder="URL de la imagen del producto"
              value={producto.imagenURL}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="activo"
              name="activo"
              checked={producto.activo}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="activo">Activo</label>
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">Crear Producto</button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default NewProduct;