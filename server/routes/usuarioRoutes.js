const express = require('express');
const router = express.Router();
const { register, login, deleteUser, getUserProfile } = require('../controllers/usuarioController');
const { authenticate } = require('../middleware/authMiddleware');
//const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Rutas para los endpoints
router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:userId', deleteUser);
router.get('/profile', authenticate, getUserProfile);


module.exports = router;