const Vendedor = require('../models/vendedorModel');

// Crear vendedor
const createVendedor = async (req, res) => {
    try {
        const nuevoVendedor = new Vendedor(req.body);
        await nuevoVendedor.save();
        res.status(201).json(nuevoVendedor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear vendedor.', detalle: error.message });
    }
};

// Obtener todos los vendedores
const getVendedores = async (req, res) => {
    try {
        const vendedores = await Vendedor.find();
        res.status(200).json(vendedores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vendedores.' , detalle: validationError.message });
    }
};

// Buscar por ID
const getVendedorById = async (req, res) => {
    try {
        const vendedor = await Vendedor.findById(req.params.id);
        if (!vendedor) {
            return res.status(404).json({ error: 'Vendedor no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json(vendedor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vendedor.' , detalle: validationError.message });
    }
};

// Actualizar un vendedor
const updateVendedor = async (req, res) => {
    try {
        const vendedorActualizado = await Vendedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendedorActualizado) {
            return res.status(404).json({ error: 'Vendedor no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json(vendedorActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vendedor.' , detalle: validationError.message });
    }
};

// Eliminar un vendedor
const deleteVendedor = async (req, res) => {
    try {
        const vendedorEliminado = await Vendedor.findByIdAndDelete(req.params.id);
        if (!vendedorEliminado) {
            return res.status(404).json({ error: 'Vendedor no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json({ message: 'Vendedor eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vendedor.', detalle: validationError.message  });
    }
};

// Exportamos las funciones del controlador
module.exports = {
    createVendedor,
    getVendedores,
    getVendedorById,
    updateVendedor,
    deleteVendedor
};
