const bcrypt = require("bcrypt");
const Cliente = require("../MODELS/client.mdl");

exports.createCliente = async (req, res) => {
    try {
        const { nombre, numero_celular, password, direccion } = req.body;

        // Verificar si el número de celular ya está registrado
        const clienteExistente = await Cliente.findByNumeroCelular(numero_celular);
        if (clienteExistente) {
            return res.status(400).json({ error: "El número de celular ya está registrado" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el cliente
        const cliente = { nombre, numero_celular, password: hashedPassword, direccion };
        const id = await Cliente.create(cliente);

        res.status(201).json({ msg: "Cliente creado con éxito", id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getClientes = async (req, res) => {
    try {
        // Obtener todos los clientes
        const clientes = await Cliente.getAll();
        if (clientes.length === 0) {
            return res.status(404).json({ msg: "No hay clientes registrados" });
        }
        res.status(200).json(clientes);
    } catch (err) {
        console.error("Error al obtener los clientes:", err.message);
        res.status(500).json({ error: err.message });
    }
};
