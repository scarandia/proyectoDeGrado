const express = require('express');
const router = express.Router();
const { register, login, deleteUser, checkEmailExists } = require('../controllers/usuarioController');

// Rutas para los endpoints
router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:userId', deleteUser);  // Ruta para eliminar usuario

// Ruta para verificar si el correo electrónico ya existe
router.get('/checkEmailExists/:email', checkEmailExists);

module.exports = router;