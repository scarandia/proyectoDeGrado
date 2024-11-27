const User = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email ya está registrado' });
            res.status(500).json({ error: 'Error al crear usuario.', detalle: error.message });
        }

        // Crear nuevo usuario
        const newUser = new User({ email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', detalle: validationError.message  });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado', detalle: validationError.message  });
        }

        // Comparar la contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        console.log("process.env.JWT_SECRET");
        console.log(process.env.JWT_SECRET);

        
        // Generar token JWT
        const token = jwt.sign({ id: user._id }, "contraseña", {
            expiresIn: 86400, // 24 horas
        });
        
        
        // Enviar respuesta de login exitoso con el token
        res.status(200).json({ message: 'Login exitoso', token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', detalle: validationError.message  });
    }
};


const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Crear nuevo usuario
        const newUser = new User({ email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito por administrador' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', detalle: validationError.message  });
    }
};

module.exports = {
    register, 
    login, 
    createUser
};
