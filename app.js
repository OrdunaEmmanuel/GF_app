const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const path=require("path");
const router=require("./API/ROUTES/Routes")
const rateLimit = require("express-rate-limit");
const { connectDB } = require('./API/CONFIGS/db.config');
const app = express();
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000'],  // Permite solicitudes solo de este origen
  methods: 'GET,POST,PUT,DELETE',    // Los métodos permitidos
  allowedHeaders: 'Content-Type, Authorization',  // Los encabezados permitidos
  credentials: true,  // Permite el uso de cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


// Conexión a base de datos

connectDB();



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});
