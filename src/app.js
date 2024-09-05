const express = require('express');
const app = express();
//const pedidoRoutes = require('./routes/pedidoRoutes');

// Middleware para manejar JSON
app.use(express.json());

/* Registrar las rutas de pedidos
app.use('/api', pedidoRoutes);
*/

// Ruta base para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Microservicio de distribución funcionando!');
});

module.exports = app;