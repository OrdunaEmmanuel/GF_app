const CRUD = require('./crud')
const encript = require('../CONFIG/bcrypt')
const Cliente = require('../MODELS/CLIENTE.JS')

exports.createCliente = async (req, res) => {
   try{
    const clienteF = {...req.body}
    const hashedPassword = await encript(clienteF.password)
    clienteF.password = hashedPassword
    const resultado = await CRUD.Create(Cliente, clienteF)
    if(!resultado){
        res.status(400).send('Error al crear el cliente')
    }
    res.status(201).send('Cliente creado con exito')
   }catch(err){
    res.status(500).send(err.message)
   }
}