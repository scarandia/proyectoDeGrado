const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware de autenticación
exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
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