const Distribuidor = require('../models/distribuidorModel');

// Crear
const createDistribuidor = async (req, res) => {
    try {
        const nuevoDistribuidor = new Distribuidor(req.body);
        await nuevoDistribuidor.save();
        res.status(201).json(nuevoDistribuidor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el distribuidor.', detalle: error.message });
    }
};

//Obtener todos
const getDistribuidores = async (req, res) => {
    try {
        const distribuidores = await Distribuidor.find();
        res.status(200).json(distribuidores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los distribuidores.', detalle: validationError.message  });
    }
};

//Buscar por ID
const getDistribuidorById = async (req, res) => {
    try {
        const distribuidor = await Distribuidor.findById(req.params.id);
        if (!distribuidor) {
            return res.status(404).json({ error: 'Distribuidor no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json(distribuidor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el distribuidor.', detalle: validationError.message  });
    }
};

//Actualizar
const updateDistribuidor = async (req, res) => {
    try {
        const distribuidorActualizado = await Distribuidor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!distribuidorActualizado) {
            return res.status(404).json({ error: 'Distribuidor no encontrado.', detalle: validationError.message});
        }
        res.status(200).json(distribuidorActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el distribuidor.' , detalle: validationError.message });
    }
};

//Eliminar
const deleteDistribuidor = async (req, res) => {
    try {
        const distribuidorEliminado = await Distribuidor.findByIdAndDelete(req.params.id);
        if (!distribuidorEliminado) {
            return res.status(404).json({ error: 'Distribuidor no encontrado.', detalle: validationError.message});
        }
        res.status(200).json({ message: 'Distribuidor eliminado correctamente.'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el distribuidor.', detalle: validationError.message });
    }
};

module.exports = {
    createDistribuidor,
    getDistribuidores,
    getDistribuidorById,
    updateDistribuidor,
    deleteDistribuidor
};
