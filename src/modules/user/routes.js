const express = require('express')
const router = express.Router()
const middleware = require('./middleware')
const controller = require('./controller')
const { tryCatchWrapper } = require("../../common/wrappers")

router.route('/login')
    .post(tryCatchWrapper(middleware.login), tryCatchWrapper(controller.login))

router.route('/register')
    .post(tryCatchWrapper(middleware.register), tryCatchWrapper(controller.register))


module.exports = router
