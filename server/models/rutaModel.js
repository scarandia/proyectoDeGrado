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
    pedidosAsignados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    }],
    diaAsignado: {
        type: String, // Lunes, Martes, etc.
        required: true
    },
    tiempoEstimado: String
}, { collection: 'rutas' });

module.exports = mongoose.model('Ruta', RutaSchema);
