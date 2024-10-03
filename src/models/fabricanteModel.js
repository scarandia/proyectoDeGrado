const mongoose = require('mongoose');

const FabricanteSchema = new mongoose.Schema({
    idFabricante: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        calle: {
            type: String,
            required: true
        },
        ciudad: {
            type: String,
            required: true
        },
        codigo_postal: {
            type: String,
            required: true
        },
        pais: {
            type: String,
            required: true
        }
    },
    contacto: {
        telefono: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        sitio_web: {
            type: String,
            required: false
        },
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    activo: {
        type: Boolean,
        default: true
    }
}, { collection: 'fabricantes' });
module.exports = mongoose.model('Fabricante', FabricanteSchema);
