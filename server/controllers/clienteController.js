const Cliente = require('../models/clienteModel');

// Crear cliente con autoincremento en idCliente
const createCliente = async (req, res) => {
    try {
        const ultimoCliente = await Cliente.findOne().sort({ idCliente: -1 });
        let nuevoIdCliente;
        if (ultimoCliente && ultimoCliente.idCliente) {
            const ultimoNumero = parseInt(ultimoCliente.idCliente.slice(1)); // Extrae el número, excluyendo "C"
            nuevoIdCliente = 'C' + String(ultimoNumero + 1).padStart(3, '0'); // Da formato
        } else {
            nuevoIdCliente = 'C001'; // Si no existen clientes
        }

        // Nuevo cliente con id autoincrementado y valores por defecto
        const nuevoCliente = new Cliente({
            idCliente: nuevoIdCliente,
            nombreCliente: req.body.nombreCliente,
            apellidoCliente: req.body.apellidoCliente,
            CI: req.body.CI,
            nombreNegocio: req.body.nombreNegocio,
            tipoNegocio: req.body.tipoNegocio,
            direccion: req.body.direccion,
            contacto: req.body.contacto,
            historialPedidos: [],
            deuda: 0,
            notas: req.body.notas
        });
        // Agregar otroTipoNegocio si tipoNegocio es "Otro"
        if (req.body.tipoNegocio === 'Otro' && req.body.otroTipoNegocio) {
            nuevoCliente.otroTipoNegocio = req.body.otroTipoNegocio;
        }

        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente.', detalle: error.message });
    }
};

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes.', detalle: error.message });
    }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente.', detalle: error.message });
    }
};

// Obtener un cliente por CI
const getClienteByCI = async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ CI: req.params.ci });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error });
    }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente.', detalle: error.message });
    }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }
        res.status(200).json({ message: 'Cliente eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente.', detalle: error.message });
    }
};

// Verificar si el CI ya existe
const checkCI = async (req, res) => {
    try {
        const { CI } = req.params;
        const cliente = await Cliente.findOne({ CI });
        if (cliente) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error al verificar el CI:', error);
        res.status(500).json({ message: 'Error al verificar el CI' });
    }
};

module.exports = {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
    getClienteByCI, // Exporta el nuevo controlador
    checkCI
};