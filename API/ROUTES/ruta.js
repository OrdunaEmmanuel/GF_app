const express = require('express')
const router = express.Router()
const authM = require('../MIDDLEWARE/auth.js')
const routeUser = require('../CONTROLLERS/usuarios.js')
const routeClient = require('../CONTROLLERS/cliente.js')


/**
 * Route Cliente
 */
router.post('/cliente/add', routeClient.createCliente)

module.exports = router