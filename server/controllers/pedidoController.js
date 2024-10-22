const Pedido = require('../models/pedidoModel');

// Crear pedido
const createPedido = async (req, res) => {
    try {
        const nuevoPedido = new Pedido(req.body);
        await nuevoPedido.save();
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido.' });
    }
};

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('productos.producto').populate('distribuidorAsignado');
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos.' });
    }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('productos.producto').populate('distribuidorAsignado');
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pedido.' });
    }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('productos.producto').populate('distribuidorAsignado');
        if (!pedidoActualizado) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }
        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pedido.' });
    }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedidoEliminado) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }
        res.status(200).json({ message: 'Pedido eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido.' });
    }
};

// Exportamos las funciones del controlador
module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido
};