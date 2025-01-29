import React, { useState, useEffect } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';
import axios from 'axios';
import Select from 'react-select';

const NewOrderPage = () => {
  const [order, setOrder] = useState({
    ciCliente: '',
    productos: [{ producto: '', cantidad: 1 }],
    fechaEntrega: '',
    direccionEntrega: {
      calle: '',
      ciudad: '',
      codigoPostal: '',
      pais: '',
    },
    notas: '',
  });

  const [ci, setCi] = useState('');
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch available products
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProductosDisponibles(response.data.map(producto => ({
          value: producto._id,
          label: producto.nombreProducto,
          stock: producto.stock // Incluir stock en los datos del producto
        })));
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');

    if (key) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        [section]: {
          ...prevOrder[section],
          [key]: value,
        },
      }));
    } else {
      setOrder({
        ...order,
        [name]: value,
      });
    }
  };

  const handleProductoChange = (index, selectedOption) => {
    const newProductos = [...order.productos];
    newProductos[index].producto = selectedOption.value;
    newProductos[index].stock = selectedOption.stock; // Guardar stock del producto seleccionado
    setOrder({ ...order, productos: newProductos });
  };

  const handleCantidadChange = (index, value) => {
    const newProductos = [...order.productos];
    newProductos[index].cantidad = parseInt(value, 10); // Asegurarse de que la cantidad sea un número
    setOrder({ ...order, productos: newProductos });
  };

  const addProducto = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      productos: [...prevOrder.productos, { producto: '', cantidad: 1 }],
    }));
  };

  const handleCiChange = async (e) => {
    const ciValue = e.target.value;
    setCi(ciValue);

    if (ciValue) {
      try {
        const response = await axios.get(`http://localhost:5000/api/clientes/ci/${ciValue}`);
        const cliente = response.data;
        if (cliente) {
          setOrder((prevOrder) => ({
            ...prevOrder,
            ciCliente: cliente.CI,
            direccionEntrega: {
              calle: cliente.direccion.calle || '',
              ciudad: cliente.direccion.ciudad || '',
              codigoPostal: cliente.direccion.codigoPostal || '',
              pais: cliente.direccion.pais || '',
            }
          }));
        }
      } catch (error) {
        console.error('Error al buscar el cliente por CI:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar stock disponible
    for (const item of order.productos) {
      const producto = productosDisponibles.find(p => p.value === item.producto);
      if (producto && item.cantidad > producto.stock) {
        setError(`Stock insuficiente para el producto ${producto.label}.`);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/pedidos', order);
      console.log('Pedido creado:', response.data);
      // Limpiar el formulario después de enviar
      setOrder({
        ciCliente: '',
        productos: [{ producto: '', cantidad: 1 }],
        fechaEntrega: '',
        direccionEntrega: {
          calle: '',
          ciudad: '',
          codigoPostal: '',
          pais: '',
        },
        notas: '',
      });
      setCi('');
      setError('');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  return (
    <div className="order-list-container" style={{ width: '1100px', margin: '0 auto' }}>
      <BackgroundCard className="order-list-card">
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Crear Nuevo Pedido</h2>
        <form onSubmit={handleSubmit} className="centered-form">
          <h3>Información del Pedido</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="ci">CI del Cliente</label>
            <input
              type="text"
              className="form-control"
              id="ci"
              name="ci"
              placeholder="CI del Cliente"
              value={ci}
              onChange={handleCiChange}
              required
            />
          </div>

          {/* Productos */}
          <h3>Productos</h3>
          <div className="form-group">
            {order.productos.map((producto, index) => (
              <div className="row" key={index}>
                <div className="col-md-8" style={{ marginTop: '6px' }}>
                  <Select
                    options={productosDisponibles}
                    onChange={(selectedOption) =>
                      handleProductoChange(index, selectedOption)
                    }
                    placeholder="Seleccionar Producto"
                    value={productosDisponibles.find(option => option.value === producto.producto)}
                    required
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: '-9px' }}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cantidad"
                    value={producto.cantidad}
                    onChange={(e) =>
                      handleCantidadChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addProducto}
            >
              Añadir Producto
            </button>
          </div>

          {/* Fechas */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="fechaEntrega">Fecha de Entrega</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaEntrega"
                  name="fechaEntrega"
                  placeholder="Fecha de Entrega"
                  value={order.fechaEntrega}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dirección de Entrega */}
          <h3>Dirección de Entrega</h3>
          <div className="form-group">
            <label htmlFor="direccionEntrega.calle">Direccion</label>
            <input
              type="text"
              className="form-control"
              id="direccionEntrega.calle"
              name="direccionEntrega.calle"
              placeholder="Calle"
              value={order.direccionEntrega.calle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccionEntrega.ciudad">Ciudad (opcional)</label>
            <input
              type="text"
              className="form-control"
              id="direccionEntrega.ciudad"
              name="direccionEntrega.ciudad"
              placeholder="Ciudad"
              value={order.direccionEntrega.ciudad}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccionEntrega.pais">País (opcional)</label>
            <input
              type="text"
              className="form-control"
              id="direccionEntrega.pais"
              name="direccionEntrega.pais"
              placeholder="País"
              value={order.direccionEntrega.pais}
              onChange={handleChange}
            />
          </div>

          {/* Notas */}
          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea
              className="form-control"
              id="notas"
              name="notas"
              placeholder="Notas"
              value={order.notas}
              onChange={handleChange}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              Crear Pedido
            </button> 
          </div>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default NewOrderPage;