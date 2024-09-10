const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    idCliente: {
        type: String,
        required: true
    },
    nombreCliente: {
        type: String,
        required: true
    },
    direccionCliente: {
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
        }
    },
    telefonoCliente: {
        type: String,
        required: false
    },
    emailCliente: {
        type: String,
        required: false
    },
    historialPedidos: [{
        idPedido: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido'
        },
        fechaPedido: Date,
        estadoPedido: String
    }],
    notas: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
