const service = require('./service')

async function login (req, res, next) {
    try {
        const {username, password} = req.body
        if (!password) {
            return res.status(400).json({message: 'Password is required'})
        }
        if (!username) {
            return res.status(400).json({message: 'Username is required'})
        }
        const user = await service.getUserByUsername(username)
        console.log(user)
        if (!user) {
            return res.status(401).json({message: 'username or password is incorrect'})
        }
        const passwordMatch = await service.comparePassword(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({message: 'username or password is incorrect'})
        }
        req.user = user
        return next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

async function register (req, res, next) {
    try {
        const {username, password, type} = req.body
        if (!password) {
            return res.status(400).json({message: 'Password is required'})
        }
        if (!username) {
            return res.status(400).json({message: 'Username is required'})
        }
        if (!type) {
            return res.status(400).json({message: 'Player Type is required'})
        }
        const user = await service.getUserByUsername(username)
        if (user) {
            return res.status(400).json({message: 'Username already exists'})
        }
        const hashedPassword = await service.hashPassword(password)
        req.data = {hashedPassword}
        return next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports = {
    login,
    register
}
