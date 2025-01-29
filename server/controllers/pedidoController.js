const Pedido = require('../models/pedidoModel');
const Producto = require('../models/productoModel');
const Cliente = require('../models/clienteModel');

const createPedido = async (req, res) => {
    try {
        const { productos, ciCliente, fechaEntrega, notas, direccionEntrega } = req.body;

        console.log('Verificando stock disponible para los productos:', productos);

        // Verificar stock disponible y calcular el precio total
        let precioTotal = 0;
        for (const item of productos) {
            const producto = await Producto.findById(item.producto);
            if (!producto) {
                console.error(`Producto con ID ${item.producto} no encontrado.`);
                return res.status(404).json({ error: `Producto con ID ${item.producto} no encontrado.` });
            }
            if (producto.stock < item.cantidad) {
                console.error(`Stock insuficiente para el producto ${producto.nombreProducto}.`);
                return res.status(400).json({ error: `Stock insuficiente para el producto ${producto.nombreProducto}.` });
            }
            precioTotal += producto.precio * item.cantidad;
        }

        console.log('Stock verificado, procediendo a reducir el stock.');

        // Reducir stock
        for (const item of productos) {
            await Producto.findByIdAndUpdate(item.producto, {
                $inc: { stock: -item.cantidad }
            });
        }

        console.log('Stock reducido, asignando número de pedido.');

        // Asignar número de pedido en formato PED###
        let nuevoIdPedido;
        let idPedidoExists = true;
        let intento = 0;
        while (idPedidoExists && intento < 1000) { // Limitar el número de intentos para evitar bucles infinitos
            const ultimoPedido = await Pedido.findOne().sort({ createdAt: -1 });
            if (ultimoPedido && ultimoPedido.idPedido) {
                const ultimoNumero = parseInt(ultimoPedido.idPedido.slice(3)); // Extrae el número, excluyendo "PED"
                nuevoIdPedido = 'PED' + String(ultimoNumero + 1 + intento).padStart(3, '0'); // Da formato y añade el intento
            } else {
                nuevoIdPedido = 'PED001'; // Si no existen pedidos
            }

            // Verificar si el nuevo idPedido ya existe
            const existingPedido = await Pedido.findOne({ idPedido: nuevoIdPedido });
            if (!existingPedido) {
                idPedidoExists = false;
            } else {
                console.log(`El idPedido ${nuevoIdPedido} ya existe. Generando uno nuevo.`);
                intento++;
            }
        }

        if (idPedidoExists) {
            console.error('No se pudo generar un idPedido único después de 1000 intentos.');
            return res.status(500).json({ error: 'No se pudo generar un idPedido único.' });
        }

        console.log('Número de pedido asignado:', nuevoIdPedido);

        // Obtener datos del cliente
        const cliente = await Cliente.findOne({ CI: ciCliente });
        if (!cliente) {
            console.error(`Cliente con CI ${ciCliente} no encontrado.`);
            return res.status(404).json({ error: `Cliente con CI ${ciCliente} no encontrado.` });
        }

        const nuevoPedido = new Pedido({
            idPedido: nuevoIdPedido,
            cliente: cliente._id,
            productos,
            fechaEntrega,
            direccionEntrega,
            estado: 'Pendiente',
            notas,
            precioTotal,
        });

        console.log('Creando nuevo pedido:', nuevoPedido);

        await nuevoPedido.save()
            .then(result => {
                console.log('Pedido creado exitosamente:', result);
                res.status(201).json(result);
            })
            .catch(err => {
                console.error('Error al guardar el pedido:', err);
                res.status(500).json({ error: 'Error al guardar el pedido.', detalle: err.message });
            });

    } catch (error) {
        console.error('Error al crear el pedido:', error);
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
        const pedido = await Pedido.findById(req.params.id)
            .populate({ path: 'productos.producto', select: 'nombreProducto precio' })
            .populate('cliente', 'nombreCliente apellidoCliente');
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
            .populate('cliente', 'nombreCliente apellidoCliente');
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