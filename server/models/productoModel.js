const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    idProducto: {
        type: String,
        required: true,
        unique: true
    },
    nombreProducto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    proveedor: {
        nombre: {
            type: String,
            required: false
        },
        contacto: {
            type: String,
            required: false
        }
    },
    imagenURL: {
        type: String,
        required: false
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { collection: 'productos' });

module.exports = mongoose.model('Producto', ProductoSchema);
