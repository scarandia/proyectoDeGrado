const express = require('express');
const router = express.Router();
const {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
  getClienteByCI, // Importa el nuevo controlador
  checkCI
} = require('../controllers/clienteController');

router.post('/', createCliente);
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);
router.get('/ci/:ci', getClienteByCI); // Nueva ruta para buscar cliente por CI
router.get('/checkCI/:CI', checkCI); // Ruta para verificar si el CI ya existe

module.exports = router;