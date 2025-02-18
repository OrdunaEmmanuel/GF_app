const Producto = require('../MODELS/PRODUCTOS.JS'); // en minúsculas


// Controlador para obtener los datos específicos
const obtenerProductos = async (req, res) => {
    try {
        // Busca todos los productos en la base de datos
        const productos = await Producto.find({}, { // "Producto" en lugar de "productos"
            _id: 0, // Excluye el campo _id
            código: 1,
            clave: 1,
            descripción: 1,
            precio_público_con_IVA: 1,
            unidad: 1,
            precio_mayoreo_con_IVA: 1,
            Marca: 1,
            Peso_Kg: 1
        });
        
        // Envía la respuesta con los datos
        res.status(200).json(productos);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ mensaje: "Error al obtener los productos", error });
    }
};

module.exports = {
    obtenerProductos
};