const express = require('express');
const router = express.Router();
const {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
} = require('../controllers/pedidoController');

router.post('/', createPedido);
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;
