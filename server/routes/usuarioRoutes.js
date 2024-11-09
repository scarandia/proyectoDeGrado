const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

//registrar usuario
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

// Crear usuario por administrador, protegido por autenticación y autorización
router.post('/create-user', authenticate, isAdmin, authController.createUser);

module.exports = router;