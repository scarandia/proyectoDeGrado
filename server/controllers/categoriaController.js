const Categoria = require('../models/categoriaModel');

const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        console.log('Categorias fetched:', categorias); // DEBUG
        res.json(categorias);
    } catch (err) {
        console.error('Error fetching categories:', err); // DEBUG
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCategorias,
};