require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado a la base de datos en cPanel!");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a la BD en cPanel:", error.message);
    process.exit(1);
  }
}

module.exports = { pool, connectDB };
