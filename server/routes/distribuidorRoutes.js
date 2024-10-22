const express = require('express');
const router = express.Router();
const {
    createDistribuidor,
    getDistribuidores,
    getDistribuidorById,
    updateDistribuidor,
    deleteDistribuidor
} = require('../controllers/distribuidorController');

// Ruta para crear un nuevo distribuidor
router.post('/', createDistribuidor);

// Ruta para obtener todos los distribuidores
router.get('/', getDistribuidores);

// Ruta para obtener un distribuidor por ID
router.get('/:id', getDistribuidorById);

// Ruta para actualizar un distribuidor por ID
router.put('/:id', updateDistribuidor);

// Ruta para eliminar un distribuidor por ID
router.delete('/:id', deleteDistribuidor);

module.exports = router;
