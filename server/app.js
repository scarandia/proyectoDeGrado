require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const fabricanteRoutes = require('./routes/fabricanteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Registrar las rutas
app.use('/api', clienteRoutes);
app.use('/api', fabricanteRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', productoRoutes);
app.use('/api/auth', authRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('Microservicio de distribución funcionando!');
});

const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
