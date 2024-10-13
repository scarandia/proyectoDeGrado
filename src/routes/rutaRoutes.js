const express = require('express');
const router = express.Router();
const {
    createRuta,
    getRutas,
    getRutaById,
    updateRuta,
    deleteRuta
} = require('../controllers/rutaController');

// Ruta para crear un nuevo Ruta
router.post('/', createRuta);

// Ruta para obtener todos los Rutas
router.get('/', getRutas);

// Ruta para obtener un Ruta por ID
router.get('/:id', getRutaById);

// Ruta para actualizar un Ruta por ID
router.put('/:id', updateRuta);

// Ruta para eliminar un Ruta por ID
router.delete('/:id', deleteRuta);

module.exports = router;
