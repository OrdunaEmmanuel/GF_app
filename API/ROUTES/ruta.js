const express = require('express')
const router = express.Router()
const routeClient = require('../CONTROLLERS/cliente.js')
const routeUser = require('../CONTROLLERS/login.js')

/**
 * Route Login
 */
router.post('/login', routeUser.login)
router.post('/logout', routeUser.logout)
/**
 * Route Cliente
 */
router.post('/cliente/add', routeClient.createCliente)
//Route search products
//router.get('/productos-get',routeProducts.obtenerProductos)


module.exports = router