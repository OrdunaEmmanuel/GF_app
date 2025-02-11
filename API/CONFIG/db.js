const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DB);
        console.log('La base de datos ha sido conquistada!! dijo conectada: '+ conn.connection.host);  
    } catch (error) {
        console.error(error);
    }
}
module.exports = connectDB;