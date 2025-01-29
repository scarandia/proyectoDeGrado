const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  idPedido: {
    type: String,
    required: true,
    unique: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
  }],
  fechaEntrega: {
    type: Date,
    required: true,
  },
  direccionEntrega: {
    calle: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    codigoPostal: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Enviado', 'Entregado'],
    default: 'Pendiente',
  },
  notas: {
    type: String,
    required: false,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
}, {
  collection: 'pedidos',
  timestamps: true,
});

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);