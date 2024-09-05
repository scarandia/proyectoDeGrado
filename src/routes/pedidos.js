const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Ruta para crear un nuevo pedido (POST)
router.post('/pedidos', pedidoController.crearPedido);

// Ruta para obtener un pedido por su ID (GET)
router.get('/pedidos/:id', pedidoController.obtenerPedido);

module.exports = router;
