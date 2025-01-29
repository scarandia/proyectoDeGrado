const Pedido = require('../models/pedidoModel');
const ClienteModel = require('../models/clienteModel');

// Crear pedido
const createPedido = async (req, res) => {
    try {
        // Excluir fecha_creado de los datos recibidos
        const { fecha_creado, ...pedidoData } = req.body;

        const nuevoPedido = new Pedido(pedidoData);

        // Valida el esquema y datos
        const validationError = nuevoPedido.validateSync();
        if (validationError) {
            return res.status(400).json({ error: 'Datos inválidos.', detalle: validationError.message });
        }

        // Guarda el pedido
        await nuevoPedido.save();
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pedido.', detalle: error.message });
    }
};

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate({ path: 'productos.producto', select: 'nombreProducto precio' })
            .populate('cliente', 'nombreCliente apellidoCliente');
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos:', error.message);
        res.status(500).json({
            error: 'Error al obtener los pedidos.',
            detalle: error.message
        });
    }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pedido', error });
    }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('productos.producto')
            .populate('cliente', 'nombreCliente');
        if (!pedidoActualizado) {
            return res.status(404).json({ error: 'Pedido no encontrado.' });
        }
        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el pedido.',
            detalle: error.message
        });
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
        res.status(500).json({
            error: 'Error al eliminar el pedido.',
            detalle: error.message
        });
    }
};

module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
    updatePedido,
    deletePedido,
};
