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
  //Manejar ruta AQUI? MANEJARLA DE OTRA MANERA?
  ruta: [{
    dia: {
      type: String, // Ejemplo: "Lunes", "Martes", etc.
      required: true
    },
    tiendas: [{
      nombreTienda: {
        type: String,
        required: true
      },
      direccion: {
        calle: String,
        ciudad: String,
        codigo_postal: String,
        pais: String
      }
    }]
  }],
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido'
  }],
  clientesRegistrados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  }],
  activo: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Vendedor', VendedorSchema);
