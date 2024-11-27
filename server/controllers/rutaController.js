const Ruta = require('../models/rutaModel');

// Crear una nueva ruta
const createRuta = async (req, res) => {
    try {
       // console.log('Solicitud recibida para crear ruta:', req.body); // Log para ver si la solicitud llega

        const nuevaRuta = new Ruta(req.body);
        await nuevaRuta.save();

        console.log('Ruta creada exitosamente:', nuevaRuta); // Log para ver si la ruta se crea correctamente
        res.status(201).json(nuevaRuta);
    } catch (error) {
        console.error('Error al crear la ruta:', error.message); // Log para ver el error
        res.status(500).json({ error: 'Error al crear la ruta:', detalle: error.message });
    };
}
// Obtener todas las rutas 
const getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find().populate('vendedoresAsignados').populate('pedidosAsignados');
        res.status(200).json(rutas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutas.', detalle: validationError.message  });
    }
};

// Obtener una ruta por ID
const getRutaById = async (req, res) => {
    try {
        const ruta = await Ruta.findById(req.params.id).populate('vendedoresAsignados').populate('pedidosAsignados');
        if (!ruta) {
            return res.status(404).json({ error: 'Ruta no encontrada.', detalle: validationError.message  });
        }
        res.status(200).json(ruta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la ruta.', detalle: validationError.message  });
    }
};

// Actualizar una ruta
const updateRuta = async (req, res) => {
    try {
        const rutaActualizada = await Ruta.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('vendedoresAsignados').populate('pedidosAsignados');
        if (!rutaActualizada) {
            return res.status(404).json({ error: 'Ruta no encontrada.', detalle: validationError.message  });
        }
        res.status(200).json(rutaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la ruta.', detalle: validationError.message  });
    }
};

// Eliminar una ruta
const deleteRuta = async (req, res) => {
    try {
        const rutaEliminada = await Ruta.findByIdAndDelete(req.params.id);
        if (!rutaEliminada) {
            return res.status(404).json({ error: 'Ruta no encontrada.', detalle: validationError.message  });
        }
        res.status(200).json({ message: 'Ruta eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la ruta.', detalle: validationError.message  });
    }
};

// Exportamos las funciones del controlador
module.exports = {
    createRuta,
    getRutas,
    getRutaById,
    updateRuta,
    deleteRuta
};
