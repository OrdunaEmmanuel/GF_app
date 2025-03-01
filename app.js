const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./API/CONFIGS/db.config");
const rutasAuth = require("./API/ROUTES/auth.routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conectar a MySQL
connectDB();

// Ruta auth
app.use("/auth", rutasAuth);

// Ruta inicial
app.get("/", (req, res) => {
    res.send("🚀 API de Ferretería en funcionamiento...");
});

//**************************************************** */
// Paquetes que se deben instalar:
// npm install mysql2 dotenv
// npm install cors
//**************************************************** */

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("=============================================");
    console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
    console.log("=============================================");
});
