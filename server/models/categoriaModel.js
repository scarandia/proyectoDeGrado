const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    nombreCategoria: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: false
    }
}, { collection: 'categorias' });

module.exports = mongoose.model('Categoria', CategorySchema);