const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  direccionEntrega: { type: String, required: true },
  fechaEntrega: { type: Date, required: true },
  estado: { type: String, enum: ['pendiente', 'en camino', 'entregado'], default: 'pendiente' },
});

module.exports = mongoose.model('Pedido', PedidoSchema);
