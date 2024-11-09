const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email ya está registrado' });
    }

    // Crear nuevo usuario
    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    // Enviar respuesta de login exitoso con el token
    res.status(200).json({ message: 'Login exitoso', token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Crear usuario por administrador
exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Crear nuevo usuario
    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado con éxito por administrador' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};