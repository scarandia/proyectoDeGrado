const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidoModel');

// Ejemplo de ruta POST para crear un pedido
router.post('/pedidos', async (req, res) => {
    try {
        const nuevoPedido = new Pedido(req.body);
        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json({ mensaje: 'Pedido creado', pedido: pedidoGuardado });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al crear el pedido', error: err.message });
    }
});

// Ruta GET para obtener todos los pedidos
router.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedido.find();

         // Orden de los campos de pedido
    const pedidosOrdenados = pedidos.map(pedido => {
        return {
          idPedido: pedido.idPedido,
          fecha_creado: pedido.fecha_creado,
          fecha_entrega: pedido.fecha_entrega,
          productos: pedido.productos,
          direccion_entrega: pedido.direccion_entrega,
          estado: pedido.estado,
          cliente: pedido.cliente,
          precio_total: pedido.precio_total,
          notas: pedido.notas
        };
      });
  
      res.json(pedidosOrdenados); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;