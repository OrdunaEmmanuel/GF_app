const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const routerProducts = require("./API/ROUTES/routes.product");
const routerClients = require("./API/ROUTES/routes.client");
const routerOrders = require("./API/ROUTES/routes.order");
const rateLimit = require("express-rate-limit");
const { connectDB } = require('./API/CONFIGS/db.config');
const app = express();
dotenv.config();

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas organizadas
app.use('/api/productos', routerProducts);  // Rutas de productos
app.use('/api/clientes', routerClients);    // Rutas de clientes
app.use('/api/pedidos', routerOrders);      // Rutas de pedidos

// Conexión a base de datos
connectDB();

app.get('/', (req, res) => {
  res.send('🚀 La API está funcionando correctamente');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});