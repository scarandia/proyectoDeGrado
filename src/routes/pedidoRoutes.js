const express = require('express');
const router = express.Router();
const { crearPedido, obtenerPedidos } = require('../controllers/pedidoController');

router.post('/', crearPedido);
router.get('/', obtenerPedidos);

module.exports = router;
