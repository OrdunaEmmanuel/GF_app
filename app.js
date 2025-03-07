const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { connectDB } = require("./API/CONFIGS/db.config");
const rutasAuth = require("./API/ROUTES/auth.routes");

dotenv.config();

const app = express();

// Middlewares de seguridad
app.use(helmet()); // Agrega cabeceras de seguridad HTTP
app.use(cors()); // Habilita CORS

// Limitar intentos de inicio de sesión
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Límite de 5 intentos por IP
  message: "Demasiados intentos, inténtalo de nuevo más tarde.",
});
app.use(limiter); // Aplica el límite de tasa a todas las rutas

// Middlewares para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// npm install express-rate-limit helmet
//**************************************************** */

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("=============================================");
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log("=============================================");
});