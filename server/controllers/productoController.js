const Producto = require('../models/productoModel');
const Categoria = require('../models/categoriaModel');

// Crear producto
const createProducto = async (req, res) => {
    try {
        const { categoria, ...productoData } = req.body;

        // Verificar que la categoría exista
        const categoriaExistente = await Categoria.findById(categoria);
        if (!categoriaExistente) {
            return res.status(400).json({ error: 'Categoría no válida' });
        }

        const nuevoProducto = new Producto({ ...productoData, categoria });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto.', detalle: error.message });
    }
};

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos.', detalle: error.message });
    }
};

// Buscar por ID
const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoria');
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.', detalle: error.message });
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    try {
        const { categoria, ...productoData } = req.body;

        // Verificar que la categoría exista
        const categoriaExistente = await Categoria.findById(categoria);
        if (!categoriaExistente) {
            return res.status(400).json({ error: 'Categoría no válida' });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            { ...productoData, categoria },
            { new: true }
        ).populate('categoria');

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.', detalle: error.message });
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.', detalle: error.message });
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