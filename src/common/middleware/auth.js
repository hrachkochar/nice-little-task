const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const User = require('../../backend/mongo/schemas/users')

async function verifyToken (req, res, next) {
    const token = req.headers['authorization'].slice(7)
    console.log(token)
    if (!token) return res.json({message: 'Token not Provided'})
    const verification = await jwt.verify(token, secretKey)
    const user = await User.findOne({ _id: verification._id })
    if (!user) return res.json({message: 'User not found or user is deleted or some other error with user existence'})
    req.user = user
    return next()
}



module.exports = {
    verifyToken
}
