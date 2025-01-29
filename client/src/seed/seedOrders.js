const mongoose = require('mongoose');
const Pedido = require('../../../server/models/pedidoModel');
const Cliente = require('../../../server/models/clienteModel');
const Producto = require('../../../server/models/productoModel');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto_grado', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Conectado a MongoDB');

  // Eliminar pedidos existentes
  await Pedido.deleteMany({});

  // Obtener clientes y productos existentes
  const clientes = await Cliente.find();
  const productos = await Producto.find();

  if (clientes.length < 9 || productos.length < 27) {
    console.error('No hay suficientes clientes o productos en la base de datos.');
    mongoose.connection.close();
    return;
  }

  // Crear pedidos de ejemplo
  const pedidos = [
    {
      idPedido: 'PED001',
      cliente: clientes[0]._id,
      productos: [
        { producto: productos[0]._id, cantidad: 4 },
        { producto: productos[1]._id, cantidad: 1 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.387Z'),
      direccionEntrega: {
        calle: 'Senda Benjamín 59',
        ciudad: 'Cochabamba',
        codigoPostal: '1001',
        pais: 'Pais 1',
      },
      estado: 'Pendiente',
      notas: 'Entregar antes de las 9 AM, tienda abre temprano.',
      precioTotal: 94.95,
    },
    {
      idPedido: 'PED002',
      cliente: clientes[1]._id,
      productos: [
        { producto: productos[2]._id, cantidad: 4 },
        { producto: productos[3]._id, cantidad: 6 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.422Z'),
      direccionEntrega: {
        calle: 'Puente Juan Carlos, 27',
        ciudad: 'Cochabamba',
        codigoPostal: '1002',
        pais: 'Pais 2',
      },
      estado: 'Pendiente',
      notas: 'Después de las 6 PM, disponible solo en la noche.',
      precioTotal: 4259.90,
    },
    {
      idPedido: 'PED003',
      cliente: clientes[2]._id,
      productos: [
        { producto: productos[4]._id, cantidad: 8 },
        { producto: productos[5]._id, cantidad: 9 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.435Z'),
      direccionEntrega: {
        calle: 'Urbanización Vicente, 4',
        ciudad: 'Cochabamba',
        codigoPostal: '1003',
        pais: 'Pais 3',
      },
      estado: 'Pendiente',
      notas: 'Entre 2 PM y 4 PM, horario de menor tráfico.',
      precioTotal: 10099.83,
    },
    {
      idPedido: 'PED004',
      cliente: clientes[3]._id,
      productos: [
        { producto: productos[6]._id, cantidad: 7 },
        { producto: productos[7]._id, cantidad: 6 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.446Z'),
      direccionEntrega: {
        calle: 'Carretera Ricardo Roybal, 9',
        ciudad: 'Santa Cruz',
        codigoPostal: '1004',
        pais: 'Pais 4',
      },
      estado: 'Pendiente',
      notas: 'Evitar entregas los lunes, mejor martes en la mañana.',
      precioTotal: 4699.87,
    },
    {
      idPedido: 'PED005',
      cliente: clientes[4]._id,
      productos: [
        { producto: productos[8]._id, cantidad: 1 },
        { producto: productos[9]._id, cantidad: 4 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.456Z'),
      direccionEntrega: {
        calle: 'Bajada Natalia Pérez 24',
        ciudad: 'Santa Cruz',
        codigoPostal: '1005',
        pais: 'Pais 5',
      },
      estado: 'Pendiente',
      notas: 'Preferencia por entregas a primera hora, 8 AM.',
      precioTotal: 3399.95,
    },
    {
      idPedido: 'PED006',
      cliente: clientes[5]._id,
      productos: [
        { producto: productos[10]._id, cantidad: 9 },
        { producto: productos[11]._id, cantidad: 10 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.465Z'),
      direccionEntrega: {
        calle: 'Poblado Luis s/n.',
        ciudad: 'Potosi',
        codigoPostal: '1006',
        pais: 'Pais 6',
      },
      estado: 'Pendiente',
      notas: 'Solo recibir entre 11 AM y 1 PM.',
      precioTotal: 10199.81,
    },
    {
      idPedido: 'PED007',
      cliente: clientes[6]._id,
      productos: [
        { producto: productos[12]._id, cantidad: 4 },
        { producto: productos[13]._id, cantidad: 5 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.471Z'),
      direccionEntrega: {
        calle: 'Urbanización Jacobo Vergara, 1',
        ciudad: 'Potosi',
        codigoPostal: '1007',
        pais: 'Pais 7',
      },
      estado: 'Pendiente',
      notas: 'Entregar antes del mediodía, después no hay personal.',
      precioTotal: 7199.91,
    },
    {
      idPedido: 'PED008',
      cliente: clientes[7]._id,
      productos: [
        { producto: productos[14]._id, cantidad: 2 },
        { producto: productos[15]._id, cantidad: 2 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.477Z'),
      direccionEntrega: {
        calle: 'Municipio Germán, 87',
        ciudad: 'La Paz',
        codigoPostal: '1008',
        pais: 'Pais 8',
      },
      estado: 'Pendiente',
      notas: 'Disponible después de las 5 PM por cierre de caja.',
      precioTotal: 3399.96,
    },
    {
      idPedido: 'PED009',
      cliente: clientes[8]._id,
      productos: [
        { producto: productos[16]._id, cantidad: 10 },
        { producto: productos[17]._id, cantidad: 2 },
      ],
      fechaEntrega: new Date('2025-01-29T16:46:42.482Z'),
      direccionEntrega: {
        calle: 'Salida Gloria Ruelas 58',
        ciudad: 'Pando',
        codigoPostal: '1009',
        pais: 'Pais 9',
      },
      estado: 'Pendiente',
      notas: 'No entregar en horarios de almuerzo (12 PM - 2 PM).',
      precioTotal: 5119.88,
    },
  ];

  await Pedido.insertMany(pedidos);
  console.log('Pedidos añadidos correctamente');
  mongoose.connection.close();
});