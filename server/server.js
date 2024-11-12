const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const distribuidorRoutes = require('./routes/distribuidorRoutes');
const fabricanteRoutes = require('./routes/fabricanteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const rutaRoutes = require('./routes/rutaRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');
const cors = require('cors');

const respuestaLogger = require('./middleware/respuestaLogger')
const app = express();
const PORT = process.env.PORT || 5000;

// Configuracion CORS para el backend en puerto 3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

//parsear JSON
app.use(express.json());

//Conecta a MongoDB -> usa database.js
connectDB();

// Usar el middleware de loggeo de info extra
app.use(respuestaLogger);

//Usar Controladores
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/distribuidores', distribuidorRoutes);
app.use('/api/fabricantes', fabricanteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/vendedores', vendedorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
