const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const User = require('../../backend/mongo/schemas/users')

async function verifyToken (req, res, next) {
    try {
        const token = req.headers['authorization'].slice(7)
        console.log(token)
        if (!token) return res.json({message: 'Token not Provided'})
        const verification = await jwt.verify(token, secretKey)
        console.log(verification)
        req.user = await User.findOne({ _id: verification._id })
        return next()
    } catch (error) {
        console.log(error)
        return res.json({message: 'Invalid Token'})
    }
}



module.exports = {
    verifyToken
}
