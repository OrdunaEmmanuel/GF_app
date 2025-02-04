const Cliente = require('../MODELS/C_MODEL.JS')
const Preventista = require('../MODELS/P_MODEL.JS')
const Sucursal = require('../MODELS/S_MODEL.JS')
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    try {
        const userC = await Cliente.findOne({ correo: req.body.correoF });
        const userP = await Preventista.findOne({ correo: req.body.correoF });
        const userS = await Sucursal.findOne({ correo: req.body.correoF });
    
        if (!userC && !userP && !userS) {
            return res.status(401).json({ msg: 'El correo no está registrado' });
        }
    
        let user = userC || userP || userS;
    
        const isMatch = await bcrypt.compare(req.body.passwordF, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }
    
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
        user.token = token;
        await user.save();
    
        res.cookie('token', token, { httpOnly: true });
        res.json({ token, user });
    
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error en el servidor');
    }
}