const Producto = require('../models/productoModel');

// Crear producto
const createProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.', detalle: error.message });
    }
};

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.', detalle: validationError.message  });
    }
};

// Buscar por ID
const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.', detalle: validationError.message });
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado.', detalle: validationError.message  });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.', detalle: validationError.message  });
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado.' , detalle: validationError.message});
        }
        res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.', detalle: validationError.message  });
    }
};

// Exportamos las funciones del controlador
module.exports = {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto
};
