const express = require("express")
const dotenv = require("dotenv")
const app = express()
const connectDB = require('./API/CONFIG/db')
const rutas = require('./API/ROUTES/ruta')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config();


// levantar servidor
async function StartServer() {
    const port = process.env.PORT || 3000; 
    app.listen(port, () => {
        console.log('=============================================');
        console.log(`Servidor funcionando en http://localhost:${port}`);
        console.log('=============================================');   
    });
}

app.use('/', rutas)

// conexion a la base de datos 
app.use('/', rutas)
connectDB();

StartServer();
connectDB();
