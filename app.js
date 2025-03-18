const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const rutasClientes = require('./API/CONTROLLERS/clientController/client.ctrl');
//const rutasClientes = require('./API/ROUTES/auth.routes');

dotenv.config();

const app = express();

const corsOptions = { origin: "*" };


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Conexión a base de datos
const { connectDB } = require('./API/CONFIGS/db.config');
connectDB();

// Rutas
//app.use("/auth", rutasAuth);
app.use("/clientes", rutasClientes);
app.use("/")



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});
