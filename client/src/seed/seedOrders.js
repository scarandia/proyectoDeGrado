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
      const cliente = clientes[i % clientes.length];
      const productosPedido = [
        { producto: productos[i % productos.length]._id, cantidad: Math.floor(Math.random() * 10) + 1 },
        { producto: productos[(i + 1) % productos.length]._id, cantidad: Math.floor(Math.random() * 10) + 1 },
      ];

      // Calculate total price
      let precioTotal = 0;
      for (const item of productosPedido) {
        const producto = productos.find(p => p._id.equals(item.producto));
        precioTotal += producto.precio * item.cantidad;
      }

      const pedido = new Pedido({
        idPedido: `PED00${i}`,
        nombreCliente: cliente.nombreCliente,
        apellidoCliente: cliente.apellidoCliente,
        productos: productosPedido,
        fechaEntrega: new Date(),
        direccionEntrega: {
          calle: `Calle ${i}`,
          ciudad: `Ciudad ${i}`,
          codigoPostal: 1000 + i,
          pais: `Pais ${i}`,
        },
        estado: 'Pendiente',
        notas: `Notas del pedido ${i}`,
        precioTotal,
      });
      await pedido.save();
      pedidos.push(pedido);

      // Update client's order history
      cliente.historialPedidos.push({
        idPedido: pedido._id,
        fechaPedido: pedido.createdAt,
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