const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ClienteModel = require("../MODELS/CLIENTE.js");
const SucursalModel = require("../MODELS/SUCURSAL.js");
const PreventistaModel = require("../MODELS/PREVENTISTA.js");

require("dotenv").config();

const SECRET_KEYS = {
    C: process.env.JWT_SECRET_CLIENTE,
    P: process.env.JWT_SECRET_PREVENTISTA,
    S: process.env.JWT_SECRET_SUCURSAL
};

console.log("Secret Keys:", SECRET_KEYS);

exports.login = async (req, res) => {
    try {
        const { numero_celular, password } = req.body;

        let usuario = await ClienteModel.findOne({ numero_celular }) ||
                      await SucursalModel.findOne({ numero_celular }) ||
                      await PreventistaModel.findOne({ numero_celular });

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        const tipo_usuario = usuario.tipo_usuario;
        const SECRET_KEY = SECRET_KEYS[tipo_usuario];

        if (!SECRET_KEY) {
            console.error("Error: No se encontró la clave secreta para el tipo de usuario:", tipo_usuario);
            return res.status(500).json({ msg: "Error en la configuración del servidor" });
        }

        const token = jwt.sign(
            { id: usuario._id, tipo_usuario },
            SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_TIME || "8h" }
        );

        usuario.token = token;
        await usuario.save();

        res.status(200).json({
            message: "Login exitoso, bienvenido usuario",
            nombre: usuario.nombre,
            token,
            tipo_usuario
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};
