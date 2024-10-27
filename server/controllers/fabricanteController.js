const Fabricante = require('../models/fabricanteModel');

// Crear
const createFabricante = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const nuevoFabricante = new Fabricante(req.body);
        await nuevoFabricante.save();
        res.status(201).json(nuevoFabricante);
    } catch (error) {
        console.error('Error al crear fabricante:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos
const getFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.find();
        res.status(200).json(fabricantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los fabricantes.' });
    }
};

//Buscar por ID
const getFabricanteById = async (req, res) => {
    try {
        const fabricante = await Fabricante.findById(req.params.id);
        if (!fabricante) {
            return res.status(404).json({ error: 'Fabricante no encontrado.' });
        }
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el fabricante.' });
    }
};

// Actualizar
const updateFabricante = async (req, res) => {
    try {
        const fabricanteActualizado = await Fabricante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fabricanteActualizado) {
            return res.status(404).json({ error: 'Fabricante no encontrado.' });
        }
        res.status(200).json(fabricanteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el fabricante.' });
    }
};

//Eliminar
const deleteFabricante = async (req, res) => {
    try {
        const fabricanteEliminado = await Fabricante.findByIdAndDelete(req.params.id);
        if (!fabricanteEliminado) {
            return res.status(404).json({ error: 'Fabricante no encontrado.' });
        }
        res.status(200).json({ message: 'Fabricante eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el fabricante.' });
    }
};

module.exports = {
    createFabricante,
    getFabricantes,
    getFabricanteById,
    updateFabricante,
    deleteFabricante
};
