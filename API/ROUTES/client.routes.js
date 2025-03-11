const express = require('express')
const clienteCtrl = require('../CONTROLLERS/client.ctrl')
router = express.Router()

router.post('/register', clienteCtrl.createCliente)

module.exports = router
