// controllers/auth.ctrl.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../MODELS/auth.mdl");
const { JWT_SECRET } = process.env;

// Función para iniciar sesión (login)
const login = async (req, res) => {
  const { numero_celular, password } = req.body;

  try {
    // 1. Verificar que ningún campo esté vacío
    if (!numero_celular || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // 2. Verificar si el número de teléfono existe en la base de datos
    const user = await Auth.findByNumeroCelular(numero_celular);

    if (!user) {
      return res.status(404).json({ message: 'El número de teléfono no está registrado' });
    }

    // 3. Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está correcto, generar el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Actualizar el token en la base de datos
    await Auth.updateToken(user.id, token);

    // Devolver el token y el usuario
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };

// Función para cerrar sesión (logout)
exports.logout = async (req, res) => {
  const { id, tipo_usuario = "clientes" } = req.user; // El ID y tipo de usuario se obtienen del middleware

  try {
    // Eliminar el token del usuario (invalidar la sesión)
    await Auth.updateToken(id, null, tipo_usuario);

    // Retornar una respuesta exitosa
    res.status(200).json({
      success: true,
      message: "Sesión cerrada exitosamente",
    });
  } catch (err) {
    console.error("Error en el logout:", err.message);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: err.message,
    });
  }
};

// Middleware para verificar el token
exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. No se proporcionó token.",
    });
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Buscar el usuario en la base de datos (usando la tabla correspondiente)
    const usuario = await Auth.findById(decoded.id, decoded.tipo_usuario);

    // Verificar que el token coincida con el almacenado en la base de datos
    if (!usuario || usuario.token !== token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    // Adjuntar la información del usuario a la solicitud
    req.user = { id: usuario.id, tipo_usuario: usuario.tipo_usuario };
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};