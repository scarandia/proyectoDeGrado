const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  idPedido: {
    type: String,
    required: true,
    unique: true
  },
  fecha_creado: {
    type: Date,
    required: true
  },
  fecha_entrega: {
    type: Date,
    required: true
  },
  productos: [{
    nombre: String,
    cantidad: Number,
    precio: Number
  }],
  direccion_entrega: {
    calle: {
      type: String,
      required: true
    },
    ciudad: {
      type: String,
      required: true
    },
    codigo_postal: {
      type: String,
      required: true
    },
    pais: {
      type: String,
      required: true
    },
  },
  estado: {
    type: String,
    required: true
  },
  //Hacer una lista de clientes guardados 
  cliente: {
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
