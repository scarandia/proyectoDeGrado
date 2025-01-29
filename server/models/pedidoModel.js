const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  idPedido: { type: String, required: true, unique: true },
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
    cantidad: { type: Number, required: true },
  }],
  estado: { type: String, required: true },
  fecha_creado: { type: Date, required: true },
  fecha_entrega: { type: Date, required: true },
  direccion_entrega: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: false },
    codigo_postal: { type: String, required: false },
    pais: { type: String, required: false },
  },
  precio_total: { type: Number, required: true },
  notas: { type: String, required: false },
}, {
  collection: 'pedidos',
  timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema);