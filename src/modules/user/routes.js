const express = require('express')
const router = express.Router()
const middleware = require('./middleware')
const controller = require('./controller')

router.route('/login')
    .post(middleware.login, controller.login)

router.route('/register')
    .post(middleware.register, controller.register)


module.exports = router
