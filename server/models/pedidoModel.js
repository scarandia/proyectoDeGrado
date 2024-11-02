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
    required: true
  },
  notas: {
    type: String,
    required: false
  }
}, { collection: 'pedidos' });

// Middleware para calcular el precio total
PedidoSchema.pre('save', async function (next) {
  try {
    //popular productos -> acceder precios
    await this.populate('productos.producto').execPopulate();

    //calcula precio total
    this.precio_total = this.productos.reduce((total, item) => {
      const precioUnitario = item.producto.precio; 
      return total + (precioUnitario * item.cantidad);
    }, 0);

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
