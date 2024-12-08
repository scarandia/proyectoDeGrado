const express = require('express');
const router = express.Router();
const { register, login, deleteUser } = require('../controllers/usuarioController');
//const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Rutas para los endpoints
router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:userId', deleteUser);  // Ruta para eliminar usuario

module.exports = router;