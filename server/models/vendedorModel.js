const mongoose = require('mongoose');

const VendedorSchema = new mongoose.Schema({
  idVendedor: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  contacto: {
    telefono: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
      unique: true
    }
  },
  ruta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ruta'
  },
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido'
  }],
  clientesRegistrados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  }],
  activo: {
    type: Boolean,
    default: true
  }
}, { collection: 'vendedores' });

module.exports = mongoose.model('Vendedor', VendedorSchema);