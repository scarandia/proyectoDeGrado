const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/usuarioController');
//const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

//registrar usuario
router.post('/register', register);

//login
router.post('/login', login);

// Crear usuario por administrador, protegido por autenticación y autorización
//router.post('/create-user', authenticate, isAdmin, usuarioController.createUser);

module.exports = router;