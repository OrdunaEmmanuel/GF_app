const express = require("express");
const ProductController = require("../CONTROLLERS/product.controller");

const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.get("/getbyId/:id", ProductController.getById);
router.post("/create", ProductController.create);

module.exports = router;
