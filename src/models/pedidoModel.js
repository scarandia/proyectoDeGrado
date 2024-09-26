const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  idPedido: {
    type: String,
    required: true,
    unique: true
  },
   //Hacer una lista de clientes guardados 
   cliente: {
    type: String,
    required: true
  },
  productos: [{
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: Number,
    precioUnitario: Number
  }],
  fecha_creado: {
    type: Date,
    required: true
  },
  fecha_entrega: {
    type: Date,
    default: 'pendiente',
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
      type: String,
      required: false
    },
    pais: {
      type: String,
      required: false
    },
  },
  estado: {
    type: String,
    required: true
  },
  precio_total: {
    type: Number,
    required: true
  },
  notas: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
