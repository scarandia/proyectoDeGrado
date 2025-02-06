const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const cors = require('cors');
const respuestaLogger = require('./middleware/respuestaLogger');
require('dotenv').config();

// Import routes
const clienteRoutes = require('./routes/clienteRoutes');
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const fabricanteRoutes = require('./routes/fabricanteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const rutaRoutes = require('./routes/rutaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuracion CORS para el backend en puerto 3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware para manejar JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Usar el middleware de loggeo de info extra
app.use(respuestaLogger);

// Ruta base
app.get('/', (req, res) => {
    res.send('Microservicio de distribución funcionando!');
});


// Registrar las rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/distribuidores', distribuidorRoutes);
app.use('/api/fabricantes', fabricanteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vendedores', vendedorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;