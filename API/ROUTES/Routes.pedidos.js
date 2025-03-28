const express = require('express');
const router=express.Router();
const OrderController=require("../CONTROLLERS/productosController/order.ctrl")

router.get("/orders", OrderController.getOrders);
router.get("/user/:id_usuario", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.post("/", OrderController.create);
router.post("/add-product", OrderController.addProductAndCreateOrderIfNeeded);
router.get("/productos/:id_pedido", OrderController.getProductsByOrder);
router.put("/:id_pedido/products", OrderController.editProducts);
router.put("/:id_pedido", OrderController.editOrderDetails);
router.delete("/:id_pedido/producto/:id_producto", OrderController.deleteProductFromOrder);
router.delete("/:id_pedido", OrderController.deleteOrder);


module.exports=router