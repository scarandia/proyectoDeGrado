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
    vencimiento: '', // Añadir campo de vencimiento
  });

  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [nombreProductoExists, setNombreProductoExists] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error.response ? error.response.data : error.message);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });

    // Verificar si el nombre del producto ya existe
    if (name === 'nombreProducto' && value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/productos/checkNombreProducto/${value}`);
        setNombreProductoExists(response.data.exists);
      } catch (error) {
        console.error('Error al verificar el nombre del producto:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
    if (nombreProductoExists) {
      setErrorMessage('El nombre del producto ya existe. Por favor, use uno diferente.');
      return;
    }
    if (producto.stock < 0) {
      setErrorMessage('El stock no puede ser negativo. Por favor, ingrese un valor válido.');
      return;
    }
    if (producto.precio < 0) {
      setErrorMessage('El precio no puede ser negativo. Por favor, ingrese un valor válido.');
      return;
    }
    if (producto.vencimiento && new Date(producto.vencimiento) < new Date()) {
      setErrorMessage('La fecha de vencimiento no puede ser anterior a la fecha actual. Por favor, ingrese una fecha válida.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/productos', producto);
      console.log('Producto creado:', response.data);
      alert('Producto creado exitosamente');
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error al crear el producto';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="order-list-container" style={{ width: '1200px', margin: '0 auto' }}>
      <BackgroundCard className="product-list-card">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Formulario de Producto</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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
            {nombreProductoExists && <div className="alert alert-danger">El nombre del producto ya existe.</div>}
          </div>
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
          <div className="form-group">
            <label htmlFor="vencimiento">Fecha de Vencimiento (opcional)</label>
            <input
              type="date"
              className="form-control"
              id="vencimiento"
              name="vencimiento"
              value={producto.vencimiento}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100" disabled={nombreProductoExists}>
            Crear Producto
          </button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default NewProduct;