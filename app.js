const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");

const path=require("path");
const router=require("./API/ROUTES/Routes")
const routeClient = require('./API/ROUTES/route.client')
const rateLimit = require("express-rate-limit");
const { connectDB } = require('./API/CONFIGS/db.config');
const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.ACCES_CONTROL_ALLOW_ORIGIN || "*",
    methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/clientes/', routeClient)

// Conexión a base de datos

connectDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});

