const mongoose = require('mongoose')
const random = require('../MIDDLEWARE/random')

const ClienteSchema = new mongoose.Schema({
    nombreCliente: {type: String, required: true},
    numeroCliente: {type: String, unique: true},
    numero_celular: {type: String, required: true},
    correoCliente: {type: String, required: true, unique: true},
    passwordCliente: {type: String, required: true},
    direccion: {type: String},
    token: {type: String, default: ""},
    tipo_usuario: {type: String, default: "C"}
})
ClienteSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); 

    let codigo;
    let existe = true;

    while (existe) {
        codigo = await random.random()
        const clienteExistente = await mongoose.model('Cliente').findOne({ numeroCliente: codigo });
        if (!clienteExistente) existe = false;
    }

    this.numeroCliente = codigo
    next();
})

const Cliente = mongoose.model('Cliente', ClienteSchema)
module.exports = Cliente