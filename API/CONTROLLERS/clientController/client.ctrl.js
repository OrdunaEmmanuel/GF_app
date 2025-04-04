const Cliente = require("../../MODELS/clientModel/client.mdl.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../../MIDDLEWARE/auth.js")
const { pool } = require("../../CONFIGS/db.config");

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

        const clienteExistente = await Cliente.findByNumeroCelular(numero_cel);
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
            token: "",
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

exports.loginUser = async (req, res) => {
    try {
        const { numero_cel, password_user } = req.body;
        const user = await Cliente.findByNumeroCelular(numero_cel);

        if (!user) {
            return res.status(404).json({ message: "Credenciales incorrectas" });
        }

        const isMatch = await bcrypt.compare(password_user, user.password_user);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);

        await pool.query(
            "UPDATE usuario SET token = ? WHERE id_usuario = ?",
            [refreshToken, user.id_usuario]
        );

        // Se retorna tanto el accessToken como el refreshToken
        res.json({
            message: "Inicio de sesión exitoso",
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

exports.getUserData = async (req, res) => {
    try {
        // req.user es asignado por el middleware auth.verifyToken
        const userId = req.user.userId;
        const [rows] = await pool.query(
            "SELECT id_usuario, nombre, apellido_p, apellido_m, clave, direccion, curp, numero_cel, tipo_usuario, id_localidad FROM usuario WHERE id_usuario = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const user = rows[0];
        res.json({
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido_p: user.apellido_p,
            apellido_m: user.apellido_m,
            clave: user.clave,
            direccion: user.direccion,
            curp: user.curp,
            numero_cel: user.numero_cel,
            tipo_usuario: user.tipo_usuario,
            id_localidad: user.id_localidad
        });
    } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken) {
        return res.status(403).json({ message: "Token de refresco requerido." });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const [rows] = await pool.query(
            "SELECT * FROM usuario WHERE id_usuario = ? AND token = ?",
            [decoded.userId, refreshToken]
        );

        if (rows.length === 0) {
            return res.status(403).json({ message: "Token inválido o expirado." });
        }

        const user = rows[0];
        const newAccessToken = auth.generateRefreshToken(user);

        res.json({ accessToken: newAccessToken });

    } catch (err) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        await pool.query("UPDATE usuario SET token = NULL WHERE id_usuario = ?", [userId]);
        res.json({ message: "Sesión cerrada correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al cerrar sesión", error: err.message });
    }
};

exports.deleteCliente = async (req, res) => {
    const clienteId = req.params.id;

    try {
        const [cliente] = await pool.query(
            "SELECT * FROM usuario WHERE id_usuario = ? AND tipo_usuario = 'cliente'",
            [clienteId]
        );

        if (cliente.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await pool.query("DELETE FROM usuario WHERE id_usuario = ?", [clienteId]);

        res.json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
    }
};
