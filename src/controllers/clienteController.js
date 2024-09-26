// Importamos el modelo de Cliente
const Cliente = require('../models/clienteModel');

// Crear un nuevo cliente
const createCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente.' });
    }
};

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes.' });
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
        res.status(500).json({ error: 'Error al obtener el cliente.' });
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
        res.status(500).json({ error: 'Error al actualizar el cliente.' });
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
        res.status(500).json({ error: 'Error al eliminar el cliente.' });
    }
};

// Exportamos las funciones del controlador
module.exports = {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};
