const mongoose = require('mongoose');

const RutaSchema = new mongoose.Schema({
    idRuta: {
        type: String,
        required: true,
        unique: true
    },
    nombreRuta: {
        type: String,
        required: true
    },
    vendedoresAsignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendedor'
    }],
    distribuidoresAsignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distribuidor'
    }],
    pedidosAsignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }],
    diaAsignado: {
        type: String,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        required: true
    },
    tiempoEstimado: {
        type: Number,
        default: 0
    }
}, { collection: 'rutas' });

module.exports = mongoose.model('Ruta', RutaSchema);
