const CRUD = require('./crud')
const validateCliente = require('../CONFIG/validaciones')
const encript = require('../CONFIG/bcrypt')
const Cliente = require('../MODELS/CLIENTE.JS')

exports.createCliente = async (req, res) => {
    console.log("Cuerpo de la petición:", req.body);
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "El cuerpo de la solicitud está vacío" });
        }
        const hashedPassword = await encript(req.body.passwordFC);
        const clienteData = {
            nombreCliente: req.body.nombreFC,
            numero_celular: req.body.numero_celularFC,
            correo: req.body.correoFC,
            password: hashedPassword,
            direccion: req.body.direccionFC || ""
        };

        const { error } = validateCliente.validateFC(clienteData);
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }

        const eCliente = await Cliente.findOne({ correoCliente: clienteData.correoCliente });
        if (eCliente) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }
        const result = await CRUD.Create(Cliente, clienteData);
        console.log("Cliente guardado:", result);

        return res.status(result.success ? 200 : 400).json(result);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Error inesperado' });
    }
}