const express = require('express')
const router = express.Router()
const routeClient = require('../CONTROLLERS/cliente.js')
const routeUser = require('../CONTROLLERS/login.js')

/**
 * Route Login
 */
router.post('/login', routeUser.login)
/**
 * Route Cliente
 */
router.post('/cliente/add', routeClient.createCliente)


module.exports = router