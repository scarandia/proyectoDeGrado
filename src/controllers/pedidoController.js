// Función para crear un nuevo pedido
exports.crearPedido = (req, res) => {
    const nuevoPedido = req.body; // Datos del pedido desde el cuerpo de la solicitud
    // Aquí va la lógica para guardar el pedido en la base de datos
    res.status(201).send({ message: 'Pedido creado', pedido: nuevoPedido });
};

// Función para obtener un pedido por su ID
exports.obtenerPedido = (req, res) => {
    const pedidoId = req.params.id; // ID del pedido desde la URL
    // Aquí va la lógica para buscar el pedido en la base de datos
    res.send({ message: `Pedido ${pedidoId} encontrado`, estado: 'En ruta' });
};

exports.editarPedido = (req, res) => {
    const edicionPedido = req.params.id; // ID del pedido desde la URL
    // Aquí va la lógica para buscar el pedido en la base de datos
    res.send({ message: `El pedido ${pedidoId} fue editado`})
}