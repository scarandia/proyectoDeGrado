const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();


const clienteRoutes = require('./routes/clienteRoutes');
const fabricanteRoutes = require('./routes/fabricanteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Ruta base
app.get('/', (req, res) => {
    res.send('Microservicio de distribución funcionando!');
});

// Registrar las rutas
app.use('/api', clienteRoutes);
app.use('/api', fabricanteRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', productoRoutes);
app.use('/api', usuarioRoutes);
//app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
