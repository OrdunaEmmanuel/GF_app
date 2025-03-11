const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();


const rutasClientes = require('./API/ROUTES/client.routes');

const corsOptions = { origin: "*" };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a base de datos
const { connectDB } = require('./API/CONFIGS/db.config');
connectDB();

// Rutas

app.use("/clientes", rutasClientes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});
