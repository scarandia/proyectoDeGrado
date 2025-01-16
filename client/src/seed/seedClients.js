const mongoose = require('mongoose');
const Cliente = require('../models/clienteModel');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto_grado', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Conectado a MongoDB');

  // Eliminar clientes existentes
  await Cliente.deleteMany({});

  // Crear clientes de ejemplo
  const clientes = [
    {
      idCliente: 'C001',
      nombreCliente: 'Juan',
      apellidoCliente: 'Pérez',
      CI: '12345678',
      nombreNegocio: 'Tienda Juan',
      tipoNegocio: 'Tienda de Barrio',
      direccion: {
        calle: 'Calle Falsa 123',
        ciudad: 'Ciudad Falsa',
        codigo_postal: '12345',
        pais: 'País Falso'
      },
      contacto: {
        telefono: '555-1234',
        email: 'juan@example.com'
      },
      historialPedidos: [],
      deuda: 0,
      notas: 'Cliente regular'
    },
    {
      idCliente: 'C002',
      nombreCliente: 'María',
      apellidoCliente: 'Gómez',
      CI: '87654321',
      nombreNegocio: 'Supermercado María',
      tipoNegocio: 'Supermercado',
      direccion: {
        calle: 'Avenida Siempre Viva 742',
        ciudad: 'Ciudad Falsa',
        codigo_postal: '54321',
        pais: 'País Falso'
      },
      contacto: {
        telefono: '555-5678',
        email: 'maria@example.com'
      },
      historialPedidos: [],
      deuda: 100,
      notas: 'Cliente con deuda'
    },
    {
        idCliente: 'C003',
        nombreCliente: 'Carlos',
        apellidoCliente: 'López',
        CI: '11223344',
        nombreNegocio: 'Minorista Carlos',
        tipoNegocio: 'Minorista',
        direccion: {
          calle: 'Calle Principal 456',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '67890',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-6789',
          email: 'carlos@example.com'
        },
        historialPedidos: [],
        deuda: 50,
        notas: 'Cliente frecuente'
      },
      {
        idCliente: 'C004',
        nombreCliente: 'Ana',
        apellidoCliente: 'Martínez',
        CI: '55667788',
        nombreNegocio: 'Mayorista Ana',
        tipoNegocio: 'Mayorista',
        direccion: {
          calle: 'Calle Secundaria 789',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '98765',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-9876',
          email: 'ana@example.com'
        },
        historialPedidos: [],
        deuda: 200,
        notas: 'Cliente con historial de pedidos grandes'
      },
      {
        idCliente: 'C005',
        nombreCliente: 'Luis',
        apellidoCliente: 'Hernández',
        CI: '99887766',
        nombreNegocio: 'Supermercado Luis',
        tipoNegocio: 'Supermercado',
        direccion: {
          calle: 'Avenida Central 321',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '54321',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-4321',
          email: 'luis@example.com'
        },
        historialPedidos: [],
        deuda: 0,
        notas: 'Cliente nuevo'
      },
      {
        idCliente: 'C006',
        nombreCliente: 'Laura',
        apellidoCliente: 'García',
        CI: '33445566',
        nombreNegocio: 'Tienda Laura',
        tipoNegocio: 'Tienda de Barrio',
        direccion: {
          calle: 'Calle Tercera 654',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '12345',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-6543',
          email: 'laura@example.com'
        },
        historialPedidos: [],
        deuda: 75,
        notas: 'Cliente con deuda moderada'
      },
      {
        idCliente: 'C007',
        nombreCliente: 'Pedro',
        apellidoCliente: 'Ramírez',
        CI: '44556677',
        nombreNegocio: 'Minorista Pedro',
        tipoNegocio: 'Minorista',
        direccion: {
          calle: 'Calle Cuarta 987',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '67890',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-7890',
          email: 'pedro@example.com'
        },
        historialPedidos: [],
        deuda: 150,
        notas: 'Cliente con historial de pedidos frecuentes'
      },
      {
        idCliente: 'C008',
        nombreCliente: 'Sofía',
        apellidoCliente: 'Fernández',
        CI: '66778899',
        nombreNegocio: 'Mayorista Sofía',
        tipoNegocio: 'Mayorista',
        direccion: {
          calle: 'Calle Quinta 321',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '98765',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-3210',
          email: 'sofia@example.com'
        },
        historialPedidos: [],
        deuda: 300,
        notas: 'Cliente con historial de pedidos grandes y deuda'
      },
      {
        idCliente: 'C009',
        nombreCliente: 'Miguel',
        apellidoCliente: 'Torres',
        CI: '77889900',
        nombreNegocio: 'Supermercado Miguel',
        tipoNegocio: 'Supermercado',
        direccion: {
          calle: 'Avenida Sexta 654',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '54321',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-6540',
          email: 'miguel@example.com'
        },
        historialPedidos: [],
        deuda: 0,
        notas: 'Cliente nuevo'
      },
      {
        idCliente: 'C010',
        nombreCliente: 'Lucía',
        apellidoCliente: 'Sánchez',
        CI: '88990011',
        nombreNegocio: 'Tienda Lucía',
        tipoNegocio: 'Tienda de Barrio',
        direccion: {
          calle: 'Calle Séptima 987',
          ciudad: 'Ciudad Falsa',
          codigo_postal: '12345',
          pais: 'País Falso'
        },
        contacto: {
          telefono: '555-9870',
          email: 'lucia@example.com'
        },
        historialPedidos: [],
        deuda: 25,
        notas: 'Cliente con deuda pequeña'
      },
    ];
  
    await Cliente.insertMany(clientes);
    console.log('Clientes añadidos correctamente');
    mongoose.connection.close();
  });