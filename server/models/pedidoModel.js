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
    enum: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
    required: true
  },
  precio_total: {
    type: Number,
    required: false
  },
  notas: {
    type: String,
    required: false
  }
}, { collection: 'pedidos' });

// Middleware para calcular el precio total
PedidoSchema.pre('save', async function (next) {
  try {
    // Realiza el populate de los productos
    await this.populate('productos.producto'); // Cambiado de execPopulate()

    // Calcula el precio total
    this.precio_total = this.productos.reduce((total, item) => {
      const precioUnitario = item.producto.precio; // Verifica que "producto" tenga "precio"
      return total + (precioUnitario * item.cantidad);
    }, 0);

    next(); // Continúa al guardar
  } catch (error) {
    next(error); // Pasa el error al manejador
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
