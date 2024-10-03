const express = require('express');
const router = express.Router();
const {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
} = require('../controllers/pedidoController');

// Ruta para crear un nuevo pedido
router.post('/', createPedido);

// Ruta para obtener todos los pedidos
router.get('/', getPedidos);

// Ruta para obtener un pedido por ID
router.get('/:id', getPedidoById);

// Ruta para actualizar un pedido por ID
router.put('/:id', updatePedido);

// Ruta para eliminar un pedido por ID
router.delete('/:id', deletePedido);

module.exports = router;
