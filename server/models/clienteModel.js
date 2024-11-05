const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    idCliente: {
        type: String,
        required: false,
        unique: true
    },
    nombreCliente: {
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
            required: false
        },
        codigo_postal: {
            type: String,
            required: false
        },
        pais: {
            type: String,
            required: false
        }
    },
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
    historialPedidos: [{
        idPedido: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido'
        },
        fechaPedido: Date,
        estadoPedido: String
    }],
    deuda: {
        type: Number,
        required: false
    },
    notas: {
        type: String,
        required: false
    }
}, { collection: 'clientes' });

module.exports = mongoose.model('Cliente', ClienteSchema);
