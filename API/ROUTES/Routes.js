const express = require('express');
const router=express.Router();
const clientController=require("../CONTROLLERS/clientController/client.ctrl")
const ProductController=require("../CONTROLLERS/productosController/products.ctrl")


//router products
router.get("/getAll", ProductController.getAll);
router.get("/getbyId/:id", ProductController.getById);
router.post("/buscarByname", ProductController.search);  // Ahora es POST

module.exports=router