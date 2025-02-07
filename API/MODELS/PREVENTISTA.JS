const mongoose = require('mongoose')
const random = require('../MIDDLEWARE/random')

const PreventistaSchema = new mongoose.Schema({
    nombrePreventista: {type: String, required: true},
    numeroPreventista: {type: String, required: true},
    correoPreventista: {type: String, required: true},
    numero_celular: {type: String, required: true},
    passwordPreventista: {type: String, required: true},
    token: {type: String, default: ""},
    tipo_usuario: {type: String, default: "P"}
})
PreventistaSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); 

    let codigo;
    let existe = true;

    while (existe) {
        codigo = random.random()
        const preventistaExistente = await mongoose.model('Preventista').findOne({ numeroPreventista: codigo });
        if (!preventistaExistente) existe = false;
    }

    this.numeroCliente = codigo
    next();
})

const Preventista = mongoose.model('Preventista', PreventistaSchema)
module.exports = Preventista