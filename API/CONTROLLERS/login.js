const Cliente = require('../MODELS/CLIENTE.js')
const Preventista = require('../MODELS/PREEVENTISTA.JS')
const Sucursal = require('../MODELS/SUCURSAL.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.login = async(req, res) =>{
    try{
        const { correoFL, passwordFL } = req.body
        const TP_user = [
            {model: Cliente, type: 'Cliente', secret: process.env.JWT_SECRET_CLIENTE},
            {model: Preventista, type: 'Preventista', secret: process.env.JWT_SECRET_PREVENTISTA},
            {model: Sucursal, type: 'Sucursal', secret: process.env.JWT_SECRET_SUCURSAL}
        ]
        let user, userType, secret_key, userModel = null

        for(const {model, type, secret} of TP_user){
            user = await model.findOne({correo: correoFL})
            if(user){
                userModel = model
                secret_key = secret
                userType = type
                break
            }
        }
        if(!user){
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }
        if(!await bcrypt.compare(passwordFL, user.password)){
            return res.status(404).json({msg: 'Contraseña incorrecta'})
        }
        const token = jwt.sign(
            {user_id: user._id, userType},
            secret_key,
            {expiresIn: process.env.JWT_EXPIRATION_TIME}
        )

        await userModel.findByIdAndUpdate(user._id, { token });
        res.json({ 
            msg: `Hola ${user.correo}, eres un usuario tipo ${userType}. Tu correo es ${user.correo}.`, 
            token
        });
        

    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}