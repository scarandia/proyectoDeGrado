import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard'; // Suponiendo que reuses este componente
import '../styles/Lists.css'; // Reutilizamos los estilos existentes

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener lista de pedidos desde la API
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pedidos');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BackgroundCard>
      <div>
        <h1>Lista de Pedidos</h1>
        {orders.length === 0 ? (
          <p>No hay pedidos disponibles</p>
        ) : (
          <div className="information-list">
            {orders.map((order) => (
              <div className="information-card" key={order.idPedido}>
                <h3>ID Pedido: {order.idPedido}</h3>
                <p><strong>Cliente:</strong> {order.cliente}</p>
                <p><strong>Estado:</strong> {order.estado}</p>
                <p><strong>Fecha Creación:</strong> {new Date(order.fecha_creado).toLocaleDateString()}</p>
                <p><strong>Fecha Entrega:</strong> {new Date(order.fecha_entrega).toLocaleDateString()}</p>
                <p><strong>Dirección Entrega:</strong> {`${order.direccion_entrega.calle}, ${order.direccion_entrega.ciudad || ''}, ${order.direccion_entrega.codigo_postal || ''}, ${order.direccion_entrega.pais || ''}`}</p>
                <p><strong>Productos:</strong></p>
                <ul>
                  {order.productos.map((item, index) => (
                    <li key={index}>
                      {item.producto.nombreProducto} - {item.cantidad} unidades
                    </li>
                  ))}
                </ul>
                <p><strong>Precio Total:</strong> ${order.precio_total.toFixed(2)}</p>
                <p><strong>Notas:</strong> {order.notas || 'Ninguna'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BackgroundCard>
  );
};

export default OrderList;
