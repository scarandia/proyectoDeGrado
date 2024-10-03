const express = require('express');
const router = express.Router();
const {
    createFabricante,
    getFabricantes,
    getFabricanteById,
    updateFabricante,
    deleteFabricante
} = require('../controllers/fabricanteController');

// Ruta para crear un nuevo fabricante
router.post('/', createFabricante);

// Ruta para obtener todos los fabricantes
router.get('/', getFabricantes);

// Ruta para obtener un fabricante por ID
router.get('/:id', getFabricanteById);

// Ruta para actualizar un fabricante por ID
router.put('/:id', updateFabricante);

// Ruta para eliminar un fabricante por ID
router.delete('/:id', deleteFabricante);

module.exports = router;
