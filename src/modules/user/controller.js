const service = require('./service')

async function login (req, res) {
    const { user } = req
    const token = await service.generateToken(user)
    return res.json(token)
}

async function register (req, res) {
    const { username, type } = req.body
    const { hashedPassword } = req.data
    await service.createUser(username, hashedPassword, type)
    return res.status(201).json({message: 'User created successfully'})
}



module.exports = {
    login,
    register
}
