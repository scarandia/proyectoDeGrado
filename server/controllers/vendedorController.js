const Vendedor = require('../models/vendedorModel');

// Crear vendedor
const createVendedor = async (req, res) => {
    try {
        // Generar ID de vendedor en formato V###
        let nuevoIdVendedor;
        let idVendedorExists = true;
        let intento = 0;
        while (idVendedorExists && intento < 1000) { // Limitar el número de intentos para evitar bucles infinitos
            const ultimoVendedor = await Vendedor.findOne().sort({ createdAt: -1 });
            if (ultimoVendedor && ultimoVendedor.idVendedor) {
                const ultimoNumero = parseInt(ultimoVendedor.idVendedor.slice(1)); // Extrae el número, excluyendo "V"
                nuevoIdVendedor = 'V' + String(ultimoNumero + 1 + intento).padStart(3, '0'); // Da formato y añade el intento
            } else {
                nuevoIdVendedor = 'V001'; // Si no existen vendedores
            }

            // Verificar si el nuevo idVendedor ya existe
            const existingVendedor = await Vendedor.findOne({ idVendedor: nuevoIdVendedor });
            if (!existingVendedor) {
                idVendedorExists = false;
            } else {
                console.log(`El idVendedor ${nuevoIdVendedor} ya existe. Generando uno nuevo.`);
                intento++;
            }
        }

        if (idVendedorExists) {
            return res.status(500).json({ message: 'No se pudo generar un idVendedor único después de 1000 intentos.' });
        }

        // Crear el nuevo vendedor con el idVendedor generado
        const nuevoVendedor = new Vendedor({
            ...req.body,
            idVendedor: nuevoIdVendedor
        });

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
        res.status(500).json({ error: 'Error al obtener los vendedores.', detalle: error.message });
    }
};

// Buscar por ID
const getVendedorById = async (req, res) => {
    try {
        const vendedor = await Vendedor.findById(req.params.id);
        if (!vendedor) {
            return res.status(404).json({ error: 'Vendedor no encontrado.' });
        }
        res.status(200).json(vendedor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vendedor.', detalle: error.message });
    }
};

// Actualizar un vendedor
const updateVendedor = async (req, res) => {
    try {
        const vendedorActualizado = await Vendedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendedorActualizado) {
            return res.status(404).json({ error: 'Vendedor no encontrado.' });
        }
        res.status(200).json(vendedorActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vendedor.', detalle: error.message });
    }
};

// Eliminar un vendedor
const deleteVendedor = async (req, res) => {
    try {
        const vendedorEliminado = await Vendedor.findByIdAndDelete(req.params.id);
        if (!vendedorEliminado) {
            return res.status(404).json({ error: 'Vendedor no encontrado.' });
        }
        res.status(200).json({ message: 'Vendedor eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vendedor.', detalle: error.message });
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