const express = require('express');
const router = express.Router();
const {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto
} = require('../controllers/productoController');

// Ruta para crear un nuevo producto
router.post('/', createProducto);

// Ruta para obtener todos los productos
router.get('/', getProductos);

// Ruta para obtener un producto por ID
router.get('/:id', getProductoById);

// Ruta para actualizar un producto por ID
router.put('/:id', updateProducto);

// Ruta para eliminar un producto por ID
router.delete('/:id', deleteProducto);

module.exports = router;
