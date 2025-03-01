const bcrypt = require("bcrypt");
const Cliente = require("../MODELS/client.mdl");

exports.createCliente = async (req, res) => {
    try {
        const { nombre, numero_celular, password, direccion } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const cliente = { nombre, numero_celular, password: hashedPassword, direccion };

        const id = await Cliente.create(cliente);
        res.status(201).json({ msg: "Cliente creado con éxito", id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
