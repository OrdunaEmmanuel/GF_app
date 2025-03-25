const express = require('express')
const clientCTRL = require('../CONTROLLERS/clientController/client.ctrl')
const auth = require('../MIDDLEWARE/auth')

const router = express.Router()

// Clientes
router.post('/register', clientCTRL.createCliente)
router.get('/getAll', clientCTRL.getClientes)
router.post('/login', clientCTRL.loginUser)
router.post('/refresh-token', clientCTRL.refreshToken)
router.post('/logout', auth.verifyToken,clientCTRL.logoutUser)

module.exports = router