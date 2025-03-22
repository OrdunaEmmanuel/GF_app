const jwt = require('jsonwebtoken')

exports.generateAccesToken = (user) => {
    return jwt.sign(
        { userId: user.id_usuario, role: user.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
    )
}

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id_usuario },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1d" }
    )
}

exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.split("")[1]

    if (!token){
        return res.status(401).json({ error: "No token provided, authorization denied" })
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    }catch(err){
        return res.status(401).json({ error: "Token invalid, authorization denied" })
    }
}