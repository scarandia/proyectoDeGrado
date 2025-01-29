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
    apellidoCliente: {
        type: String,
        required: true
    },
    CI: {
        type: String,
        required: true,
        unique: true
    },
    nombreNegocio: {
        type: String,
        required: true
    },
    tipoNegocio: {
        type: String,
        enum: ['Tienda de Barrio', 'Minorista', 'Mayorista', 'Supermercado', 'Otro'],
        required: true,
    },
    otroTipoNegocio: { 
        type: String, 
        required: false 
    }, // En caso de que el tipo sea "Otro"
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
}, {
    collection: 'clientes',
    timestamps: true
});

module.exports = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);