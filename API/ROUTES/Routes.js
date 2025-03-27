const express = require('express');
const router=express.Router();
const clientController=require("../CONTROLLERS/clientController/client.ctrl")
const ProductController=require("../CONTROLLERS/productosController/products.ctrl")
const OrderController=require("../CONTROLLERS/productosController/order.ctrl")



//routes client
router.post('/register', clientController.createCliente)+
router.post('/getClientes', clientController.getClientes)
//routes products
router.get("/getAll", ProductController.getAll);
router.get("/getbyId/:id", ProductController.getById);
router.post("/buscarByname", ProductController.search);  // Ahora es POST

router.post("/add-product", OrderController.addProductAndCreateOrderIfNeeded);
router.get("/productos/:id_pedido", OrderController.getProductsByOrder);
router.get("/user/:id_usuario", OrderController.getAll);
router.get("/orders", OrderController.getOrders);

module.exports=router