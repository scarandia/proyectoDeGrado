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
  apellido: {
    type: String,
    required: true
  },
  ciVendedor: {
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
      required: true,
      unique: true
    }
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { collection: 'vendedores' });

module.exports = mongoose.model('Vendedor', VendedorSchema);