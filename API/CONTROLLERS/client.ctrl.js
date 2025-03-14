const Cliente = require("../MODELS/client.mdl");
const bcrypt = require("bcrypt");

exports.createCliente = async (req, res) => {
    try {
        const {
            nombre,
            apellido_p,
            apellido_m,
            clave,
            direccion,
            curp,
            numero_cel,
            password_user,
            tipo_usuario,
            id_localidad,
        } = req.body;

        const clienteExistente = await Cliente.findByNumeroCelular(numero_celular);
        if (clienteExistente) {
            return res.status(400).json({ error: "El número de celular ya está registrado." });
        }

        const hashedPassword = await bcrypt.hash(password_user, 10);

        const cliente = {
            nombre,
            apellido_p,
            apellido_m,
            clave,
            direccion,
            curp,
            numero_cel,
            password_user: hashedPassword,
            tipo_usuario,
            id_localidad,
        };

        const idCliente = await Cliente.create(cliente);

        res.status(201).json({ msg: "Cliente registrado con éxito", idCliente });

    } catch (error) {
        console.error("Error creando cliente:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        if (clientes.length === 0) {
            return res.status(404).json({ msg: "No hay clientes registrados" });
        }

        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
        res.status(500).json({ error: error.message });
    }
};
