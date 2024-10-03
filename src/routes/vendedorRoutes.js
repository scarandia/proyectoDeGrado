const express = require('express');
const router = express.Router();
const {
    createVendedor,
    getVendedores,
    getVendedorById,
    updateVendedor,
    deleteVendedor
} = require('../controllers/vendedorController');

// Ruta para crear un nuevo vendedor
router.post('/', createVendedor);

// Ruta para obtener todos los vendedores
router.get('/', getVendedores);

// Ruta para obtener un vendedor por ID
router.get('/:id', getVendedorById);

// Ruta para actualizar un vendedor por ID
router.put('/:id', updateVendedor);

// Ruta para eliminar un vendedor por ID
router.delete('/:id', deleteVendedor);

module.exports = router;
