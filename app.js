const express = require("express")
const dotenv = require("dotenv")
const app = express()
const crypto = require("crypto")
const cookieParser = require("cookie-parser")
const connectDB = require('./API/CONFIG/db')



dotenv.config();

async function StartServer() {
    const port = process.env.PORT || 3000; 
    app.listen(port, () => {
        console.log('=============================================');
        console.log(`Servidor funcionando en http://localhost:${port}`);
        console.log('=============================================');   
    });
}

StartServer();
connectDB();
