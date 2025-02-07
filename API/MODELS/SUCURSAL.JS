const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
    nombreSucursal: {type: String, required: true},
    correoSucursal: {type: String, required: true},
    numero_celular: {type: String, required: true},
    direccionSucursal: {type: String },
    token: {type: String, default: ""},
    tipo_usuario: {type: String, default: "S"}
})

const Sucursal = mongoose.model('Sucursal', SucursalSchema)
module.exports = Sucursal