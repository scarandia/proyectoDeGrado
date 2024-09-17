const express = require('express');
const router = express.Router();
const Fabricante = require('../models/fabricanteModel');

// Crear un fabricante
router.post('/fabricantes', async (req, res) => {
    try {
        const nuevoFabricante = new Fabricante(req.body);
        await nuevoFabricante.save();
        res.status(201).json(nuevoFabricante);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los fabricantes
router.get('/fabricantes', async (req, res) => {
    try {
        const fabricantes = await Fabricante.find();
        res.json(fabricantes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un fabricante por ID
router.get('/fabricantes/:id', async (req, res) => {
    try {
        const fabricante = await Fabricante.findById(req.params.id);
        if (!fabricante) return res.status(404).json({ message: 'Fabricante no encontrado' });
        res.json(fabricante);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un fabricante
router.put('/fabricantes/:id', async (req, res) => {
    try {
        const fabricante = await Fabricante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fabricante) return res.status(404).json({ message: 'Fabricante no encontrado' });
        res.json(fabricante);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un fabricante
router.delete('/fabricantes/:id', async (req, res) => {
    try {
        const fabricante = await Fabricante.findByIdAndDelete(req.params.id);
        if (!fabricante) return res.status(404).json({ message: 'Fabricante no encontrado' });
        res.json({ message: 'Fabricante eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
