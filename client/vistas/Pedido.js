import React, { useState, useEffect } from 'react';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error fetching pedidos:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.idPedido}>
            {pedido.idPedido} - {pedido.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;
