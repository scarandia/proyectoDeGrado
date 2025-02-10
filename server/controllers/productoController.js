const Producto = require('../models/productoModel');
const Categoria = require('../models/categoriaModel');

// Verificar si el nombre del producto ya existe
const checkNombreProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({ nombreProducto: req.params.nombreProducto });
        res.json({ exists: !!producto });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el nombre del producto' });
    }
};

// Crear producto
const createProducto = async (req, res) => {
    try {
        const { categoria, nombreProducto, ...productoData } = req.body;

        // Verificar que la categoría exista
        const categoriaExistente = await Categoria.findById(categoria);
        if (!categoriaExistente) {
            return res.status(400).json({ error: 'Categoría no válida' });
        }

        // Verificar si ya existe un producto con el mismo nombre
        const productoExistente = await Producto.findOne({ nombreProducto });
        if (productoExistente) {
            return res.status(400).json({ error: 'Ya existe un producto con este nombre' });
        }

        // Asignar número de producto en formato P###
        let nuevoIdProducto;
        let idProductoExists = true;
        let intento = 0;
        while (idProductoExists && intento < 1000) { // Limitar el número de intentos para evitar bucles infinitos
            const ultimoProducto = await Producto.findOne().sort({ createdAt: -1 });
            if (ultimoProducto && ultimoProducto.idProducto) {
                const ultimoNumero = parseInt(ultimoProducto.idProducto.slice(1)); // Extrae el número, excluyendo "P"
                nuevoIdProducto = 'P' + String(ultimoNumero + 1 + intento).padStart(3, '0'); // Da formato y añade el intento
            } else {
                nuevoIdProducto = 'P001'; // Si no existen productos
            }

            // Verificar si el nuevo idProducto ya existe
            const existingProducto = await Producto.findOne({ idProducto: nuevoIdProducto });
            if (!existingProducto) {
                idProductoExists = false;
            } else {
                console.log(`El idProducto ${nuevoIdProducto} ya existe. Generando uno nuevo.`);
                intento++;
            }
        }

        if (idProductoExists) {
            return res.status(500).json({ message: 'No se pudo generar un idProducto único después de 1000 intentos.' });
        }

        // Crear el nuevo producto con el idProducto generado
        const nuevoProducto = new Producto({
            ...productoData,
            categoria,
            nombreProducto,
            idProducto: nuevoIdProducto
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        if (error.code === 11000) {
            // Error de duplicado
            res.status(400).json({ error: 'Ya existe un producto con este nombre' });
        } else {
            res.status(500).json({ error: 'Error al crear el producto.', detalle: error.message });
        }
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

module.exports = {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto,
    checkNombreProducto
};