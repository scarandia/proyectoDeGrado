const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidoModel');
const {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
} = require('../controllers/pedidoController');

// New route for fetching orders within a date range
router.get('/rango-fechas', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pedidos = await Pedido.find({
            fecha: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;