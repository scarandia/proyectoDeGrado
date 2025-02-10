const express = require('express');
const router = express.Router();
const {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto,
    checkNombreProducto
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

// Ruta para verificar si el nombre del producto ya existe
router.get('/checkNombreProducto/:nombreProducto', checkNombreProducto);

module.exports = router;