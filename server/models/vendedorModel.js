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
      required: false,
      unique: true
    }
  },
  direccion: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'vendedores',
  timestamps: true
});
module.exports = mongoose.model('Vendedor', VendedorSchema);