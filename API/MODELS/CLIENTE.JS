const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    numero_celular: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    direccion: {type: String},
    token: {type: String, default: ""},
    tipo_usuario: {type: String, default: "C"}
})

module.exports = mongoose.models.clientes || mongoose.model('clientes', ClienteSchema);