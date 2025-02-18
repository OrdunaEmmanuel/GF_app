const express = require('express')
const router = express.Router()
const authM = require('../MIDDLEWARE/auth.js')
const routeClient = require('../CONTROLLERS/cliente.js')
const routeProducts=require('../CONTROLLERS/searchProducts.js')


/**
 * Route Cliente
 */
router.post('/cliente/add', routeClient.createCliente)
//Route search products
router.get('/productos-get',routeProducts.obtenerProductos)


module.exports = router