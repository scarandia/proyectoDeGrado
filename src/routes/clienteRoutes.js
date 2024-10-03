const express = require('express');
const router = express.Router();
const {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente
} = require('../controllers/clienteController');

// Ruta para crear un nuevo cliente
router.post('/', createCliente);

// Ruta para obtener todos los clientes
router.get('/', getClientes);

// Ruta para obtener un cliente por ID
router.get('/:id', getClienteById);

// Ruta para actualizar un cliente por ID
router.put('/:id', updateCliente);

// Ruta para eliminar un cliente por ID
router.delete('/:id', deleteCliente);

module.exports = router;
