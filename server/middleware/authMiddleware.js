const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel');

// Middleware de autenticación
exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extraer token del formato "Bearer token"
  console.log("Token recibido en el middleware:", token);  // Verifica el token recibido

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error al verificar el token:", err);  // Verifica el error de verificación
      return res.status(401).json({ message: 'Failed to authenticate token' });    }

    console.log("Token decodificado:", decoded);  // Inspecciona los datos decodificados
    req.userId = decoded.id;  // Guardamos el ID del usuario
    next();
  });
};

// Middleware de autorización para administrador
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Require Admin Role!' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};