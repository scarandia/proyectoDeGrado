const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoriaModel');
const { getCategorias } = require('../controllers/categoriaController');


// Ruta para crear una nueva categoría
router.post('/', async (req, res) => {
    const { nombreCategoria, descripcion } = req.body;
    const categoria = new Categoria({ nombreCategoria, descripcion });

    try {
        const nuevaCategoria = await categoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para obtener todas las categorías
router.get('/', getCategorias);

module.exports = router;

module.exports = router;