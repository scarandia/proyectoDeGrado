const mongoose = require('mongoose');

const DistribuidorSchema = new mongoose.Schema({
    idDistribuidor: {
        type: String,
        required: true,
        unique: true
    },
    nombreDistribuidor: {
        type: String,
        required: true
    },
    historialEntregas: [{
        pedido: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido'
        },
        fechaEntrega: Date,
        estadoEntrega: String
    }],
    contacto: {
        telefono: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        }
    },
    notas: String
}, { collection: 'distribuidores' });

module.exports = mongoose.model('Distribuidor', DistribuidorSchema);