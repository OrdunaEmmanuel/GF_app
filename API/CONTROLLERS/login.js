const ClienteModel = require('../MODELS/CLIENTE.js')
const PreventistaModel = require('../MODELS/PREVENTISTA.js')
const SucursalModel = require('../MODELS/SUCURSAL.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) =>{
    try{
        const {numero_celular , password} = req.body
        const userTypes = [
            { model: ClienteModel, type: 'CLIENTE', secret: process.env.JWT_SECRET_CLIENTE },
            { model: PreventistaModel, type: 'PREVENTISTA', secret: process.env.JWT_SECRET_PREVENTISTA },
            { model: SucursalModel, type: 'SUCURSAL', secret: process.env.JWT_SECRET_SUCURSAL }
        ];

        let user = null
        let userType = null
        let secret_key = null
        let userModel = null
        for(const {model, type, secret} of userTypes){
            user = await model.findOne({ numero_celular: numero_celular });
            if(user){
                userType = type
                secret_key = secret
                userModel = model
                break;
            }
        }
        if(!user){
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(404).json({ msg: 'Contraseña incorrecta' });
        }
        
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}
