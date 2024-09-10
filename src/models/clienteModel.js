const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    idCliente: {
        type: String,
        required: true,
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
    notas: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
