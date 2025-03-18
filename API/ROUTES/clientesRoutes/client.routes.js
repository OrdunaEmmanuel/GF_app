const express = require('express')
const clienteCtrl = require('../../CONTROLLERS/clientController/client.ctrl')
router = express.Router()

router.post('/register', clienteCtrl.createCliente)

router.post('/getClientes', clienteCtrl.getClientes)

module.exports = router
