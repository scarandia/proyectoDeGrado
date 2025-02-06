const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  idProducto: {
    type: String,
    required: true,
    unique: true,
  },
  nombreProducto: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imagenURL: {
    type: String,
    required: false,
  },
  activo: {
    type: Boolean,
    default: true,
  },
}, {
  collection: 'productos',
  timestamps: true,
});

module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);