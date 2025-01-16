const mongoose = require('mongoose');
const Pedido = require('../../../server/models/pedidoModel');
const Cliente = require('../../../server/models/clienteModel');
const Producto = require('../../../server/models/productoModel');

const seedPedidos = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/proyecto_grado', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing Pedido data
    await Pedido.deleteMany({});

    // Fetch existing clients and products
    const clientes = await Cliente.find();
    const productos = await Producto.find();

    // Debugging: Log the number of clients and products found
    console.log(`Found ${clientes.length} clients`);
    console.log(`Found ${productos.length} products`);

    if (clientes.length === 0 || productos.length === 0) {
      throw new Error('No clients or products found in the database. Please seed clients and products first.');
    }

    // Create sample orders
    const pedidos = [];
    for (let i = 1; i <= 10; i++) {
      const pedido = new Pedido({
        idPedido: `PED00${i}`,
        cliente: clientes[i % clientes.length]._id,
        productos: [
          { producto: productos[i % productos.length]._id, cantidad: Math.floor(Math.random() * 10) + 1 },
          { producto: productos[(i + 1) % productos.length]._id, cantidad: Math.floor(Math.random() * 10) + 1 },
        ],
        fecha_creado: new Date(),
        fecha_entrega: new Date(),
        direccion_entrega: {
          calle: `Calle ${i}`,
          ciudad: `Ciudad ${i}`,
          codigo_postal: 1000 + i,
          pais: `Pais ${i}`,
        },
        estado: 'Pendiente',
        notas: `Notas del pedido ${i}`,
      });
      await pedido.save();
      pedidos.push(pedido);

      // Update client's order history
      const cliente = clientes[i % clientes.length];
      cliente.historialPedidos.push({
        idPedido: pedido._id,
        fechaPedido: pedido.fecha_creado,
        estadoPedido: pedido.estado,
      });
      await cliente.save();
    }

    console.log('Seed data for orders created successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPedidos();