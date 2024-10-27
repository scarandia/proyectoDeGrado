const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  idPedido: {
    type: String,
    required: true,
    unique: true
  },
   cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productos: [{
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: Number,
    //precioUnitario: Number //deberia jalarse el precio del prod
  }],
  fecha_creado: {
    type: Date,
    required: true
  },
  fecha_entrega: {
    type: Date,
    required: true
  },
  distribuidorAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Distribuidor'
},
  direccion_entrega: {
    calle: {
      type: String,
      required: true
    },
    ciudad: {
      type: String,
      required: false
    },
    codigo_postal: {
      type: Number,
      required: false
    },
    pais: {
      type: String,
      required: false
    },
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Entregado', 'Cancelado'],
    required: true
  },
  precio_total: {
    type: Number,
    required: true //Formulaaa (precio unit*pedidos)
  },
  notas: {
    type: String,
    required: false
  }
}, { collection: 'pedidos' });

module.exports = mongoose.model('Pedido', PedidoSchema);
