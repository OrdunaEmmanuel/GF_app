const express = require('express');
const router=express.Router();
const clientController=require("../CONTROLLERS/clientController/client.ctrl")
const ProductController=require("../CONTROLLERS/productosController/products.ctrl")

//routes client
router.post('/register', clientController.createCliente)+
router.post('/getClientes', clientController.getClientes)
//routes products
router.get("/getAll", ProductController.getAll);
router.get("/getbyId/:id", ProductController.getById);
router.post("/buscarByname", ProductController.search);  // Ahora es POST



module.exports=router