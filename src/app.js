const express = require('express');
const app = express();
const pedidoRoutes = require('./routes/pedidoRoutes'); // Asegúrate de que esta ruta sea correcta

// Middleware para manejar JSON
app.use(express.json());

// Registrar las rutas de pedidos
app.use('/api/pedidos', pedidoRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Microservicio de distribución funcionando!');
});

module.exports = app;
